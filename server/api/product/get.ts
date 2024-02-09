import { H3Event } from "h3"
import prisma from "~~/server/db"
import { Prisma } from "@prisma/client";
import { getWhereParamsCons, initFindParams, parceIncludeParams, parceOrderByParams, parseOtherArgs, parseSearchParams } from "@/server/utils/parseUrl";
import { selectAttridute, selectCharacteristic, selectImage, selectComment, selectProductCard, selectCharacteristicItem, selectUser } from "@/server/utils/selectData";
import { KeysMatchingWrite, getModelName } from "@/type/intex";

type modelName = getModelName<'ProductCard'>
const modelName: Uncapitalize<modelName> = 'productCard'
type ThisMainTypeWhereInput = Prisma.ProductCardWhereInput
type ThisMainTypeSelect = Prisma.ProductCardSelect
type ThisMainTypeInclude = Prisma.ProductCardInclude

const propertyElem: Array<keyof ThisMainTypeWhereInput> = ['name','art','itemArt','itemMod']
const propertyElemOrderBy: Array<keyof ThisMainTypeWhereInput> = ['id','name','discount','createAt','price','quantity','views']
type PropertyElemInt = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.IntFilter>
const PropertyElemInt: PropertyElemInt[] = ['id','discount','price','quantity','views']
type PropertyElemString = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.StringFilter>
const PropertyElemString: PropertyElemString[] = ['name','art','description','itemArt','itemMod']
type PropertyElemDate = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.DateTimeFilter>
const PropertyElemDate: PropertyElemDate[] = ['createAt']
type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'attribute' | 'characteristic' | 'image' | 'reviews'|'basket'>
const keyPropElemRelation: keyPropElemRelation[] = ['attribute','characteristic','image','reviews']


type GG<T extends keyof ThisMainTypeSelect> = { [P in T]: { [L in keyof ThisMainTypeSelect[P]]: any } }
const includeElemSelectParams: ThisMainTypeInclude = {
    'attribute': { select : { ...selectAttridute() } },
    'characteristic': { select: { ...selectCharacteristic({ 'content': { 'select': { ...selectCharacteristicItem() } } }) } },
    'image': { select: { ...selectImage() } },
    'reviews': { select: { ...selectComment({ 'user': { select: { ...selectUser() } } }) } },
}

const ElemFullDataKey: ThisMainTypeSelect = {
    id: true,
    'art': true,
    'description': true,
    'discount': true,
    'itemArt': true,
    'itemMod': true,
    'name': true,
    'price': true,
    'quantity': true,
    'views': true,
    'createAt': true,
    ...includeElemSelectParams
}

