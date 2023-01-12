// import { ProductCard } from "@prisma/client"
import { prismaGetProduct } from "~~/server/db/product"

export default defineEventHandler(async(event: any) => {
    const body = await readBody(event)
    try {
        return await prismaGetProduct(body)
    } catch (error) {
        return Error
    }
})