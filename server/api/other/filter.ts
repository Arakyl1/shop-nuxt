import { Attribute, Characteristic, CharacteristicItem, Prisma, ProductCard } from "@prisma/client"
import prisma from "~~/server/db"
import { FilterData, HH, storageCategorData } from "~~/type/intex"


function getPriceData(data: number[]): HH {
    const priceValue = data.length > 0 ? { min: Math.min(...data), max: Math.max(...data) } : { min: null, max: null }
    return ({
        type: 'number-range', title: "Цена",
        from: { name: 'price.gte', min: priceValue.min!, max: priceValue.max!, placeholder: 'От ' + (priceValue.min || " "), step: 0.5 },
        to: { name: 'price.lte', min: priceValue.min!, max: priceValue.max!, placeholder: 'До ' + (priceValue.max || " "), step: 0.5 },
    })
}

type GetSelectData = Attribute & { children: (Attribute & { children: Attribute[] })[] } & { type: 'CATEGOR' } |
    Attribute & { children: (Attribute & { item: (ProductCard & { attribute: Attribute[] })[] })[], parent: Attribute[] } & { type: 'SUBCATEGOR' } |
    Attribute & { item: (ProductCard & { attribute: Attribute[], characteristic: (Characteristic & { content: CharacteristicItem[] })[] })[], parent: (Attribute & { parent: Attribute[] })[] } & { type: 'CLASS' }

function getSelectData(data: GetSelectData, categorData: storageCategorData) {
    let idCategor: string | number = ''
    let idSubcategor: string | number = ''
    let idClass: string | number = ''
    if (data.type === 'CLASS') {
        idCategor = data.parent[0].parent[0].id
        idSubcategor = data.parent[0].id
        idClass = data.id
    } else if (data.type === 'SUBCATEGOR') {
        idCategor = data.parent[0].id
        idSubcategor = data.id
    } else if (data.type === 'CATEGOR') {
        idCategor = data.id
    }
    const dataCategor = categorData.map(_ => ({ ..._, children: [] }))
    const dataSubcategor = idCategor ? categorData.find(_ => _.id === idCategor)!.children : []
    const dataClass = idSubcategor ? dataSubcategor.find(_ => _.id === idSubcategor)!.children : []

    const fullSelectData: ({ title: string, value: string | number, name: string } | {})[] = [
        { title: 'Категория', value: idCategor, name: dataCategor[0].type },
        idCategor ? { title: 'Подкатегория', value: idSubcategor, name: dataSubcategor[0].type } : {},
        idSubcategor ? { title: 'Группа', value: idClass, name: dataClass[0].type } : {},
    ]

    return fullSelectData as ({ title: string, value: string | number, name: string })[]
}

