import { Prisma } from "@prisma/client";
import prisma from "./index"

type ModelNameCreate = {
    'user': Prisma.UserCreateManyArgs , 
    'refrechToken': Prisma.RefrechTokenCreateArgs , 
    'post': Prisma.PostCreateArgs ,
    'productCard': Prisma.ProductCardCreateArgs ,
    'comment': Prisma.CommentCreateArgs ,
    'characteristic': Prisma.CharacteristicCreateArgs ,
    'characteristicItem': Prisma.CharacteristicItemCreateArgs,
    'image': Prisma.ImageCreateArgs
}

type ModelNameFindUnique = {
    'user': Prisma.UserFindUniqueArgsBase, 
    'refrechToken': Prisma.RefrechTokenFindUniqueArgsBase, 
    'post': Prisma.PostFindUniqueArgsBase, 
    'productCard': Prisma.ProductCardFindUniqueArgsBase, 
    'comment': Prisma.CommentFindUniqueArgsBase, 
    'characteristic': Prisma.CharacteristicFindUniqueArgsBase, 
    'characteristicItem': Prisma.CharacteristicItemFindUniqueArgsBase,
    'image': Prisma.ImageFindUniqueArgsBase
}

type ModelNameFindMany = {
    'user': Prisma.UserFindManyArgs , 
    'refrechToken': Prisma.RefrechTokenFindManyArgs , 
    'post': Prisma.PostFindManyArgs, 
    'productCard': Prisma.ProductCardFindManyArgs, 
    'comment': Prisma.CommentFindManyArgs, 
    'characteristic': Prisma.CharacteristicFindManyArgs, 
    'characteristicItem': Prisma.CharacteristicItemFindManyArgs,
    'image': Prisma.ImageFindManyArgs
}

type ModelNameUpdate = {
    'user': Prisma.UserUpdateArgs,
    'refrechToken': Prisma.RefrechTokenUpdateArgs,
    'post': Prisma.PostUpdateArgs,
    'productCard': Prisma.ProductCardUpdateArgs,
    'comment': Prisma.CommentUpdateArgs,
    'characteristic': Prisma.CharacteristicUpdateArgs,
    'characteristicItem': Prisma.CharacteristicItemUpdateArgs,
    'image': Prisma.ImageUpdateArgs
}

type ModelNameDelete = {
    'user': Prisma.UserDeleteArgs ,
    'refrechToken': Prisma.RefrechTokenDeleteArgs ,
    'post': Prisma.PostDeleteArgs,
    'productCard': Prisma.ProductCardDeleteArgs,
    'comment': Prisma.CommentDeleteArgs,
    'characteristic': Prisma.CharacteristicDeleteArgs,
    'characteristicItem': Prisma.CharacteristicItemDeleteArgs,
    'image': Prisma.ImageDeleteArgs
}


//type keyPrismaTable = 'characteristic' | 'characteristicItem' | 'comment' | 'post' | 'productCard' | 'refrechToken' | 'user'


export const prismaCreate = async<T extends keyof ModelNameCreate, U extends ModelNameCreate[T]>(
    key: T, body: Prisma.SelectSubset<U, ModelNameCreate[T]>) => {
    return await prisma[key].create(body)
}

export const prismaFindUnique = async<T extends keyof ModelNameFindUnique>(
    key: T, body: ModelNameFindUnique[T]) => {
    return await prisma[key].findUnique(body)
}

export const prismafindMany = async<T extends keyof ModelNameFindMany>(
    key: T, body: ModelNameFindMany[T]) => {
    return await prisma[key].findMany(body)
}

export const prismaUpdate = async<T extends keyof ModelNameUpdate>(
    key: T, body: ModelNameUpdate[T]) => {
    return await prisma[key].update(body)
}

export const prismaDelete = async<T extends keyof ModelNameDelete>(
    key: T, body: ModelNameDelete[T]) => {
    return await prisma[key].delete(body)
}

// prisma.user.findUnique({select: { ff: true }})