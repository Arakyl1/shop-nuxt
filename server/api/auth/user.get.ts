import { getUserById } from "@/server/db/user"
import createAndSendError from "@/server/utils/createAndSendError"
import { decodeAccessToken } from "@/server/utils/jwt"
import { userTransform } from "~~/server/utils/userTransform"


export default defineEventHandler(async(event) => {
    const token = event.req.headers['authorization']?.split(' ')[1]
    const decoded = decodeAccessToken(token)
    
    if (!decoded) {
        createAndSendError(event, 401, 'Unauthorized')
    }

    try {
        const userId = decoded.userId
        const user = await getUserById(userId)
        return userTransform(user)
    } catch (error) {
        return Error
    }
})