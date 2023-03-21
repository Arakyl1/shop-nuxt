import { ProductCard } from "@prisma/client";

export type Request = 
| { key: 'ProductCard', data: ProductCard }


export type ProductCardSearchOption = 'id'|'name'|'art'|'price'|'img'|'sale'
export type ProductCardBaseOption = 'id'|'name'|'art'|'price'|'img'|'news'|'sale'|'quantity'
 
export type RecordOption<T extends PropertyKey, U> =  { [K in T]: U}


export interface UserCommit {
    cardID: number
    ranting?: number
    text?: string
    userId: number
}

export interface CreateUser {
    
}

export type UserLoginData = { username: string, password: string }
export type UserRegisterData = UserLoginData & { email: string, repeartPassword: string }

export type BasketItem = { id: number, price: number, quantity: number }
