import { prismaCreate } from "~~/server/db/methods";
import { H3Event } from "h3"

export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event);
    try {
        await prismaCreate('comment', { data: body })
        return true
    } catch (error) {
        return error
    }
})