import { _setCookie } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";
import { CookieKey } from '@/type/intex';


export default defineEventHandler(async(event) => {

    const body = await readBody(event)
    const keyCookie = (k: CookieKey) => k
    const userRefrechToken = getCookie(event, keyCookie('refrech_token'))
    const sessionId = getCookie(event, keyCookie('anonim_session_id'))

    try {
        if (userRefrechToken) {
            // return {
            //     access_token: accessToken,
            //     user: userTransform(user)
            // }
        } else {
            return await authUserAnonim(event, sessionId)
        }
    } catch (error) {
        return { data: null, message: GET_CONTENT_KEY('AUTH_ERROR') }
    }
     
})

