import { Prisma } from "@prisma/client"

export const selectUser = (obj?: Prisma.UserSelect) => ({
    ...obj,
    id: true,
    name: true,
    username: true,
    profileImage: true,
    createAt: true,
    email: true,
})

export const selectProductCard= (obj?:Prisma.ProductCardSelect) => ({
    ...obj,
    id: true,
    name: true,
    createAt: true,
    art: true,
    price: true,
    itemArt: true,
    itemMod: true,
    quantity: true,
    discount: true,
    views: true
})

export const selectCharacteristic = (obj?:Prisma.CharacteristicSelect) => ({
    ...obj,
    id: true,
    title: true
})

export const selectAttridute = (obj?:Prisma.AttributeSelect) => ({
    ...obj,
    id: true,
    name: true,
    value: true,
    type: true,
})

export const selectComment = (obj?:Prisma.CommentSelect) => ({
    ...obj,
    id: true,
    ranting: true,
    text: true,
})

export const selectImage = (obj?:Prisma.ImageSelect) => ({
    ...obj,
    id: true,
    link: true,
    main: true,
})

export const selectCharacteristicItem = (obj?:Prisma.CharacteristicItemSelect) => ({
    ...obj,
    id: true,
    name: true,
    value: true,
})

export const selectRefrechToken = (obj?:Prisma.RefrechTokenSelect) => ({
    ...obj,
    id: true,
    token: true,
    createAt: true,
})

export const selectAnonim = (obj?:Prisma.AnonimSelect): Prisma.AnonimSelect => ({
    ...obj,
    id: true,
    'createAt': true,
    'basket': { include: { 'item': { select: { 'card': { select: { ...selectProductCard({}) } } } }} }
})

export const selectBasketItem = (obj?:Prisma.BasketItemSelect): Prisma.BasketItemSelect => ({
    ...obj,
    id: true,
    count: true,
    'createAt': true,
    'basketId': true,
    'card': { select: selectProductCard() }
})