import { Prisma, ProductCard } from "@prisma/client";
import { returnParamsAditional, returnParamsMain } from "~~/server/utils/searchParams";
import { LocationQueryValue } from "vue-router";

export type Request = 
| { key: 'ProductCard', data: ProductCard }


export type ProductCardSearchOption = 'id'|'name'|'art'|'price'|'img'|'sale'
export type ProductCardBaseOption = 'id'|'name'|'art'|'price'|'img'|'news'|'sale'|'quantity'
 
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

const searchParams = returnParamsMain({ id: -1 }, returnParamsAditional({}))
const UserSelect = Prisma.validator<Prisma.UserArgs>()({select: searchParams.select })
export type UserBase = Prisma.UserGetPayload<typeof UserSelect>

export const selectOptionFull = selectForCard({
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
export const selectOptionBase = selectForCard({})
export const selectOptionSearch = selectCardBySearch({ quantity: true })


const _selectOptionSearch = Prisma.validator<Prisma.ProductCardArgs>()(selectOptionSearch)
export type ProductCardForSearch = Prisma.ProductCardGetPayload<typeof _selectOptionSearch>

const _selectOptionBase = Prisma.validator<Prisma.ProductCardArgs>()(selectOptionBase)
export type _ProductCardBase = Prisma.ProductCardGetPayload<typeof _selectOptionBase>

const _selectOptionFull = Prisma.validator<Prisma.ProductCardArgs>()(selectOptionFull)
export type _ProductCardFull = Prisma.ProductCardGetPayload<typeof _selectOptionFull>


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

export type BaseOptionProductCard = 'name'|'art'|'maker'|'categor'|'img'|'subcategor'|'price'|'itemArt'|'itemMod'|'quantity'
export interface CreateBaseProductCard {
    name: string,
    art: string,
    maker: string,
    categor: string,
    img: string,
    subcategor: string,
    price: number,
    itemArt: string,
    itemMod: string,
    quantity: number,
}

export type CharacteristicItem = { name: string, value: string }
export type CharacteristicBlock = { name: string, content: CharacteristicItem[] }

export type ProductCardKeyParams = 'top'|'sale'|'news'|'delivery'|'pickUp'|'underTheOrder'
export type ProductCardParams = Partial<RecordOption<ProductCardKeyParams, boolean>> & { 'description'?: string }

export type ItemBasket = {
    id: number,
    quantity: number,
    price: number,
}