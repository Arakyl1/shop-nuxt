import { Prisma, } from "@prisma/client";
import prisma from "@/server/db";
import { storageCategorData } from "~~/type/intex";


const AttributeKey: Array<keyof Prisma.AttributeWhereInput> = ['children', 'id', 'item', 'name', 'parent', 'type', 'value']
type WhereIntFilterKey = (keyof Prisma.IntFilter)

function initFindParams<T extends { [k: string]: unknown }>(data: T) {
    const findParams = Prisma.validator<Prisma.AttributeFindManyArgs>()({
        where: {
            'AND': [],
        },
        include: { 'children': { include: { 'children': true } } }
    })

    Object.entries(data).forEach(_ => {
        const [key, value] = _ as [keyof Prisma.AttributeWhereInput, string]
        if (key.startsWith('type')) {
            const arrValue = value.split(',')
            const params: Prisma.Enumerable<Prisma.AttributeWhereInput> = []

            arrValue.forEach(_v => params.push({ type: _v } as never))
            findParams.where.AND.push({ OR: params } as never)
        }
    })

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
        console.log(error)
        return null
    }
})