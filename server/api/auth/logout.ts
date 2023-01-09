import { removeRefrechToken } from "~~/server/db/refrechTokem"
import { sendRefrechToken } from "~~/server/utils/jwt"

export default defineEventHandler(async(event) => {
    try {
        const cookiesRefrech = getCookie(event, 'refrech_token')
        if (cookiesRefrech) {
            removeRefrechToken(cookiesRefrech)
        }
    } catch (error) {
        return error
    }
    sendRefrechToken(event, null)
    return { message: "Done"}
})