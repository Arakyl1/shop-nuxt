import { Prisma } from "@prisma/client";

export const productCardBaseParams = <T extends Prisma.ProductCardSelect>(select: T) => {
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
export const productCardParamsForSearch = <T extends Prisma.ProductCardSelect>(select: T) => {
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

export function userBaseParams<T extends Prisma.UserSelect = {}>(
    where: Prisma.UserWhereUniqueInput, select: T) {
        return {
            where: where,
            select: {
                username: true,
                profileImage: true,
                ...select
            }
        }
    }
    
export function userAditionalParams<T extends Prisma.UserSelect = {}>(
    select: T){
        return {
            id: true,
            name: true,
            email: true,
            ...select
        }
    }
    

type DeepKeys<T> = T extends string ? never : {
    [K in keyof T & string]: T[K] extends boolean ? true : DeepKeys<T[K]>;
}[keyof T & string];

