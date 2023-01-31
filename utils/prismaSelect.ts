export function selectForCard(select?:object):object {
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

export function selectCardBySearch(select?:object):object {
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
