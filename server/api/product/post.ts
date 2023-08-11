import { Prisma } from "@prisma/client"
import prisma from "~~/server/db"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    const ff: Prisma.ProductCardFindManyArgs = { include: { 'characteristic': { 'include': { 'content': true } }}}
    try {
        return await prisma.productCard.findMany(body)
    } catch (error) {
        return error
    }
})