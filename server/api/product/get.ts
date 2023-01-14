// import { ProductCard } from "@prisma/client"
import { prismaFindUnique } from "~~/server/db/methods"

export default defineEventHandler(async(event: any) => {
    const body = await readBody(event)
    try {
        return await prismaFindUnique('productCard', body)
    } catch (error) {
        return Error
    }
})