export default defineEventHandler<FilterData>(async(event) => {
    let s = Date.now()

    const query = getQuery(event)
    let attriduteId: number | string = ''

    if ('categor' in query) {
        attriduteId = parseInt(query.categor as string)
    }
    const storageData = await useStorage().getItem('categor:' + attriduteId)
    if (storageData) {
        return [
            ...storageData,
            { type: 'time', ms: Date.now() - s, state: 'cache data'}
        ]
    }


    let storageCategorData: storageCategorData | null = await useStorage().getItem('CATEGOR_DATA')
    if (!storageCategorData) {
        const categorAttriduteRes = await prisma.attribute.findMany({ where: { type: 'CATEGOR' }, include: { children: { include: { children: true } } } })
        await useStorage().setItem('CATEGOR_DATA', categorAttriduteRes)
        storageCategorData = categorAttriduteRes
    }

    try {
        if (attriduteId && typeof attriduteId === 'number') {
            // init Data other attribute
            const otherAttributeRes = await prisma.attribute.findMany({ where: { type: 'OTHER' } })
            const otherAttributeData = otherAttributeRes.map((_) => ({ type: 'radio', title: _.value, name: 'other', value: _.name, id: _.id }))


            const resCategor = await prisma.attribute.findUnique({
                where: { id: attriduteId }, select: { type: true }
            })

            if (resCategor) {
                let paramsSelect: Prisma.AttributeInclude = resCategor.type === 'CATEGOR' ?
                    { 'children': { 'include': { 'children': true } } } :
                    resCategor.type === 'SUBCATEGOR' ? { 'children': { 'include': { item: { include: { 'attribute': true } } } }, parent: true } :
                        { item: { include: { 'attribute': true, characteristic: { include: { content: true } } } }, parent: { include: { parent: true } } }

                const findDataRes = await prisma.attribute.findUnique({
                    where: { id: attriduteId }, include: paramsSelect
                }) as GetSelectData

                if (findDataRes) {


                    const FILTER_CATEGOR = { type: 'select', title: 'select', data: getSelectData(findDataRes, storageCategorData) } as FilterData['4']
                    const FILTER_RATING = { type: 'star', title: "Рейтинг", name: 'rating', value: 0 } as FilterData['5']
                    const FILTER_DISCOUNT = { type: 'radio', name: 'discount.gt', title: "Скидка", value: 1 } as FilterData['3']

                    switch (findDataRes.type) {
                        case 'CATEGOR': {
                            const fullfilterData: FilterData = [
                                FILTER_CATEGOR,
                                { type: 'time', ms: Date.now() - s, state: 'create data' }
                            ]
                            return fullfilterData
                        }
                        case 'SUBCATEGOR': {
                            const priseData = new Set<number>([])

                            for (let i = 0, l = findDataRes.children.length; i < l; i++) {
                                const group = findDataRes.children[i];
                                for (let j = 0, jl = group.item.length; j < jl; j++) {
                                    const item = group.item[j];
                                    priseData.add(item.price)
                                }

                            }

                            const fullfilterData: FilterData = [
                                FILTER_CATEGOR,
                                getPriceData([...priseData]),
                                FILTER_RATING,
                                [FILTER_DISCOUNT as never,...otherAttributeData as never],
                                { type: 'time', ms: Date.now() - s, state: 'create data'  }
                                // [findDataRes] as never
                            ]
                            await useStorage().setItem('categor:' + attriduteId, JSON.stringify(fullfilterData))
                            
                            return fullfilterData
                        }
                        case 'CLASS': {

                            const dataFilter = new Map<string, { data: (string | number)[], length: number }>()
                            // price data
                            const priseData = new Set<number>([])
                            const makerList = new Set<string>([])

                            function checkValidTitle(title:string) {
                                return !(['Ширина', 'Длина', 'Высота'].includes(title)) && title.search(/Единиц|Вес|Площадь/gi) === -1
                            }

                            for (let i = 0, l = findDataRes.item.length; i < l; i++) {
                                const elem = findDataRes.item[i]
                                
                                const nameMaker = elem.attribute.find((attr) => attr.type === 'MAKER')
                                if (nameMaker) {
                                    makerList.add(nameMaker.value)
                                }

                                for (let j = 0, jl = elem.characteristic.length; j < jl; j++) {
                                    const charItem = elem.characteristic[j]
                                    
                                    for (let k = 0, kl = charItem.content.length; k < kl; k++) {
                                        const item = charItem.content[k];
                                        const dataFilterItem = dataFilter.get(item.name)
                                        
                                        if (dataFilterItem && checkValidTitle(item.name)) {
                                            dataFilter.set(item.name, {
                                                data: [...dataFilterItem!.data, item.value],
                                                length: dataFilterItem!.length + 1
                                            })
                                        
                                        } else { dataFilter.set(item.name, { data: [item.value], length: 1 }) }
                                    }
                                }
                                priseData.add(elem.price)
                            }

                            // unnecessary characteristics are removed
                            const lengthItemArray = findDataRes.item.length
                            const updateData = [...dataFilter]
                            .filter(_ => _[1].length === lengthItemArray && _[1].data.length > 1)
                            .map(_ => ({
                                title: _[0],
                                data: [...new Set(_[1].data)],
                                length: _[1].length,
                                type: 'checkbox',
                                name: `chr-${_[0].split(' ').join('_')}`
                            }))
                            .sort()

                            // init maker data
                            const makerData: HH | {} = makerList.size ? {
                                title: "Производитель",
                                data: [...makerList].sort(),
                                type: 'checkbox',
                                name: 'maker'
                            } : {}


                            const fullfilterData: FilterData = [
                                FILTER_CATEGOR,
                                getPriceData([...priseData]),
                                FILTER_RATING,
                                (makerData as HH),
                                ...updateData,
                                [FILTER_DISCOUNT, ...otherAttributeData],
                                { type: 'time', ms: Date.now() - s, state: 'create data' }
                                // [findDataRes] as never,
                            ] as FilterData

                            await useStorage().setItem('categor:' + attriduteId, JSON.stringify(fullfilterData))
                            
                            return fullfilterData

                        }
                    }
                } 
            }
        }
    } catch (error) {
        return [
            { type: 'select', title: 'select', data: [] },
            { type: 'text', text: 'Something went wrong' }
        ]
    }
    return [
        { type: 'select', title: 'select', data: [] },
    ]
})

