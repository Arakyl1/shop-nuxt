import { JwtPayload } from "jsonwebtoken"
import { prismaFindUnique } from "~~/server/db/methods"
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
    
    const rToken = await prismaFindUnique('refrechToken', { where: { token: refrechToken }})
    
    if (!rToken) {
        return {
            statusCode: 401,
            statusMessage: "Refrech token is invalid" 
        }
    }

    const token: string | JwtPayload | null = decodeRefrechToken(refrechToken)
    
    try {
    
        const user = await prismaFindUnique('user', searchByid(token.userId))
        
        const { accessToken } = await generateTokens(user)
        
        return { accessToken }
    } catch (error) {
        return {
            statusCode: 401,
            statusMessage: "Something went wrong"
        }
    }
})