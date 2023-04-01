import { RouteLocationNormalizedLoaded } from "vue-router";
import { FilterList } from "@/type/intex";
import { Prisma } from "@prisma/client";


export const filterList = <T extends RouteLocationNormalizedLoaded>(route: T): FilterList => {
    return {
        cat: route.query.categor ? route.query.categor : 'Категория',
        price: { from: 0, upTo: 0 },
        ranting: 0,
        maker: [],
        actual: [],
        other: [],
    }
}

export const createBaseProductCard = <T extends Prisma.ProductCardSelect = {}>(select: T) => {
    return {
        name: '',
        art: '',
        maker: '',
        categor: '',
        img: '',
        subcategor: '',
        price: 0,
        itemArt: '',
        itemMod: '',
        quantity: 0,
        ...select
    }
}
