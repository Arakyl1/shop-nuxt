import { getUser } from "~~/server/db/user"
import { searchByIdSecondary } from "@/server/utils/searchParams";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const data = await getUser(searchByIdSecondary(body))
        return data
    } catch (error) {
        return error
    }
})