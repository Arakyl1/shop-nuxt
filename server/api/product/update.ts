import { prismaUpdate } from "~~/server/db/methods"


export default defineEventHandler(async(event) => {
    const data = await readBody(event)

    try {
        return await prismaUpdate('productCard', data)
    } catch (error) {
        return error
    }
})