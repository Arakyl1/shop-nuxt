import { Prisma } from "@prisma/client";

const ProductCardBase = Prisma.validator<Prisma.ProductCardFindManyArgs['select']>()({
    id: true,
    name: true,
    art: true,
    itemArt: true,
    itemMod: true,
    price: true,
    quantity: true,
    attribute: {
        select: {
            id: true,
            name: true,
        }
    },
    image: {
        select: { link: true },
        where: { main: true }
    }
})

export const modelSelect = {
    base: ProductCardBase
}


export type ProductCardBase = Prisma.ProductCardGetPayload<{ select: typeof modelSelect['base'] }>