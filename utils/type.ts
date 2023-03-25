import { LocationQueryValue } from "vue-router";

export interface FilterList {
    cat?: string | LocationQueryValue[],
    price: { from: number, upTo: number },
    maker: string[],
    ranting: number,
    actual: string[],
    other: string[],
}


