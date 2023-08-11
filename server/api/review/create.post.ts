import { H3Event } from "h3"
import prisma from "../../db";

export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event);
    try {
        const res = await prisma.comment.create({ data: body })
        return true
    } catch (error) {
        return error
    }
})