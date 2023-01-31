import { prismaUpdate } from "~~/server/db/methods"


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismaUpdate('productCard', body)
    } catch (error) {
        return error
    }
})