function initProductCardFindParams(...arg: Parameters<initFindParams>) {
    const key = arg[0]
    const value = arg[1]
    const addParams = arg[2]
    const addError = arg[3]

    const _key = key as PropertyElemInt | PropertyElemString | PropertyElemDate |
        'limit' | 'page' | 'include' | 'orderBy' | 'categor' | 'search' | 'maker' | 'rating' | 'other' | `chr-${string}`

    switch (_key) {
        case 'categor': {
            const _value = { attribute: { some: { id: parseInt(value as string) } } }
            addParams('where', _value)
            break;
        }
        case 'search': {
            const res = parseSearchParams(value, propertyElem)
            if (res.OR.length) {
                addParams('where', res)
            }
            break;
        }
        case 'limit': {
            const resParse = parseOtherArgs('take' as never, value)
            console.log(resParse)
            if (resParse.error.length) {
                resParse.error.forEach(_ => addError(_))
            } else {
                addParams('take', resParse.data.take)
            }
            break;
        }
        case 'page': {
            const resParse = parseOtherArgs('skip' as never, value)
            if (resParse.error.length) {
                resParse.error.forEach(_ => addError(_))
            } else {
                addParams('skip', resParse.data.skip)
            }
            break;
        }

        case 'orderBy': {
            const res = parceOrderByParams(value, propertyElemOrderBy)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('orderBy', res.data)
            }
            break;
        }
        case 'include': {
            const res = parceIncludeParams<typeof includeElemSelectParams>(value, includeElemSelectParams)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('include', res.data)
            }
            break
        }
        case 'maker': {
            const _value = value.split(',').map(_ => ({
                attribute: { some: {
                    value: { contains: _, mode: 'insensitive' },
                    type: 'MAKER'
                } }
            }))
            addParams('where', { 'OR': _value })
            break;
        }
        case 'rating': {
            const _value = { reviews: { 'some': { ranting: { gte: value ? parseInt(value) : 0 } } } }
            addParams('where', _value)
            break;
        }
        case 'other': {
            const arrValue = (value as string).split(',')
            for (let i = 0, l = arrValue.length; i < l; i++) {
                const value = arrValue[i];
                addParams('where', { attribute: { some: { name: value } } } as never)
            }
            break;
        }
        case 'id':
        case 'discount':
        case 'views':
        case 'price':
        case 'quantity':{
            const res = getWhereParamsCons(value, getWhereParamsForInt)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                // console.log(res.data)
                addParams('where', { [key]: res.data === value ? Number(res.data) : res.data })
            }
            break;
        }
        case 'name':
        case 'art':
        case 'description':
        case 'itemArt':
        case 'itemMod':{
            const res = getWhereParamsCons(value, getWhereParamsForString)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        case 'createAt':{
            const res = getWhereParamsCons(value, getWhereParamsForDate)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data === value ? new Date(parseInt(res.data)) : res.data })
            }
            break;
        }
        default: {
            if (_key.startsWith('chr-')) {
                const name = key.replace('chr-', '').split('_').join(" ")
                const arrValue = (value as string).split(',').map(_ => _.split('__').join(' '))
                const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = []
                for (let i = 0, l = arrValue.length; i < l; i++) {
                    const value = arrValue[i];
                    params.push({ characteristic: { some: { content: { some: { name: name, value: value } } } } })
                }
                addParams('where', { OR: params })
                break;
            } else {
                addError({ message: `unknown operator "${key}"` , type: 'error' })
            }
        }
    }
}



export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    try {
        const resParseData = initFindParams(
            query as { [k: string]: string },
            initProductCardFindParams,
            ElemFullDataKey,
            keyPropElemRelation
        )

        if (resParseData.error.length) {
            return { data: null, error: resParseData.error[0] }
        } else {
            if (resParseData.unique) {
                const resData = await prisma[modelName].findUnique({
                    where: resParseData.params.where,
                    select: resParseData.params.select
                } as never)
                return { data: resData }
            } else {
                const allItem = await prisma[modelName].findMany({
                    where: resParseData.params.where,
                    select: { id: true }
                })

                const resData = await prisma[modelName].findMany({
                    ...resParseData.params,
                    select: {
                        ...selectProductCard({ 'description': false }),
                        ...resParseData.params.include,
                        image: { select: { ...selectImage() } }
                    },
                    skip: resParseData.params.skip <= 0 ? 0 : (resParseData.params.skip - 1) * resParseData.params.take,
                    include: false
                } as never)

                return {
                    data: resData,
                    nextPageLength: 0,
                    countItem: allItem.length
                    // findParams: {
                    //     ...resParseData.params,
                    //     skip: resParseData.params.skip <= 0 ? 0 : (resParseData.params.skip - 1) * resParseData.params.take
                    // }
                }

                // if (resData.length === resParseData.params.take) {
                //     const resDataNext = await prisma[modelName].findMany({
                //         where: resParseData.params.where,
                //         select: { id: true }
                //     })
                //     return {
                //         data: resData,
                //         nextPageLength: resDataNext.length ? resDataNext.length : 0,
                //         countItem: resDataNext.length ? resDataNext.length : 0,
                //         // findParams: {
                //         //     ...resParseData.params,
                //         //     skip: resParseData.params.skip <= 0 ? 0 : (resParseData.params.skip - 1) * resParseData.params.take
                //         // }
                //     }
                // } else {
                   
                // }
            }
        }

    } catch (error: any) {
        console.log(error)
        return { data: null, error: null }
    }
})
