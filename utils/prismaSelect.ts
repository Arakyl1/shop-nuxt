export function selectForCard():object {
    return {
        select: {
            id: true,
            name: true,
            art: true,
            price: true,
            img: true,
            news: true,
            sale: true,
            quantity: true
        }
    }
}

export function selectCardBySearch():object {
    return {
        select: {
            id: true,
            name: true,
            art: true,
            price: true,
            img: true
        }
    }
}