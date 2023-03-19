import { ProductCard } from "@prisma/client";

export type Request = 
| { key: 'ProductCard', data: ProductCard }

export interface SelectProductCard {
    select: {
        id: boolean,
        name: boolean,
        art: boolean,
        price: boolean,
        img: boolean,
        news: boolean,
        sale: boolean,
        quantity: boolean,
    }
}

export interface UserCommit {
    cardID: number
    ranting?: number
    text?: string
    userId: number
}

export interface User {
    
}

export type UserLoginData = { username: string, password: string }
export type UserRegisterData = UserLoginData & { email: string, repeartPassword: string }
