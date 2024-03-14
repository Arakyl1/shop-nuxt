import { Attribute, Prisma, Role, User } from "@prisma/client";
import type { MarkdownParsedContent } from '@nuxt/content/dist/runtime/types'
import { KEY_ICON } from "@/content/icons/1";
import { SERVER_RESPONSE_CONTENT } from "@/common/C";
import { DefaultArgs } from "@prisma/client/runtime/library";
// import { UserBuyer } from "server/api/auth/user.get";



export type NAMEAPP = 'MARKET_5kv'
export type CookieKey = 'refrech_token' | 'anonimSessionKey' | 'sessionKey'
export type KeyAsyncData = 'getFullInfoProduct'
export type PP = { title: string, name: string, value: boolean | string | number }
export type GG = { id: number, art: string, name: string }


export type unknownObj = { [prop: string]: any }
export type NumericRange<
    START extends number,
    END extends number,
    ARR extends unknown[] = [],
    ACC extends number = never
> = ARR['length'] extends END ?
    ACC | START | END :
    NumericRange<START, END, [...ARR, 1], ARR[START] extends undefined ? ACC : ACC | ARR['length']>

export type Enumerable<T> = T | Array<T>;
export type checkArray<T> = T extends any[] ? T[number] : T;
export type anyFunction = (...arg: any[]) => any;

export type RecordOption<T extends PropertyKey, U> = { [K in T]: U }
export type Cached<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer Y> ? Y : ReturnType<T>
export type KeysMatchingWrite<T extends { [K: PropertyKey]: any }, V> = {
    [K in keyof T]-?: [V] extends [T[K]] ? K : never
}[keyof T]

type DeepKeys<T> = T extends string ? never : {
    [K in keyof T & string]: T[K] extends boolean ? true : DeepKeys<T[K]>;
}[keyof T & string];

export type _HTMLInputElement<T extends string> = HTMLInputElement & {
    dataset: DOMStringMap & RecordOption<T, string>
}

export type ReplaceDate<T extends object> = {
    [K in keyof T]:
    T[K] extends Date ? string :
    T[K] extends null | string | number | boolean | undefined ? T[K] :
    T[K] extends object ?
    T[K] extends (infer U)[] ? U extends object ? Array<ReplaceDate<U>> : ReplaceDate<T[K]> : unknown : unknown
}

export type AlertItem = { text: string | number, state: 'info' | 'error' | 'success' | 'base'| 'loader', active: boolean, createAt: number }
export type AlertItemStateKey = Pick<AlertItem, 'state'>['state']
export type AlertItemCreate<T = string> = Pick<AlertItem, 'state'> & { key: T, skip?: boolean }

// COMPOSABLE TYP

export interface useShowProps {
    autoClose?: boolean,
    triggers?: Array<'hover'|'click'|'focus'|'contextmenu'>
}


