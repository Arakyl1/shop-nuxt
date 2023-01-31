import { LocationQueryValue } from "vue-router";
export interface User {
    id?: number,
    profileImage: string,
    name?: string,
    username: string,
    ranting?: number
}

export interface FilterList {
    cat: string | LocationQueryValue[],
    price: { from: number, upTo: number },
    maker: string[],
    ranting: number,
    actual: string[],
    other: string[],
}

export interface FilterOption{
    price?:{ gte?: number, lte?: number },
    ranting?: { gte: number },
    categor: string,
}

export interface ListProduct {
    name: string;
    art: string;
    maker: string;
    img: string,
    categor: string;
    subcategor: string;
    price: number;
    itemArt: string;
    itemMod: string;
    quantity: number;
}