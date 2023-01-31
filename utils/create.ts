import { RouteLocationNormalizedLoaded } from "vue-router";
import { FilterList, ListProduct } from "./type";

export function filterList(route: RouteLocationNormalizedLoaded): FilterList {
    return {
        cat: route.query.categor ? route.query.categor : 'Категория',
        price: { from: 0, upTo: 0 },
        ranting: 0,
        maker: [],
        actual: [],
        other: [],
    }
}

export function ListProduct(select?: object):ListProduct {
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