import { prismaGetProductForCatagor } from "~~/server/db/product"

export default defineEventHandler(async(event)=> {
    const body = await readBody(event)
    try {
        const data = await prismaGetProductForCatagor(body)
        return data
    } catch (error) {
        return error
    }
})