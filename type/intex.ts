import { Attribute, Prisma, ProductCard, User } from "@prisma/client";

import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'


export type NAMEAPP = 'MARKET_5kv'
export type PP = { title: string, name: string, value: boolean | string | number }
export type GG = { id: number, art: string, name: string }
export type unknownObj = { [prop: string]: any }

export interface LisLink extends MarkdownParsedContent {
    name: string,
    href: string
}
export interface ResponseAuthUser {
    user?: Omit<User,'password'>,
    access_token?: string,
    message?: string,
    messageKey?: string
}

export type Enumerable<T> = T | Array<T>;
export type checkArray<T> = T extends any[] ? T[number] : T
export type CookieKey = 'refrech_token'
export type RecordOption<T extends PropertyKey, U> = { [K in T]: U }
export type Cached<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer Y> ? Y : ReturnType<T>
export type KeysMatchingWrite<T extends object, V> = {
    [K in keyof T]-?: [V] extends [T[K]] ? K : never
}[keyof T]

type DeepKeys<T> = T extends string ? never : {
    [K in keyof T & string]: T[K] extends boolean ? true : DeepKeys<T[K]>;
}[keyof T & string];


export interface UserCreateCommit {
    cardId: number
    ranting?: number
    text?: string
    userId: number
}

export type ReplaceDate<T extends object> = {
    [K in keyof T]:
    T[K] extends Date ? string :
    T[K] extends null | string | number | boolean | undefined ? T[K] :
    T[K] extends object ?
    T[K] extends (infer U)[] ? U extends object ? Array<ReplaceDate<U>> : ReplaceDate<T[K]> : unknown : unknown
}
export type storageCategorData = (Attribute & { children: (Attribute & { children: Attribute[] })[] })[]

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

export type UserLoginData = Pick<Prisma.UserCreateInput, 'username' | 'password'>
export type UserRegisterData = Pick<Prisma.UserCreateInput, 'username' | 'password' | 'email'> & { repeartPassword: string }
export type ResponseDownloadImage = { url: string; secretUrl: string; }



export type ProductCardBase = Prisma.ProductCardGetPayload<{ include: { image: { where: { main: true } }, attribute: true } }>
export type ProductCardFull = Prisma.ProductCardGetPayload<{
    include: {
        image: true,
        attribute: true,
        characteristic: { include: { content: true } },
        reviews: {
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        profileImage: true,
                        createAt: true
                    }
                }
            }
        }
    }
}>
export type BasketItem = { quantity: number, data: ProductCardBase }



export type CategorItem = { name: string, children: (CategorItem | { name: string })[] }
export type CategorSelect = { select: CategorItem[] }





export type ImageInfo = { link: string }
export type CharacteristicItem = { name: string, value: string }
export type CharacteristicBlock = { title: string, content: CharacteristicItem[] }

// export type ProductCardKeyParams = 'top' | 'sale' | 'news' | 'delivery' | 'pickUp' | 'underTheOrder'
// export type ProductCardParams = Partial<RecordOption<ProductCardKeyParams, boolean>> & { 'description'?: string }

export type ItemBasket = {
    id: number,
    quantity: number,
    price: number,
}


export const UserCreateSelect = {
    id: true,
    email: true,
    name: true,
    username: true,
    profileImage: true,
}

const _UserCreateSelect = Prisma.validator<Prisma.UserArgs>()({ select: UserCreateSelect })
export type UserCreateBase = Prisma.UserGetPayload<typeof _UserCreateSelect>



export interface CategorDataItem {
    id: number;
    value: string;
    type: string;
    name: string;
    children: {
        id: number;
        value: string;
        type: string;
        name: string;
        children: {
            id: number;
            value: string;
            type: string;
            name: string;
        }[];
    }[];
}

export interface LoginJSONData {
    char: {
        title: string
        data: { name: string, value: string }[]
    }[],
    image: {
        link: string
    }[],
    desription: string,
    categor: string,
    maker: string,
    price: number,
    itemArt: string,
    itemMod: string,
    quantity: number,
    name: string,
    art: string,
}

export interface Content {
    AUTH_TEXT_TITLE_REGISTER: string,
    AUTH_TEXT_BUTTOM_REGISTER: string,
    AUTH_TEXT_SPAN_REGISTER: string,
    AUTH_TEXT_PLACEHOLDER_USERNAME: string,
    AUTH_TEXT_PLACEHOLDER_EMAIL: string,
    AUTH_TEXT_PLACEHOLDER_PASSWORD: string,
    AUTH_TEXT_PLACEHOLDER_PASSWORD_D: string,
    AUTH_TEXT_TITLE_LOGIN: string,
    AUTH_TEXT_BUTTOM_LOGIN: string,
    AUTH_TEXT_SPAN_LOGIN: string,
    AUTH_UNAUTHORIZED: string,
    DEFAUT_USER_PHOTO_LINK: string,
    AUTH_REGISTER_SUCH_USER_ALREADY_EXISTS: string,
    AUTH_LOGINT_USER_IS_NOT_REGISTERED: string,
    AUTH_LOGINT_INVALID_PASSWORD: string,
    AUTH_ERROR: string,
    REFRECH_TOKEN_ABSENT_IN_COOKEI: string,
    REFRECH_TOKEN_ABSENT_IN_DB: string,
    REFRECH_TOKEN_INVALID: string,
    REFRECH_TOKEN_ERROR: string,
    CHATROOM_TEXT_TIME_YESTADAY: string,
    ALERT_BASKET_ADD_ITEM: string,
    ALERT_BASKET_PRODUCT_IS_ALREADY_THERE: string,
    ALERT_AUTH_LOGIN_INVALID_DATA: string,
    ALERT_AUTH_REGISTER_SUCCESS: string,
    ALERT_AUTH_REGISTER_PASSWORD_DONT_MATCH: string,
    ALERT_COMMENT_CREATE_INVALID_DATA: string,
    ALERT_COMMENT_CREATE_SUCCESS: string,
    ALERT_PRODUCT_CREATE_INVALID_DATA: string,
    ALERT_PRODUCT_CREATE_DOOWLOAD_PHOTO: string,
    ALERT_PRODUCT_CREATE_SELECT_MAIN_PHOTO: string,
    ALERT_PRODUCT_CREATE_SUCCESS: string,
    ALERT_PRODUCT_CREATE_ERROR: string,
    ALERT_COPE_LINK_INFO_TEXT: string,
    TEXT_AUTH_REGISTER_PASSWORD_INFO: string,
    TEXT_BASKET_EMPRY: string,
    TEXT_BASKET_ADD_ITEM: string,
    TEXT_FILTER_BUTTON_RESET: string;

}
export type CONTENT_KEY = keyof Content


type InputProp = { name: string, min: number, max: number, placeholder: string, step: number }

export type HH =
Enumerable<{ type: 'checkbox', title: string, data: (string | number | undefined)[], length?: number, name: string }> |
Enumerable<{ type: 'number-range', title: string, from: InputProp, to: InputProp }> |
Enumerable<{ type: 'radio', title: string, name: string, value: string | number, id?: number | string }> |
Enumerable<{ type: 'select', title: string, data: { title: string, value: string | number, name: string }[] }> |
Enumerable<{ type: 'star', title: string, name: string, value: string | number } > 
 
export type FilterData = Array<HH>

