import { JwtPayload } from "jsonwebtoken"
import { prismaFindUnique } from "~~/server/db/methods"
import { decodeRefrechToken, generateTokens } from "~~/server/utils/jwt"
import { userBaseParams, userAditionalParams } from "@/utils/prismaSelect";

export default defineEventHandler(async(event) => {

    const refrechToken: string | undefined = getCookie(event, 'refrech_token')
    if (!refrechToken) return { message: "Refrech token is invalid one" }
    
    const rToken = await prismaFindUnique('refrechToken', { where: { token: refrechToken }})
    if (!rToken)  return { message: "Refrech token is invalid" }

    const token: string | JwtPayload | null = decodeRefrechToken(refrechToken)
    
    try {
        if (typeof token === 'object' && token) {
            const searchParams = userBaseParams({ id: token.userId}, userAditionalParams({}))
            const user = await prismaFindUnique('user', searchParams)
            
            const { accessToken } = await generateTokens(user)
            return { accessToken }
        } else {
            return { message: "Something went wrong" }
        }
    } catch (error) {
        return { message: "Something went wrong" }
    }
})