import { type ProductCard } from "@prisma/client";

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
export function checkProductAvailability<T extends { availability: boolean }>(data: T): boolean {
    return unref(data.availability)
}

export function isNumber(elem: unknown): elem is number {
    return typeof unref(elem) === 'number'
}

export function isString(elem: unknown): elem is string {
    return typeof unref(elem) === 'string'
}