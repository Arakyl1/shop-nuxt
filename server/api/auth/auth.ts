import { decodeToken } from "@/server/utils/jwt";
import { _setCookie } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";


export default defineEventHandler(async (event) => {
    let sessionKey = getCookie(event, 'sessionKey')
    try {
        if (sessionKey) {
            const decoded = decodeToken(sessionKey,'refrech')
            if (decoded === null) new Error(GET_CONTENT_KEY('AUTH_UNAUTHORIZED')) 
            if (!isObject(decoded)) authError()
            const res = await $fetch('/api/auth/user',{ params: { id: decoded.id } })
        
            return res.user
        }
        else {
            
            const res = await $fetch('/api/auth/anonim')
            _setCookie(event, 'sessionKey',res.token)
            return res.user
        }
    } catch (error) {
        return error
    }

})

