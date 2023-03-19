import prisma from "."
import { Request } from "@/type/intex";

export const prismaCreate = async<T extends Request>(
    key: T['key'], body: object
):Promise<T['data']> => {
    return await prisma[key].create(body)
}

export const prismaFindUnique = async(key: string, body: object) => {
    return await prisma[key].findUnique(body)
}

export const prismafindMany = async(key: string, body: object) => {
    return prisma[key].findMany(body)
}

export const prismaUpdate = async(key: string, body: object) => {
    return prisma[key].update(body)
}

export const prismaDelete = async(key: string, body: object) => {
    return prisma[key].delete(body)
}