import { JwtPayload } from "jsonwebtoken"
import { getRefrechTokenByTpken } from "~~/server/db/refrechTokem"
import { getUserById } from "~~/server/db/user"
import { decodeRefrechToken, generateTokens } from "~~/server/utils/jwt"

export default defineEventHandler(async(event) => {
    const refrechToken: string | undefined = getCookie(event, 'refrech_token')
    if (!refrechToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "Refrech token is invalid one"
        })
    }

    const rToken = await getRefrechTokenByTpken(refrechToken)
    
    
    if (!rToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "Refrech token is invalid"
        })
    }
    
    const token: string | JwtPayload | null = decodeRefrechToken(refrechToken)
    
    try {
        const user = await getUserById(token.userId)
        const { accessToken } = await generateTokens(user)
        
        return (accessToken)
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: "Something went wrong"
        })
    }
    
    return token
})