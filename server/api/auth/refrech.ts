import { JwtPayload } from "jsonwebtoken"
import { getRefrechTokenByTpken } from "~~/server/db/refrechTokem"
import { getUser } from "~~/server/db/user"
import { decodeRefrechToken, generateTokens } from "~~/server/utils/jwt"
import { searchByid } from "@/server/utils/searchParams";

export default defineEventHandler(async(event) => {
    const refrechToken: string | undefined = getCookie(event, 'refrech_token')
    if (!refrechToken) {
        return {
            statusCode: 401,
            statusMessage: "Refrech token is invalid one"
        }
        // throw createError()
    }

    const rToken = await getRefrechTokenByTpken(refrechToken)
    
    
    if (!rToken) {
        return {
            statusCode: 401,
            statusMessage: "Refrech token is invalid" 
        }
        // throw createError({
        //     statusCode: 401,
        //     statusMessage: "Refrech token is invalid"
        // })
    }
    
    const token: string | JwtPayload | null = decodeRefrechToken(refrechToken)
    
    try {
        const user = await getUser(searchByid(token ? token.userId : 0))
        const { accessToken } = await generateTokens(user)
        
        return { accessToken }
    } catch (error) {
        return {
            statusCode: 401,
            statusMessage: "Something went wrong"
        }
        // throw createError({
        //     statusCode: 401,
        //     statusMessage: "Something went wrong"
        // })
    }
    
    return { token }
})