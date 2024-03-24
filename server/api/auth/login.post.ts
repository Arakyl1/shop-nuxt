import { H3Event } from "h3"
import bcrypt from 'bcryptjs';
import prisma from "../../db";
import { Prisma, User } from "@prisma/client";
import { setNewSessionKey, getUser } from "@/server/utils/auth";
import { getFormDataInEvent, checkValidFormData } from "@/server/utils/formDataHelper";

export default defineEventHandler(async (event: H3Event) => {
    try {

        const modelKey: Array<keyof User> = ['username','password']
        const formData = await getFormDataInEvent(event, modelKey)

        checkValidFormData(formData, modelKey)
    
        
        const searchParams: Prisma.UserFindUniqueArgs = {
            where: { username: formData.username },
            select: {
                id: true,
                role: true,
                password: true,
            }
        }

        let user: User | undefined
        
        user = await prisma.user.findUnique(searchParams)
        if (!user) throw _createError(GET_SERVER_RESPONSE_KEY('AUTH_USER_WITH_THAT_NAME_IS_NOT_REGISTERED'))
            

        const doesThePasswordMatch = await bcrypt.compare(formData.password, user.password!)
        if (!doesThePasswordMatch) throw _createError(GET_SERVER_RESPONSE_KEY('AUTH_LOGIN_INVALID_PASSWORD'))

        // Generate new sessionKey
        await setNewSessionKey(event,user)
        return await getUser(user)
    } catch (error) {
        return error
    }   
})