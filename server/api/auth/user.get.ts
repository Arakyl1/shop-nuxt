import { prismaFindUnique } from "@/server/db/methods"
import { decodeAccessToken } from "@/server/utils/jwt"
import { userTransform } from "~~/server/utils/userTransform"
import { searchByid } from "@/server/utils/searchParams";


export default defineEventHandler(async(event) => {
    const token = event.req.headers['authorization']?.split(' ')[1]
    const decoded = decodeAccessToken(token)
    
    if (!decoded) {
        return {statusCode: 401, statusMessage: 'Unauthorized' }
    }

    try {
        const userId = decoded.userId
        const user = await prismaFindUnique('user',searchByid(userId))
        return { user: userTransform(user)}
    } catch (error) {
        return { statusCode: 404, statusMessage: '' }
    }
})