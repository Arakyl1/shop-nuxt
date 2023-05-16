import { H3Event } from "h3"
import { prismaFindUnique, prismafindMany } from "~~/server/db/methods"

export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event)
    const query = getQuery(event)
    try {
        if (Boolean(query.many)) {    
            return await prismafindMany('productCard',body)
        } else {
            return await prismaFindUnique('productCard', body)
        }
    } catch (error) {
        return new Error('Error')
    }
})