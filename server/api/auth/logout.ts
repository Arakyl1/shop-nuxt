
import { CookieKey } from "~/type/intex"
import prisma from "../../db"

export default defineEventHandler(async(event) => {
    try {
        const keyCookie: CookieKey = 'refrech_token'
        const cookiesRefrech = getCookie(event, keyCookie)
        if (cookiesRefrech) {
            deleteCookie(event, keyCookie)
            await prisma.refrechToken.delete({ where: { token: cookiesRefrech } })
        }
    } catch (error) {
        return error
    }
    _setCookie(event,'refrech_token', '')
    return { message: "Done"}
})