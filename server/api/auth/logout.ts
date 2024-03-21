
import { CookieKey } from "~/type/intex"
import prisma from "../../db"
import { handleSessionKey } from "@/server/utils/auth";


export default defineEventHandler(async(event) => {
    try {
        const keyCookie: CookieKey = 'sessionKey'
        const cookiesRefrech = getCookie(event, keyCookie)
        if (cookiesRefrech) {
            deleteCookie(event, keyCookie)
            await prisma.refrechToken.delete({ where: { token: cookiesRefrech } })
        }

        const anonimSessionKey = getCookie(event, 'anonimSessionKey') || ''
        let user = handleSessionKey(anonimSessionKey)
        return await $fetch('/api/auth/user',{ params: { ...user } })
    } catch (error) {
        return error
    }
})