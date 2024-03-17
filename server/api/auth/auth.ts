import { _setCookie } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { createAnonimUser, handleSessionKey } from "@/server/utils/auth";
import { User } from "@prisma/client";
import { _createError } from "@/server/utils/message";


export default defineEventHandler(async (event) => {
    let sessionKey = getCookie(event, 'sessionKey') || getCookie(event, 'anonimSessionKey')
    let user: Pick<User, 'id'| 'role'> | undefined
    
    try {
        user = sessionKey ? handleSessionKey(sessionKey) || await createAnonimUser(event) : await createAnonimUser(event)
    
        try {
            const res =  await $fetch('/api/auth/user',{ params: { ...user } })
            return res
        } catch (error) {
            user = await createAnonimUser(event)
            return  await $fetch('/api/auth/user',{ params: { ...user } })
        }
    } catch (error) {
        console.log(error)
        return error
    }

})

