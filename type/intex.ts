import { Prisma } from "@prisma/client";
import { userBaseParams, userAditionalParams } from "@/utils/prismaSelect";
import { LocationQueryValue } from "vue-router";
import { productCardBaseParams, productCardParamsForSearch } from "@/utils/prismaSelect"
import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'

export interface LisLink extends MarkdownParsedContent {
    name: string,
    href: string
}
 
export type RecordOption<T extends PropertyKey, U> = { [K in T]: U} 


export interface UserCreateCommit {
    cardID: number
    ranting?: number
    text?: string
    userId: number
}

export interface Commit {
    text: string,
    ranting: number,
    user: {
        username: string,
        profileImage: string
    }
}

export interface CreateUser {
    
}

export type UserLoginData = { username: string, password: string }
export type UserRegisterData = UserLoginData & { email: string, repeartPassword: string }

export type BasketItem = { id: number, price: number, quantity: number }

const searchParams = userBaseParams({ id: -1 }, userAditionalParams({}))
const UserSelect = Prisma.validator<Prisma.UserArgs>()({select: searchParams.select })
export type UserBase = Prisma.UserGetPayload<typeof UserSelect>

export const productCardBaseParamsSelectFull = productCardBaseParams({
    ranting: true,
    itemArt: true,
    itemMod: true,
    description: true,
    characteristic: {
        select: {
            title: true,
            content: true
        }
    },
    reviews: {
        select: {
            ranting: true,
            text: true,
            user: {
                select: {
                    username: true,
                    profileImage: true
                }
            }

        }
    }
})
const _productCardBaseParamsSelectFull = Prisma.validator<Prisma.ProductCardArgs>()(productCardBaseParamsSelectFull)
export type _ProductCardFull = Prisma.ProductCardGetPayload<typeof _productCardBaseParamsSelectFull>


export const productCardBaseParamsSelect = productCardBaseParams({})
const _productCardBaseParamsSelect = Prisma.validator<Prisma.ProductCardArgs>()(productCardBaseParamsSelect)
export type _ProductCardBase = Prisma.ProductCardGetPayload<typeof _productCardBaseParamsSelect>


export const productCardParamsForSearchSelect = productCardParamsForSearch({ quantity: true })
const _productCardParamsForSearchSelect = Prisma.validator<Prisma.ProductCardArgs>()(productCardParamsForSearchSelect)
export type ProductCardForSearch = Prisma.ProductCardGetPayload<typeof _productCardParamsForSearchSelect>


export type CategorItem = { name: string,  children: (CategorItem |{ name: string })[] } 
export type CategorSelect = { select : CategorItem[]}


export interface FilterList {
    cat?: string | LocationQueryValue[],
    price: { from: number, upTo: number },
    maker: string[],
    ranting: number,
    actual: string[],
    other: string[],
}

export type BaseOptionProductCard = 'name'|'art'|'maker'|'categor'|'subcategor'|'price'|'itemArt'|'itemMod'|'quantity'
export interface CreateBaseProductCard {
    name: string,
    art: string,
    maker: string,
    categor: string,
    subcategor: string,
    price: number,
    itemArt: string,
    itemMod: string,
    quantity: number,
}

export type ImageInfo = { link: string }
export type CharacteristicItem = { name: string, value: string }
export type CharacteristicBlock = { name: string, content: CharacteristicItem[] }

export type ProductCardKeyParams = 'top'|'sale'|'news'|'delivery'|'pickUp'|'underTheOrder'
export type ProductCardParams = Partial<RecordOption<ProductCardKeyParams, boolean>> & { 'description'?: string }

export type ItemBasket = {
    id: number,
    quantity: number,
    price: number,
}


export const UserCreateSelect =  {
    id: true,
    email: true,
    name: true,
    username: true,
    profileImage: true,
}

const _UserCreateSelect = Prisma.validator<Prisma.UserArgs>()({ select: UserCreateSelect })
export type UserCreateBase = Prisma.UserGetPayload<typeof _UserCreateSelect>


export interface FilterList {
    cat?: string | LocationQueryValue[],
    price: { from: number, upTo: number },
    maker: string[],
    ranting: number,
    actual: string[],
    other: string[],
}