import prisma from "."

export const prismaCreate = async(key: string, body: object) => {
    return await prisma[key].create(body)
}