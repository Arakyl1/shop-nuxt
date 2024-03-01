import { Attribute, AttributeType, Characteristic, CharacteristicItem, Prisma, ProductCard } from "@prisma/client";
import prisma from "~~/server/db";
import { FilterData, HH } from "~~/type/intex";


function checkValidTitle(title: string) {
    return !(['Ширина', 'Длина', 'Высота'].includes(title)) && title.search(/Единиц|Вес|Площадь/gi) === -1
}

function getOtherParams(data) {
    const characteristicData = new Map<string, { data: (string | number)[], length: number }>()
    const makerList = new Set<string>([])
   
    data.forEach(product => {
        const maker = product.attribute.find(_ => _.type === 'MAKER')
        if (maker) {
            makerList.add(maker.value)
        }

        product.characteristic.forEach(charSection => {
            charSection.content.forEach(item => {
                const characteristicItem = characteristicData.get(item.name)
                const _value = item.value.split('/')
                if (characteristicItem && checkValidTitle(item.name)) {
                    
                    characteristicData.set(item.name, {
                        data: [...characteristicItem!.data, ..._value],
                        length: characteristicItem!.length + 1
                    })

                } else { characteristicData.set(item.name, { data: _value, length: 1 }) }
            });
        });
    });

    return [characteristicData, makerList]
}

function getParamsSelect(activeCategor: type): Prisma.AttributeInclude {
    return activeCategor.type === 'CATEGOR'
        ? { 'children': { 'include': { 'children': true } } }
        : activeCategor.type === 'SUBCATEGOR'
        ? { 'children': { 'include': { item: { include: { 'attribute': true } } } }, parent: true }
        : { item: { include: { 'attribute': true, characteristic: { include: { content: true } } } }, parent: { include: { parent: true } } }
}

function getSelectData(data) {

    function transformData(data: { [k: string]: any }) {
        return { id: data.id, value: data.value, type: data.type }
    }

    function handlerParent(data) {
        return 'parent' in data && data.parent ? [...handlerParent(data.parent[0]), transformData(data)] : [transformData(data)]
    }

    function handlerChildren(data) {
        return 'children' in data && data.children ? [transformData(data.children[0])] : []
    }
  
    return [...handlerParent(data), ...handlerChildren(data)]
}

function getSelect(findDataRes): FilterData['4'] {
    // const titleForSelectByLevel = {
    //     0: 'Категория',
    //     1: 'Подкатегория',
    //     2: 'Группа'
    // }
    // const selectData = getSelectData(findDataRes).map((_,i) => ({ ..._, title: titleForSelectByLevel[i] ? titleForSelectByLevel[i] : '' }))
    return { type: 'select', title: 'select', data: getSelectData(findDataRes) }
}

function getPriceData(data: number[]): HH {
    const { min, max } = data.length > 0 ? { min: Math.min(...data), max: Math.max(...data) } : { min: null, max: null }
    return ({
        type: 'number-range', title: "Цена",
        from: { name: 'price.gte', min: min!, max: max!, placeholder: 'От ' + (min || " "), step: 0.5 },
        to: { name: 'price.lte', min: min!, max: max!, placeholder: 'До ' + (max || " "), step: 0.5 },
    })
}

async function getOtherAttribute() {
    const res = await prisma.attribute.findMany({ where: { type: 'OTHER' } })
    return res.map((_) => ({ type: 'radio', title: _.value, name: 'other', value: _.name, id: _.id }))
}

function getRating(): FilterData['5'] {
    return { type: 'star', title: "Рейтинг", name: 'rating', value: 0 }
}

function getDiscount(): FilterData['3'] {
    return { type: 'radio', name: 'discount.gt', title: "Скидка", value: 1 }
}

function getCalculationTime(starTime: number): FilterData['6'] {
    return { type: 'time', ms: Date.now() - starTime, state: 'create data' }
}

function errorResponse() {
    return [
        { type: 'select', title: 'select', data: [] },
        { type: 'text', text: 'Something went wrong' }
    ]
}


export default defineEventHandler<FilterData>(async(event) => {
    let s = Date.now()

    const query = getQuery(event)
    const attributeId: number | null = 'categor' in query ? parseInt(query.categor as string) : null

    const storageData = await useStorage().getItem('categor:' + attributeId)
    if (storageData) return storageData


    try {
        if (!attributeId) return errorResponse()
        // init Data other attribute
        const otherAttributeData = await getOtherAttribute()

        const resCategor = await prisma.attribute.findUnique({ where: { id: attributeId }, select: { type: true } })
        if (!resCategor) return errorResponse()

        const paramsSelect = getParamsSelect(resCategor)
        const findDataRes = await prisma.attribute.findUnique({ where: { id: attributeId }, include: paramsSelect })

        
        if (!findDataRes) return errorResponse()

        // return findDataRes
        
        const fulfillerData: FilterData = [
            getSelect(findDataRes)
        ]
        

        if ((['SUBCATEGOR', 'CLASS'] as Array<AttributeType>).includes(findDataRes.type as never)) {
            const priseData = new Set<number>([])

            if (findDataRes.type === 'SUBCATEGOR') {
                findDataRes.children.forEach(group => {
                    group.item.forEach(item => priseData.add(item.price))
                })
            } else if (findDataRes.type === 'CLASS') {
                
                findDataRes.item.forEach(product => priseData.add(product.price))
            }
             

            fulfillerData.push(getPriceData([...priseData]))
            fulfillerData.push(getRating())

            if (findDataRes.type === 'SUBCATEGOR') {
                fulfillerData.push([getDiscount(), ...otherAttributeData])
            }
            
        } 
        if ((['CLASS'] as Array<AttributeType>).includes(findDataRes.type as never)) {
            const [characteristicData, makerList] = getOtherParams(findDataRes.item)

            const lengthItemArray = findDataRes.item.length
            const updateData = [...characteristicData]
                .map(_ => ({
                    title: _[0],
                    data: [...new Set(_[1].data.map(_ => _.trim()).filter(_ => _))],
                    length: _[1].length,
                    type: 'checkbox',
                    name: `chr-${_[0].split(' ').join('_')}`
                }))
                .filter(_ => _.data.length > 1 && _.length === lengthItemArray )
                .sort()
            // init maker data
            const makerData: HH | {} = makerList.size ? {
                title: "Производитель",
                data: [...makerList].sort(),
                type: 'checkbox',
                name: 'maker'
            } : {}

            fulfillerData.push(makerData)
            fulfillerData.push(...updateData)
            fulfillerData.push([getDiscount(), ...otherAttributeData])
        }
        
        fulfillerData.push(getCalculationTime(s))
        await useStorage().setItem('categor:' + attributeId, JSON.stringify(fulfillerData))
        return fulfillerData


    } catch (error) {
        console.log(error)
        return errorResponse()
    }
})

