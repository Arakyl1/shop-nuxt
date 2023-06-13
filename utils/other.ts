import { Prisma, type ProductCard, } from "@prisma/client";

type sizeI = 28|48|56|60|64|72|80|92|96|224|320|480

type TransfornSize = {
    heigth?:  `h_${sizeI}`,
    width?: `w_${sizeI}`,
    bgrem?: 'e_bgremoval',
}


export function changeValueImageSize(url:string, size?: TransfornSize): string {
    if (typeof size === 'object') {
        return url.replace(/upload\//, () => `upload/${ Object.values(size).join(',')}/`);
    } else { return url }
}


export function generateKey(data:object): string {
    return Object.entries(data).flat(1).map(el => isObject(el) ? generateKey(el): el).join(',')
}


export function checkAvailability<T extends { availability: boolean }>(data: T): boolean {
    return unref(data.availability)
}

type Model = {
    'User': Prisma.UserUncheckedCreateInput ,
    'RefrechToken': Prisma.RefrechTokenUncheckedCreateInput ,
    'Post': Prisma.PostUncheckedCreateInput,
    'ProductCard': Prisma.ProductCardUncheckedCreateInput,
    'Comment': Prisma.CommentUncheckedCreateInput,
    'Characteristic': Prisma.CharacteristicUncheckedCreateInput,
    'CharacteristicItem': Prisma.CharacteristicItemCreateInput,
    'Image': Prisma.ImageUncheckedCreateInput
}
type f = Prisma.ModelName
type g = { [P in f]: Model[P] }

type modelProp = <T extends keyof Model, U extends keyof Model[T]>(key: T, prop: U) => U
export const modelProp: modelProp = (key, prop) => prop 


export function deepConcat<T extends { [property: string]: any }>(dataAdd:T, dataDef: T): T {
    for (let key of Object.keys(dataAdd)) {     
        if (!dataDef.hasOwnProperty(key) || !isObject(dataDef[key])) {
            dataDef[key] = dataAdd[key]
        } else {
            if (Array.isArray(dataDef[key]) && Array.isArray(dataAdd[key])) {
                dataDef[key] = dataDef[key].concat(dataAdd[key])
            } else {
                deepConcat(dataAdd[key], dataDef[key])
            }
        }
    }
    return dataDef
}

export function checkValidInput<T extends HTMLInputElement>(arr: T[]): boolean {
    let valid: boolean = false
    if (!arr) return valid
    
    if (Array.isArray(arr)) {
        valid = arr.find(_ => !_.validity.valid) ? false : true
    }
    return valid 
}

export function isNumber(elem: unknown): elem is number {
    return typeof unref(elem) === 'number'
}

export function isString(elem: unknown): elem is string {
    return typeof unref(elem) === 'string'
}

export function isBoolean(elem: unknown): elem is boolean {
    return typeof unref(elem) === 'boolean'
}

export function isObject(elem: unknown): elem is object {
    return typeof unref(elem) === 'object'
}

export function test(...f:any) {
    console.log(...f);
}


export let keyWhereValueIsNumber = [
    modelProp('ProductCard', 'id'),
    modelProp('ProductCard', 'price'),
    modelProp('ProductCard', 'quantity'),
    modelProp('ProductCard', 'ranting')
]
