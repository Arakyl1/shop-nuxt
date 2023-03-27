import { Prisma } from "@prisma/client";
import prisma from "."

export type ModelName = 
    | { key: 'user', type: Prisma.UserCreateArgs } 
    | { key: 'refrechToken', type: Prisma.RefrechTokenCreateArgs} 
    | { key: 'post', type: Prisma.PostCreateArgs }
    | { key: 'productCard', type: Prisma.ProductCardCreateArgs }
    | { key: 'comment', type: Prisma.CommentCreateArgs }
    | { key: 'characteristic', type: Prisma.CharacteristicCreateArgs }
    | { key: 'characteristicItem', type: Prisma.CharacteristicItemCreateArgs }

type keyPrismaTable = 'characteristic' | 'characteristicItem' | 'comment' | 'post' | 'productCard' | 'refrechToken' | 'user'

export const prismaCreate = async<T extends ModelName>( key: T['key'], body: T['type']) => {
    return await prisma[key].create(body)
}

export const prismaFindUnique = async(key: unknown, body: object) => {
    return await prisma[key as keyPrismaTable].findUnique(body)
}

export const prismafindMany = async(key: unknown, body: object) => {
    return prisma[key as keyPrismaTable].findMany(body)
}

export const prismaUpdate = async(key: unknown, body: object) => {
    return prisma[key as keyPrismaTable].update(body)
}

export const prismaDelete = async(key: unknown, body: object) => {
    return prisma[key as keyPrismaTable].delete(body)
}