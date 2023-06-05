import { RouteLocationNormalizedLoaded } from "vue-router";
import { FilterList } from "@/type/intex";
import { Prisma } from "@prisma/client";


export const filterList = (categor?: string): Prisma.ProductCardWhereInput => {
    return {
        categor: categor || 'Категория'
    }
}

export const createBaseProductCard = <T extends Prisma.ProductCardCreateArgs['select'] = {}>(select: T) => {
    return {
        name: '',
        art: '',
        maker: '',
        categor: '',
        subcategor: '',
        price: 0,
        itemArt: '',
        itemMod: '',
        quantity: 0,
        ...select
    }
}