// SERVER PARSER URL FOR GET METHOD  
export type MethodError = { message: string, type: string, [x: string]: any }
export type WhereIntFilterKey = (keyof Prisma.IntFilter)
export const WhereIntFilterKey: WhereIntFilterKey[] = ['equals', 'not', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte',]
export type WhereSrtingFilterKey = (keyof Prisma.StringFilter)
export const WhereSrtingFilterKey: WhereSrtingFilterKey[] = ['contains', 'endsWith', 'equals', 'gt', 'gte', 'in', 'lt', 'lte', 'mode', 'not', 'notIn', 'startsWith']
export type WhereDateFilterKey = keyof Prisma.DateTimeFilter
export const WhereDateFilterKey: WhereDateFilterKey[] = ['equals', 'gt', 'gte', 'in', 'lt', 'lte', 'notIn']
export type keyStringMode = Prisma.QueryMode
export const keyStringMode: keyStringMode[] = ['default', 'insensitive']
export type SortOrder = Prisma.SortOrder
export const sortOrder: SortOrder[] = ['asc', 'desc']
export type keyOtherOption = 's' | 't'
export const keyOtherOption: keyOtherOption[] = ['s', 't']


export type getModelName<T extends Prisma.ModelName> = T

export interface TypeMapCreate {
    'User': Prisma.UserCreateArgs,
    'RefrechToken': Prisma.RefrechTokenCreateArgs,
    'Attribute': Prisma.AttributeCreateArgs,
    'Image': Prisma.ImageCreateArgs,
    'Comment': Prisma.CommentCreateArgs,
    'Characteristic': Prisma.CharacteristicCreateArgs,
    'ProductCard': Prisma.ProductCardCreateArgs,
    'CharacteristicItem': Prisma.CharacteristicItemCreateArgs,
    'Basket': Prisma.BasketCreateArgs,
    'BasketItem': Prisma.BasketItemCreateArgs,
    'Favorites': Prisma.UserFavoriteProductCreateArgs,
    'FavoriteItem': Prisma.UserFavoriteProductItemCreateArgs,
}

export interface TypeMapCreateMany {
    'User': Prisma.UserCreateManyArgs,
    'RefrechToken': Prisma.RefrechTokenCreateManyArgs,
    'Attribute': Prisma.AttributeCreateManyArgs,
    'Image': Prisma.ImageCreateManyArgs,
    'Comment': Prisma.CommentCreateManyArgs,
    'Characteristic': Prisma.CharacteristicCreateManyArgs,
    'ProductCard': Prisma.ProductCardCreateManyArgs,
    'CharacteristicItem': Prisma.CharacteristicItemCreateManyArgs,
    'Basket': Prisma.BasketCreateManyArgs,
    'BasketItem': Prisma.BasketItemCreateManyArgs,
}

export interface TypeMapFindMany {
    'User': Prisma.UserFindManyArgs,
    'RefrechToken': Prisma.RefrechTokenFindManyArgs,
    'Attribute': Prisma.AttributeFindManyArgs,
    'Image': Prisma.ImageFindManyArgs,
    'Comment': Prisma.CommentFindManyArgs,
    'Characteristic': Prisma.CharacteristicFindManyArgs,
    'ProductCard': Prisma.ProductCardFindManyArgs,
    'CharacteristicItem': Prisma.CharacteristicItemFindManyArgs,
    'Basket': Prisma.BasketFindManyArgs,
    'BasketItem': Prisma.BasketItemFindManyArgs,
}

export interface TypeMapFindUnique {
    'User': Prisma.UserFindUniqueArgs,
    'RefrechToken': Prisma.RefrechTokenFindUniqueArgs,
    'Attribute': Prisma.AttributeFindUniqueArgs,
    'Image': Prisma.ImageFindUniqueArgs,
    'Comment': Prisma.CommentFindUniqueArgs,
    'Characteristic': Prisma.CharacteristicFindUniqueArgs,
    'ProductCard': Prisma.ProductCardFindUniqueArgs,
    'CharacteristicItem': Prisma.CharacteristicItemFindUniqueArgs,
    'Basket': Prisma.BasketFindUniqueArgs,
    'BasketItem': Prisma.BasketItemFindUniqueArgs,
}

export interface TypeMapUpdate {
    'User': Prisma.UserUpdateArgs,
    'RefrechToken': Prisma.RefrechTokenUpdateArgs,
    'Attribute': Prisma.AttributeUpdateArgs,
    'Image': Prisma.ImageUpdateArgs,
    'Comment': Prisma.CommentUpdateArgs,
    'Characteristic': Prisma.CharacteristicUpdateArgs,
    'ProductCard': Prisma.ProductCardUpdateArgs,
    'CharacteristicItem': Prisma.CharacteristicItemUpdateArgs,
    'Basket': Prisma.BasketUpdateArgs,
    'BasketItem': Prisma.BasketItemUpdateArgs,
}

export interface TypeMapUpdateMany {
    'User': Prisma.UserUpdateManyArgs,
    'RefrechToken': Prisma.RefrechTokenUpdateManyArgs,
    'Attribute': Prisma.AttributeUpdateManyArgs,
    'Image': Prisma.ImageUpdateManyArgs,
    'Comment': Prisma.CommentUpdateManyArgs,
    'Characteristic': Prisma.CharacteristicUpdateManyArgs,
    'ProductCard': Prisma.ProductCardUpdateManyArgs,
    'CharacteristicItem': Prisma.CharacteristicItemUpdateManyArgs,
    'Basket': Prisma.BasketUpdateManyArgs,
    'BasketItem': Prisma.BasketItemUpdateManyArgs,
}

export interface TypeMapDelete {
    'User': Prisma.UserDeleteArgs,
    'RefrechToken': Prisma.RefrechTokenDeleteArgs,
    'Attribute': Prisma.AttributeDeleteArgs,
    'Image': Prisma.ImageDeleteArgs,
    'Comment': Prisma.CommentDeleteArgs,
    'Characteristic': Prisma.CharacteristicDeleteArgs,
    'ProductCard': Prisma.ProductCardDeleteArgs,
    'CharacteristicItem': Prisma.CharacteristicItemDeleteArgs,
    'Basket': Prisma.BasketDeleteArgs,
    'BasketItem': Prisma.BasketItemDeleteArgs,
}

export interface TypeMapDeleteMany {
    'User': Prisma.UserDeleteManyArgs,
    'RefrechToken': Prisma.RefrechTokenDeleteManyArgs,
    'Attribute': Prisma.AttributeDeleteManyArgs,
    'Image': Prisma.ImageDeleteManyArgs,
    'Comment': Prisma.CommentDeleteManyArgs,
    'Characteristic': Prisma.CharacteristicDeleteManyArgs,
    'ProductCard': Prisma.ProductCardDeleteManyArgs,
    'CharacteristicItem': Prisma.CharacteristicItemDeleteManyArgs,
    'Basket': Prisma.BasketDeleteManyArgs,
    'BasketItem': Prisma.BasketItemDeleteManyArgs,
}



type GGGG<K extends Prisma.ModelName> = TypeMapCreate[K]['data']
export interface INIT_MODEL_PROPERTY<T extends Prisma.ModelName> {
    key: T,
    keyWork: Uncapitalize<T>,
    propElem: keyof GGGG<T>,
    propInt: KeysMatchingWrite<GGGG<T>, number>,
    propStr: KeysMatchingWrite<GGGG<T>, string>,
    propDateTime: KeysMatchingWrite<GGGG<T>, Date>,
    propRelation: Exclude<keyof GGGG<T>, KeysMatchingWrite<GGGG<T>, number> | KeysMatchingWrite<GGGG<T>, string> | KeysMatchingWrite<GGGG<T>, Date>>
}


// Filter Interface
type InputProp = { name: string, min: number, max: number, placeholder: string, step: number }

export type HH =
    Enumerable<{ type: 'checkbox', title: string, data: (string | number | undefined)[], length?: number, name: string }> |
    Enumerable<{ type: 'number-range', title: string, from: InputProp, to: InputProp }> |
    Enumerable<{ type: 'radio', title: string, name: string, value: string | number, id?: number | string }> |
    Enumerable<{ type: 'select', title: string, data: { title: string, value?: string | number, name: string, id?: string | number }[] }> |
    Enumerable<{ type: 'star', title: string, name: string, value: string | number }> |
    { type: 'time', ms: number, state: string }

export type FilterData = Array<HH>




// INTERFACE
export interface LisLink extends MarkdownParsedContent {
    name: string,
    href: string
}


export type SVG_ELEMENTS = 'path' | 'line' | 'circle'
export type ICON_DATA<T extends PropertyKey> = {
    [K in T]: {
        viewBox: `${number} ${number} ${number} ${number}`,
        type: 'outline' | 'monocolor',
        data: { [K in SVG_ELEMENTS]?: Array<{ [K: string]: any }> }[],
        other?: { [K: string]: any }
    }
}
export type test = ICON_DATA<KEY_ICON>




export const UserCreateSelect = {
    id: true,
    email: true,
    name: true,
    username: true,
    profileImage: true,
}
const _UserCreateSelect = Prisma.validator<Prisma.UserArgs>()({ select: UserCreateSelect })
export type UserCreateBase = Prisma.UserGetPayload<typeof _UserCreateSelect>

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

export interface BasketItem {
    id: number,
    createAt: string,
    updateAt: string,
    count: number,
    cardId: number,
    basketId: number,
    card: Array<ProductCardBase>
}

export interface Basket {
    id: number,
    createAt: string,
    updateAt: string,
    userId: null | number,
    anonimId: null | number,
    item: Array<BasketItem>
}

export type StoreUser = Required<Prisma.UserSelect<DefaultArgs>>
// export type StoreUser<T extends Role | null> = T extends 'ANONIM' ? UserAnonim : T extends 'USER' ? UserBuyer : null

export type ItemBasket = {
    id: number,
    quantity: number,
    price: number,
}

export type storageCategorData = (Attribute & { children: (Attribute & { children: Attribute[] })[] })[]
export interface CategorDataItem {
    id: number;
    value: string;
    type: string;
    name: string;
    children?: CategorDataItem[]
}
export type CategorItem = { name: string, children: (CategorItem | { name: string })[] }
export type CategorSelect = { select: CategorItem[] }


export type ImageInfo = { link: string }
export type CharacteristicItem = { name: string, value: string }
export type CharacteristicBlock = { title: string, content: CharacteristicItem[] }
export type CharacteristicSection = { title: string, children: { name:string, value: string }[] }

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
export interface Commit {
    text: string,
    ranting: number,
    user: {
        username: string,
        profileImage: string
    }
}
export interface UserCreateCommit {
    cardId: number
    ranting?: number
    text?: string
    userId: number
}

type UserLocationDateKey = 'ip' | 'city' | 'region' | 'country' | 'loc' | 'org' | 'postal' | 'timezone'
export interface UserLocationDate extends Record<UserLocationDateKey, string> { }



// SERVER_RESPONSE_CONTENT_KEY
export type SERVER_RESPONSE_CONTENT_KEY = keyof typeof SERVER_RESPONSE_CONTENT







            