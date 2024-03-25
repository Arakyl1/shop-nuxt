import { Prisma } from "@prisma/client";
import { CookieKey, KeyAsyncData, NAMEAPP, ProductCardBase } from "~~/type/intex";
import type { Props as StatusProps } from "@/components/UI/Status/Status.vue";


type sizeI = 28|48|56|60|64|72|80|92|96|240|320|480
type num = 1|2|3|4|5|6|7|8|9|10

type TransfornSize = {
    asp?: `ar_${number}:${number}`, 
    crop?: 'c_crop'|'c_fill',
    obj?: `g_auto:${string}`, 
    heigth?:  `h_${sizeI}`,
    width?: `w_${sizeI}`,
    bgrem?: 'e_bgremoval'|`co_white,e_make_transparent:${num}`,
    
}


export function changeValueImageSize(url:string, size?: TransfornSize): string {
    if (isObject(size)) {
        return url.replace(/upload\//, () => `upload/${ Object.values(size).join(',')}/`);
    } else { return url }
}


export function generateKey(data:object): string {
    return Object.entries(data).flat(1).map(el => isObject(el) ? generateKey(el): el).join(',')
}

// week = 604800000
// mouth = 2678400000
export function checkDate(date:string, pastDate: number =  60480000000): boolean {
   return new Date(date).getTime() > (Date.now() - pastDate)
}



type Model = {
    User: Prisma.UserUncheckedCreateInput;
    RefrechToken: Prisma.RefrechTokenUncheckedCreateInput;
    ProductCard: Prisma.ProductCardUncheckedCreateInput;
    Comment: Prisma.CommentUncheckedCreateInput;
    Characteristic: Prisma.CharacteristicUncheckedCreateInput;
    CharacteristicItem: Prisma.CharacteristicItemCreateInput;
    Image: Prisma.ImageUncheckedCreateInput;
    Attribute: Prisma.AttributeUncheckedCreateInput
}
type f = Prisma.ModelName
type g = { [P in f]: Model[P] }

type modelProp = <T extends keyof Model, U extends keyof Model[T]>(key: T, prop: U) => U
export const modelProp: modelProp = (key, prop) => prop 





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
export function isNumeric(str: string | number): boolean {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

export function test(...f:any) {
    console.log(...f);
}

export function getScreenSize(window: Window) {
    return { width: window.innerWidth, height: window.innerHeight }
}


export const toFixed = (value: number, size?: number) => parseFloat(value.toFixed(size || 2))


export const sessionGet = (key: string) => sessionStorage.getItem(key)
export const sessionSet = (key: string, elem: any) => sessionStorage.setItem(key, JSON.stringify(elem))
export const sessionRemove = (key: string) => sessionStorage.removeItem(key)

type KeyLocalStorage = `${NAMEAPP}_basket`|`${NAMEAPP}_favorite`
export const localGet = (key: KeyLocalStorage) => localStorage.getItem(key)
export const localSet = (key: KeyLocalStorage, elem: any) => localStorage.setItem(key, JSON.stringify(elem))
export const localRemove = (key: KeyLocalStorage) => localStorage.removeItem(key)


export const GET_CONTENT_KEY = (key: string) => key
export const GET_ASYNC_DATA_KEY = (key: KeyAsyncData) => key

export const getLanguageUser = (locale: string) => locale.split(',').map(_ => _.split(';')).filter(_ => _.length > 1 && _[0].split('-').length === 1).map(_ => [_[0],parseFloat(_[1].replace('q=','')) ])//.map(_ => _[0])


export function getStatus(data:ProductCardBase | null) {
    if (!data) return null
    let status: StatusProps['status'] | undefined


    switch (true) {
        case data.discount > 0: {
            status = 'discount'
            break;
        }
        case checkDate(data.createAt as unknown as string): {
            status = 'news'
            break;
        }
    }
    return status
}

export const getKeyCookie = (k: CookieKey) => k

export const isClient = () => process.client
export const isServer = () => process.server