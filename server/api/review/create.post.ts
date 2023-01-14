import { prismaCreate } from "~~/server/db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    try {
        await prismaCreate('comment', { data: body })
        return true
    } catch (error) {
        return error
    }
})