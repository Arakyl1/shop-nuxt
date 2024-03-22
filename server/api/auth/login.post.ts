import { H3Event } from "h3"
import bcrypt from 'bcryptjs';
import prisma from "../../db";
import { Prisma, User } from "@prisma/client";
import { GET_CONTENT_KEY } from "../../utils/other";
import { setNewSessionKey, getUser } from "@/server/utils/auth";

export default defineEventHandler(async (event: H3Event) => {

    try {
        const body = await readBody(event)
        const { username, password } = body
        
        const searchParams: Prisma.UserFindUniqueArgs = {
            where: { username: username },
            select: {
                id: true,
                role: true,
                password: true,
            }
        }

        let user: User | undefined
        try {
            user = await prisma.user.findUnique(searchParams)
            if (!user) throw _createError(GET_CONTENT_KEY('AUTH_LOGIN_USER_IS_NOT_REGISTERED'))
            
        } catch (error) {
            throw _createError('error login data')
        }

        const doesThePasswordMatch = await bcrypt.compare(password, user.password!)
        if (!doesThePasswordMatch) throw _createError(GET_CONTENT_KEY('AUTH_LOGIN_INVALID_PASSWORD'))

        // Generate new sessionKey
        await setNewSessionKey(event,user)
        return await getUser(user)
        
    } catch (error) {
        return error
    }   
})