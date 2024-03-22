
import { CookieKey } from "~/type/intex"
import prisma from "../../db"
import { defineAuthenticatedEventHandler, handleSessionKey, getUser } from "@/server/utils/auth";


export default defineAuthenticatedEventHandler(async(event, user) => {
    try {
        const keyCookie: CookieKey = 'sessionKey'
        const cookiesRefrech = getCookie(event, keyCookie)
        if (cookiesRefrech) {
            deleteCookie(event, keyCookie)
            await prisma.refrechToken.delete({ where: { token: cookiesRefrech } })
        }

        const anonimSessionKey = getCookie(event, 'anonimSessionKey') || ''
        let user = handleSessionKey(anonimSessionKey)
        return await getUser(user)
    } catch (error) {
        return error
    }
})