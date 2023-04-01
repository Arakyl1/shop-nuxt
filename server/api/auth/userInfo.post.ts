import { prismaFindUnique } from "~~/server/db/methods"
import { userBaseParams } from "@/utils/prismaSelect";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const searchParams = userBaseParams({ id: body }, {})
        const data = await prismaFindUnique('user', searchParams)
        return data
    } catch (error) {
        return error
    }
})