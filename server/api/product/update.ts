import prisma from "~~/server/db"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prisma.productCard.update(body)
    } catch (error) {
        return error
    }
})