import { prismaSearchProduct } from "~~/server/db/product"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    try {
        return await prismaSearchProduct(body)
    } catch (error) {
        throw error
    }

})