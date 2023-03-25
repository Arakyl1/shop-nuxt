import { Prisma } from '@prisma/client'


export const selectForCard = <T extends object>(select: T) => {
    return {
        select: {
            id: true,
            name: true,
            art: true,
            price: true,
            img: true,
            news: true,
            sale: true,
            quantity: true,
            ...select
        }
    }
}
export const selectCardBySearch = <T extends object>(select: T) => {
    return {
        select: {
            id: true,
            name: true,
            art: true,
            price: true,
            sale: true,
            img: true,
            ...select
        }
    }
}


type DeepKeys<T> = T extends string ? never : {
    [K in keyof T & string]: T[K] extends boolean ? true : DeepKeys<T[K]>;
}[keyof T & string];

