import { Attribute, Characteristic, CharacteristicItem, Prisma, ProductCard } from "@prisma/client"
import prisma from "~~/server/db"
import { FilterData, HH, storageCategorData } from "~~/type/intex"


function getPriceData(data: number[]): HH {
    const priceValue = { min: Math.min(...data), max: Math.max(...data) }
    return ({
        type: 'number-range', title: "Цена",
        from: { name: 'price.gte', min: priceValue.min, max: priceValue.max, placeholder: 'От', step: 0.01 },
        to: { name: 'price.lte', min: priceValue.min, max: priceValue.max, placeholder: 'До', step: 0.01 },
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

export default defineEventHandler<FilterData>(async (event) => {
    let s = Date.now()

    const query = getQuery(event)
    let attriduteId: number | string = ''

    if ('categor' in query) {
        attriduteId = parseInt(query.categor as string)
    }
    const storageData = await useStorage().getItem('categor:' + attriduteId)
    if (storageData) {
        console.log(Date.now() - s, 'cache data')
        return storageData
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

                    switch (findDataRes.type) {
                        case 'CATEGOR': {
                            const fullfilterData: FilterData = [
                                { type: 'select', title: 'select', data: getSelectData(findDataRes, storageCategorData) },
                                [findDataRes] as never
                            ]
                            console.log(Date.now() - s, 'create data categor')
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
                                { type: 'select', title: 'select', data: getSelectData(findDataRes, storageCategorData) },
                                getPriceData([...priseData]),
                                { type: 'star', title: "Рейтинг", name: 'rating', value: 0 },
                                [
                                    { type: 'radio', name: 'discount.gt', title: "Скидка", value: 0 } as never,
                                    ...otherAttributeData as never
                                ],
                                [findDataRes] as never
                            ]
                            await useStorage().setItem('categor:' + attriduteId, JSON.stringify(fullfilterData))
                            console.log(Date.now() - s, 'create data subcategor')
                            return fullfilterData
                        }
                        case 'CLASS': {

                            const dataFilter = new Map<string, { data: (string | number)[], length: number }>()
                            // price data
                            const priseData = new Set<number>([])


                            for (let i = 0, l = findDataRes.item.length; i < l; i++) {
                                const elem = findDataRes.item[i] as Prisma.ProductCardGetPayload<{ include: { characteristic: true, attribute: true } }>
                                for (let j = 0, jl = elem.characteristic.length; j < jl; j++) {
                                    const charItem = elem.characteristic[j] as Prisma.CharacteristicGetPayload<{ include: { content: true } }>
                                    for (let k = 0, kl = charItem.content.length; k < kl; k++) {
                                        const item = charItem.content[k];
                                        if (dataFilter.has(item.name)) {
                                            const dataFilterItem = dataFilter.get(item.name)
                                            dataFilter.set(item.name, { data: [...dataFilterItem!.data, item.value], length: dataFilterItem!.length + 1 })
                                        } else { dataFilter.set(item.name, { data: [item.value], length: 1 }) }
                                    }
                                }
                                priseData.add(elem.price)
                            }

                            // unnecessary characteristics are removed
                            const lengthItemArray = findDataRes.item.length
                            const updateData = [...dataFilter].map(_ => ({ title: _[0], data: [...new Set(_[1].data)], length: _[1].length, type: 'checkbox', name: `chr-${_[0].split(' ').join('_')}` }))
                                .filter(_ => _.length === lengthItemArray
                                    && _.title !== 'Ширина'
                                    && _.title !== 'Длина'
                                    && _.title !== 'Высота'
                                    && _.title.search(/Единиц|Вес|Площадь/gi) === -1
                                    && _.data.length > 1
                                ).sort()

                            // init maker data
                            const makerList = findDataRes.item
                                .map((_) => (_ as ProductCard & { attribute: Attribute[], characteristic: Characteristic[] }).attribute
                                    .find((attr) => attr.type === 'MAKER')?.value).filter(_ => _)
                            const makerData: HH | {} = makerList.length ? { title: "Производитель", data: [...new Set([...makerList])].sort(), type: 'checkbox', name: 'maker' } : {}


                            const fullfilterData: FilterData = [
                                { type: 'select', title: 'select', data: getSelectData(findDataRes, storageCategorData) },
                                getPriceData([...priseData]),
                                { type: 'star', title: "Рейтинг", name: 'rating', value: 0 },
                                (makerData as HH),
                                ...updateData,
                                [
                                    { type: 'radio', title: "Скидка", name: 'discount.gt', value: 0 },
                                    ...otherAttributeData
                                ],

                                [findDataRes] as never,

                            ] as FilterData

                            await useStorage().setItem('categor:' + attriduteId, JSON.stringify(fullfilterData))
                            console.log(Date.now() - s, 'create data')
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

