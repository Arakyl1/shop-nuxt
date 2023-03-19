import { SelectProductCard } from "@/type/intex";


export function selectForCard<T, U = {}>(select?: U): T {
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


const ff = selectForCard<SelectProductCard>()
ff.select.art
export function selectCardBySearch(select?: object): object {
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
