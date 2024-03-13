import { H3Event } from "h3"
import prisma from "~~/server/db"
import { Prisma } from "@prisma/client";
import { selectAttridute, selectCharacteristic, selectImage, selectComment, selectProductCard, selectCharacteristicItem, selectUser } from "@/server/utils/selectData";
import { KeysMatchingWrite, getModelName } from "@/type/intex";
import { default as useParceParamsForPrisma, type initFindParams } from "@/server/utils/useParceParamsForPrisma";

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
const keyPropElemRelation: keyPropElemRelation[] = ['attribute','characteristic','reviews']


type GG<T extends keyof ThisMainTypeSelect> = { [P in T]: { [L in keyof ThisMainTypeSelect[P]]: any } }
const includeElemSelectParams: ThisMainTypeInclude = {
    'attribute': { select : { ...selectAttridute() } },
    'characteristic': { select: { ...selectCharacteristic({ 'content': { 'select': { ...selectCharacteristicItem() } } }) } },
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
    'image': { select: { ...selectImage() } },
    ...includeElemSelectParams
}


const MODEL_DATA = {
    FULL_KEY: ElemFullDataKey,
    INT_KEY: PropertyElemInt,
    STRING_KEY: PropertyElemString,
    DATE_KEY: PropertyElemDate,
    RELATION_KEY: keyPropElemRelation,
    ORDERBY_KEY: propertyElemOrderBy,
    RELATION_SELECT: includeElemSelectParams,
    SEARCH_KEY: propertyElem
}

function initProductCardFindParams(...arg: Parameters<initFindParams>) {
    const [key, value, addParams, addError, checkForErrors, handleDefaultCase] = arg


    const _key = key as PropertyElemInt | PropertyElemString | PropertyElemDate |
        'limit' | 'page' | 'include' | 'orderBy' | 'categor' | 'search' | 'maker' | 'rating' | 'other' | `chr-${string}`

    switch (_key) {
        case 'categor': {
            const _value = { attribute: { some: { id: parseInt(value as string) } } }
            addParams('where', _value)
            break;
        }
        case 'maker': {
            const _value = value.split(',').map(_ => ({
                attribute: { some: {
                    value: { contains: _.split('__').join(' '), mode: 'insensitive' },
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
            const _value = (value).split(',')
            _value.forEach(_ => {
                addParams('where', { attribute: { some: { name: _ } } })
            })
            break;
        }
        default:
            if (_key.startsWith('chr-')) {
                const name = key.replace('chr-', '').split('_').join(" ")
                const _value = (value).split(',').map(_ => _.split('__').join(' '))
                const params: Prisma.Enumerable<Prisma.ProductCardWhereInput> = []
                _value.forEach(_ => {
                    params.push({ characteristic: { some: { content: { some: { name: name, value: { contains: _, 'mode': 'insensitive' } } } } } })
                })
                addParams('where', { OR: params })
        
            } else {
                handleDefaultCase(_key, value, addParams)
            }
            break;
    }
}

async function findUniqueData(params: FindParams, modelName: string) {
    return await prisma[modelName].findUnique({
        where: params.where,
        select: params.select
    });
}

async function findManyData(params: FindParams, modelName: string) {
    const allItem = await prisma[modelName].findMany({
        where: params.where,
        select: { id: true }
    });
    const resData = await prisma[modelName].findMany({
        ...params,
        select: {
            ...selectProductCard({ 'description': false }),
            ...params.include,
        },
        skip: params.skip <= 0 ? 0 : (params.skip - 1) * params.take,
        include: false
    });

    return { resData, allItem };
}



export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { handleQueryParams } = useParceParamsForPrisma(query as { [k: string]: any }, MODEL_DATA)
    try {
        const res = handleQueryParams(initProductCardFindParams)
      
        if (res.error && res.error.length > 0) return { data: null, error: res.error[0] }

        if (res.unique) {
            const resData = await findUniqueData(res.params, modelName);
            return { data: resData, error: null };
        } else {
            
            const { resData, allItem } = await findManyData(res.params, modelName);
            return {
                data: resData,
                nextPageLength: 0,
                countItem: allItem.length,
                error: null
            }
        }

    } catch (error: any) {
        console.log(error)
        return { data: null, error: null }
    }
})
