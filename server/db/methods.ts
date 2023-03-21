import prisma from "."
import { Request } from "@/type/intex";

export const prismaCreate = async( key: unknown, body: object) => {
    return await prisma[key].create(body)
}

export const prismaFindUnique = async(key: unknown, body: object) => {
    return await prisma[key].findUnique(body)
}

export const prismafindMany = async(key: unknown, body: object) => {
    return prisma[key].findMany(body)
}

export const prismaUpdate = async(key: unknown, body: object) => {
    return prisma[key].update(body)
}

export const prismaDelete = async(key: unknown, body: object) => {
    return prisma[key].delete(body)
}