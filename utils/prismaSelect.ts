import type { RecordOption, ProductCardBaseOption, ProductCardSearchOption } from "@/type/intex";

export type ProductCardSelect<T extends PropertyKey, U extends PropertyKey> = {
    select: RecordOption<T | U, true>
}

export const selectForCard = <T extends object>(select: T)
    : ProductCardSelect<ProductCardBaseOption, keyof T> => {
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
export const selectCardBySearch = <T extends object>(select: T)
    : ProductCardSelect<ProductCardSearchOption, keyof T> => {
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


