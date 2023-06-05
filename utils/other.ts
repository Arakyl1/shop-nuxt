import { Prisma, type ProductCard } from "@prisma/client";

type sizeI = 28|48|56|60|64|72|80|92|96|224|320

type TransfornSize = {
    heigth?:  `h_${sizeI}`,
    width?: `w_${sizeI}`
}


export function changeValueImageSize(url:string, size?: TransfornSize): string {
    if (typeof size === 'object') {
        return url.replace(/upload\//, () => `upload/${ Object.values(size).join(',')}/`);
    } else { return url }
}


export function generateKey(data:object): string {
    return Object.entries(data).flat(1).map(el => typeof el === 'object' ? generateKey(el): el).join(',')
}

export function createObj<T extends (string | number)>(data: T[]): { [property: string]: true } {
    return Object.assign({}, ...data.map(_ => ({ [_]: true }))) 
}

export function checkProductAvailability<T extends { availability: boolean }>(data: T): boolean {
    return unref(data.availability)
}

type GetPropertyName = <T extends keyof Prisma.ProductCardWhereInput>(key: T) => T
export const getPropertyName: GetPropertyName = (key) => key


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