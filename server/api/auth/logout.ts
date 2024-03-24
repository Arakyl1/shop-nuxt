import prisma from "../../db"
import { defineAuthenticatedEventHandler, getUser, handlerAnonimSessionKey } from "@/server/utils/auth";
import { _getCookie, _deleteCookie } from "@/server/utils/other";


export default defineAuthenticatedEventHandler(async(event, user) => {
    try {
        const cookiesRefrech = _getCookie(event, 'sessionKey')
        if (cookiesRefrech) {
            _deleteCookie(event, 'sessionKey')
            await prisma.refrechToken.delete({ where: { token: cookiesRefrech } })
        }

        const user = await handlerAnonimSessionKey(event)
        if (!(user instanceof Error)) {
            return getUser(user)
        }
        return null
    } catch (error) {
        return error
    }
})