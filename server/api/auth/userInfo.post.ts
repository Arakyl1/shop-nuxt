import { prismaFindUnique } from "~~/server/db/methods"
import { searchByIdSecondary } from "@/server/utils/searchParams";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const data = await prismaFindUnique('user', searchByIdSecondary(body))
        return data
    } catch (error) {
        return error
    }
})