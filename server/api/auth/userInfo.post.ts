import { getInfoUserById } from "~~/server/db/user"

export default defineEventHandler(async(event) => {
    // const body = await readBody(event)
    // try {
    //     const data = await getInfoUserById(body)
    //     return data
    // } catch (error) {
    //     return error
    // }
    return true
})