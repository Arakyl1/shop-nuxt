import { prismaCreateReviews } from "~~/server/db/reviews";

export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    try {
        await prismaCreateReviews(body)
        return true
    } catch (error) {
        return error
    }
})