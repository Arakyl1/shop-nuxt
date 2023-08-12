import { H3Event } from "h3"
import prisma from "~~/server/db"
import { modelSelect } from "../../utils/prismaModelSelect";
import { Prisma } from "@prisma/client";
import { KeysMatchingWrite } from "~~/type/intex";



const propertyCard: Array<keyof Prisma.ProductCardWhereInput> = ['art', 'createAt', 'description', 'discount', 'id', 'itemArt', 'itemMod', 'name', 'price', 'quantity', 'views']

type WhereIntFilterKey = (keyof Prisma.IntFilter)
const WhereIntFilterKey: WhereIntFilterKey[] = ['equals', 'not', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte',]
type PropertyProductCardInt = KeysMatchingWrite<Prisma.ProductCardWhereInput, Prisma.IntFilter>
const PropertyProductCardInt: PropertyProductCardInt[] = ['discount', 'id', 'price', 'quantity', 'views']


function initWhereParams(query: QueryObject) {
    const findParams = Prisma.validator<Prisma.ProductCardFindManyArgs>()({
        where: {
            'AND': [],
            // OR: [],
        },
        take: 12,
        skip: 0,
        orderBy: []
    })

    // new parser
    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            const value = query[key];
            switch (true) {
                case key === 'categor': {
                    findParams.where.AND.push({ attribute: { some: { id: parseInt(value as string) } } } as never)
                    break;
                }
                case ['price', 'discount', 'views', 'createAt'].includes(key.split('.')[0]): {
                    const optionKey = key.split('.')
                    if (optionKey[0] && optionKey[1] && WhereIntFilterKey.includes(optionKey[1] as never)) {
                        findParams.where.AND.push({
                            [optionKey[0]]: {
                                [optionKey[1]]: optionKey[0] === 'createAt' ?
                                    new Date(value as string) :
                                    parseFloat(value as string)
                            }
                        } as never)
                    } else if (optionKey[0]) {
                        findParams.where.AND.push({
                            [optionKey[0]]: {
                                gte: optionKey[0] === 'createAt' ?
                                    new Date(value as string) :
                                    parseFloat(value as string)
                            }
                        } as never)
                    }
                    break;
                }
                case key.startsWith('chr-'): {
                    const name = key.replace('chr-', '').split('_').join(" ")
                    const arrValue = (value as string).split(',')
                    const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = []
                    for (let i = 0, l = arrValue.length; i < l; i++) {
                        const value = arrValue[i];
                        params.push({ characteristic: { some: { content: { some: { name: name, value: value } } } } })
                    }
                    findParams.where.AND.push({ OR: params } as never)
                    break;
                }
                case key === 'limit': {
                    findParams.take = parseInt(value as string) as never
                    break;
                }
                case key === 'maker': {
                    const arrValue = (value as string).split(',')
                    const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = []
                    for (let i = 0, l = arrValue.length; i < l; i++) {
                        const name = arrValue[i];
                        params.push({ attribute: { some: { value: { contains: name } } } } as never)
                    }
                    findParams.where.AND.push({ OR: params } as never)
                    break;
                }
                case key === 'other': {
                    const arrValue = (value as string).split(',')
                    for (let i = 0, l = arrValue.length; i < l; i++) {
                        const value = arrValue[i];
                        findParams.where.AND.push({ attribute: { some: { name: value } } } as never)
                    }
                    break;
                }
                case key === 'page': {
                    const pageVal = parseInt(value as string)
                    findParams.skip = pageVal as never
                    break;
                }
                case key === 'search': {
                    const whereParams: Prisma.ProductCardWhereInput = {
                        OR: [
                            { name: { contains: value, mode: 'insensitive' } },
                            { art: { contains: value, mode: 'insensitive' } },
                        ]
                    }
                    findParams.where.AND.push(whereParams as never)
                    break;
                }
                case key === 'rating': {
                    const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = { reviews: { 'some': { ranting: { gte: value ? parseInt(value) : 0 } } } }
                    findParams.where.AND.push(params as never)
                    break;
                }
                case key.startsWith('orderBy'): {
                    let finalKey = key.replace(/orderBy\.?/, '')
                    if (finalKey && ['asc', 'desc'].includes(value)) {
                        findParams.orderBy.push({ [finalKey]: value } as never)
                    }
                    break;
                }
                case key.startsWith('where'): {
                    let replaceKey = key.replace(/where\.?/, '')
                    if (replaceKey && value) {
                        let finalKey = replaceKey.split('.')
                        if (finalKey[1] && WhereIntFilterKey.includes(finalKey[1] as never)) {
                            if (finalKey[0] && PropertyProductCardInt.includes(finalKey[0] as never)) {
                                switch (finalKey[1] as unknown as WhereIntFilterKey) {
                                    case 'in': {
                                        findParams.where.AND.push({ [finalKey[0]]: { in: [...value.split(',').map((_: string) => parseFloat(_))] } } as never)
                                        break;
                                    }

                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
    }

    /// old parser
    // for (const key in query) {
    //     if (Object.prototype.hasOwnProperty.call(query, key)) {
    //         const value = query[key];
    //         if (key === 'categor') {
    //             findParams.where.AND.push({ attribute: { some: { id: parseInt(value as string) } } } as never)

    //         } else if (key === 'limit') {
    //             findParams.take = parseInt(value as string) as never
    //         } else if (key === 'maker') {
    //             const arrValue = (value as string).split(',')
    //             const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = []
    //             for (let i = 0, l = arrValue.length; i < l; i++) {
    //                 const name = arrValue[i];
    //                 params.push({ attribute: { some: { value: { contains: name } } } } as never)
    //             }
    //             findParams.where.AND.push({ OR: params } as never)
    //         } else if (key.startsWith('chr-')) {
    //             const name = key.replace('chr-', '').split('_').join(" ")
    //             const arrValue = (value as string).split(',')
    //             const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = []
    //             for (let i = 0, l = arrValue.length; i < l; i++) {
    //                 const value = arrValue[i];
    //                 params.push({ characteristic: { some: { content: { some: { name: name, value: value } } } } })
    //             }
    //             findParams.where.AND.push({ OR: params } as never)
    //         } else if (key === 'other') {
    //             const arrValue = (value as string).split(',')
    //             for (let i = 0, l = arrValue.length; i < l; i++) {
    //                 const value = arrValue[i];
    //                 findParams.where.AND.push({ attribute: { some: { name: value } } } as never)
    //             }
    //         } else if (['price', 'discount', 'views', 'createAt'].includes(key.split('.')[0])) {
    //             const optionKey = key.split('.')
    //             console.log(optionKey)
    //             if (optionKey[0] && optionKey[1] && WhereIntFilterKey.includes(optionKey[1] as never)) {
    //                 findParams.where.AND.push({
    //                     [optionKey[0]]: {
    //                         [optionKey[1]]: optionKey[0] === 'createAt' ?
    //                             new Date(value as string) :
    //                             parseFloat(value as string)
    //                     }
    //                 } as never)
    //             } else if (optionKey[0]) {
    //                 findParams.where.AND.push({
    //                     [optionKey[0]]: {
    //                         gte: optionKey[0] === 'createAt' ?
    //                             new Date(value as string) :
    //                             parseFloat(value as string)
    //                     }
    //                 } as never)
    //             }
    //         } else if (key.startsWith('orderBy')) {
    //             let finalKey = key.replace(/orderBy\.?/, '')
    //             if (finalKey && ['asc', 'desc'].includes(value)) {
    //                 findParams.orderBy.push({ [finalKey]: value } as never)
    //             }
    //         } else if (key === 'page') {
    //             const pageVal = parseInt(value as string)
    //             findParams.skip = pageVal as never
    //         } else if (key.startsWith('where')) {
    //             let replaceKey = key.replace(/where\.?/, '')
    //             if (replaceKey && value) {
    //                 let finalKey = replaceKey.split('.')
    //                 if (finalKey[1] && WhereIntFilterKey.includes(finalKey[1] as never)) {
    //                     if (finalKey[0] && PropertyProductCardInt.includes(finalKey[0] as never)) {
    //                         switch (finalKey[1] as unknown as WhereIntFilterKey) {
    //                             case 'in': {
    //                                 findParams.where.AND.push({ [finalKey[0]]: { in: [...value.split(',').map((_: string) => parseFloat(_))] } } as never)
    //                                 break;
    //                             }

    //                         }
    //                     }
    //                 }
    //             }
    //         } else if (key === 'search') {
    //             const whereParams: Prisma.ProductCardWhereInput = {
    //                 OR: [
    //                     { name: { contains: value, mode: 'insensitive' } },
    //                     { art: { contains: value, mode: 'insensitive' } },
    //                 ]
    //             }
    //             findParams.where.AND.push(whereParams as never)
    //         }
    //     }
    // }
    // console.log(findParams)
    return findParams
}

export default defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event)

    if ('unique' in query) {
        const findParams = Prisma.validator<Prisma.ProductCardFindManyArgs>()({
            where: { id: 0 },
        })
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                const value = query[key];
                if (key === 'id') {
                    findParams.where.id = parseInt(value as string) as never
                }
            }
        }
        try {
            const response = await prisma.productCard.findUnique({
                ...findParams, include: 'fullinfo' in query ? {
                    image: true,
                    reviews: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    username: true,
                                    profileImage: true,
                                    createAt: true,
                                    email: true,
                                }
                            }
                        }
                    },
                    attribute: true,
                    characteristic: { include: { content: true } }
                } : {}
            })
            if (response) {
                await prisma.productCard.update({ where: { id: response.id }, data: { views: response.views + 1 } })
            }
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    } else {
        try {
            const findParams = initWhereParams(query)
            // console.log(findParams)
            if (findParams.where.AND.length) {
                const res = await prisma.productCard.findMany({
                    ...findParams,
                    skip: (findParams.skip === 0 ? 0 : findParams.skip - 1) * findParams.take,
                    include: { image: { where: { main: true } }, attribute: true }
                })
                if (res.length === findParams.take) {
                    const nextPageRes = await prisma.productCard.findMany({
                        ...findParams,
                        skip: findParams.skip * findParams.take,
                        select: { id: true }
                    })
                    return {
                        data: res, nextPageLength: nextPageRes.length,
                        // params: {
                        //     ...findParams,
                        //     skip: (findParams.skip === 0 ? 0 : findParams.skip - 1) * findParams.take,
                        //     include: { image: { where: { main: true } }, attribute: true }
                        // }
                    }
                } else {
                    return {
                        data: res, nextPageLength: 0,
                        // params: {
                        //     ...findParams,
                        //     skip: (findParams.skip === 0 ? 0 : findParams.skip - 1) * findParams.take,
                        //     include: { image: { where: { main: true } }, attribute: true }
                        // }
                    }
                }
            } else {
                return null
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }
})