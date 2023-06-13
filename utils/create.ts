import { Prisma } from "@prisma/client";


export const createBaseProductCard = <T extends object>(data: T): Prisma.ProductCardCreateInput => {
    return {
        [modelProp('ProductCard','name')]: '',
        [modelProp('ProductCard','art')]: '',
        [modelProp('ProductCard','maker')]: '',
        [modelProp('ProductCard','categor')]: '',
        [modelProp('ProductCard','subcategor')]: '',
        [modelProp('ProductCard','price')]: 0,
        [modelProp('ProductCard','itemArt')]: '',
        [modelProp('ProductCard','itemMod')]: '',
        [modelProp('ProductCard','quantity')]: 0,
        ...data,
    }
}
