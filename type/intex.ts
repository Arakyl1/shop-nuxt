import { Prisma, ProductCard } from "@prisma/client";
import { returnParamsAditional, returnParamsMain } from "~~/server/utils/searchParams";

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

export const selectOption = selectForCard({
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

const baseOption = selectForCard({})
const _baseOption = Prisma.validator<Prisma.ProductCardArgs>()(baseOption)
export type _ProductCardBaseOption = Prisma.ProductCardGetPayload<typeof _baseOption>

const select = Prisma.validator<Prisma.ProductCardArgs>()(selectOption)
export type ProductCardFull = Prisma.ProductCardGetPayload<typeof select>

export type CategorItem = { name: string,  children: (CategorItem |{ name: string })[] } 
export type CategorSelect = { select : CategorItem[]}