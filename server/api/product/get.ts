import { ProductCard } from "@prisma/client"
import { prismaGetProduct } from "~~/server/db/product"

export default defineEventHandler(async(event: any) => {
    const body = await readBody(event)
    try {
        const data = await prismaGetProduct(body)
        return data
    } catch (error) {
        return Error
    }
})