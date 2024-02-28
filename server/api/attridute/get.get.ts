import { Prisma, } from "@prisma/client";
import prisma from "~~/server/db";
import { storageCategorData } from "~~/type/intex";


const AttributeKey: Array<keyof Prisma.AttributeWhereInput> = ['children', 'id', 'item', 'name', 'parent', 'type', 'value']
type WhereIntFilterKey = (keyof Prisma.IntFilter)

function initFindParams(data: QueryObject) {
    const findParams = Prisma.validator<Prisma.AttributeFindManyArgs>()({
        where: {
            'AND': [],
        },
        include: { 'children': { include: { 'children': true } } }
    })

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const _key = key as keyof Prisma.AttributeWhereInput
            const value = data[_key];
            if (_key.startsWith('type')) {
                const arrValue = (value as string).split(',')
                const params: Prisma.Enumerable<Prisma.AttributeWhereInput> = []
                for (let i = 0, l = arrValue.length; i < l; i++) {
                    const item = arrValue[i];
                    params.push({ type: item } as never)
                }
                findParams.where.AND.push({ OR: params } as never)
            }
        }
    }

    return findParams
}

export default defineEventHandler(async (event) => {

    
    const query = getQuery(event)

    const getStorageKey = Object.entries(query).map(_ => _.join(':')).join('/')
    let storageData: storageCategorData | null = await useStorage().getItem(getStorageKey)

    try {
        if (storageData) {
            console.log('cache data')
            return storageData
        } else {
            const findParams = initFindParams(query)
            const categorAttributeRes = await prisma.attribute.findMany(findParams)
            await useStorage().setItem(getStorageKey, categorAttributeRes)
            return categorAttributeRes
        }
    } catch (error) {
        return null
    }
})