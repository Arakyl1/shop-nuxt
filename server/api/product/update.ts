import { prismaUpdateProductRanting } from "~~/server/db/product"


export default defineEventHandler(async(event) => {
    const data = await readBody(event)

    try {
        const res = await prismaUpdateProductRanting({ paramSearch: {id: data.paramSearch}, newContent: { ranting: data.data }})
        return true
    } catch (error) {
        return error
    }
})