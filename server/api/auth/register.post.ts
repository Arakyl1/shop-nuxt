import { H3Event } from "h3"
import bcrypt from 'bcryptjs';
import { Prisma, User } from "@prisma/client";
import prisma from "@/server/db";
import { _createError } from "@/server/utils/message";
import { getUser, setNewSessionKey } from "@/server/utils/auth"
import { getFormDataInEvent, checkValidFormData } from "@/server/utils/formDataHelper";
import { _deleteCookie, _getCookie, GET_SERVER_RESPONSE_KEY } from "@/server/utils/other";

export default defineEventHandler(async(event: H3Event) => {
    try {
        const modelKey: Array<keyof User> = ['email','username','password']
        const formData = await getFormDataInEvent(event, modelKey)

        checkValidFormData(formData, modelKey)

        const cookieSessionKey = _getCookie(event, 'anonimSessionKey')
        if (!cookieSessionKey) throw _createError(GET_SERVER_RESPONSE_KEY('AUTH_ABSENT_COOKIE_ANONIM_SESSION_KEY'))

        const resUser = await prisma.refrechToken.findFirst({
            where: { token: cookieSessionKey },
            select: { 'user': { select: { id: true, role: true } } }
        })

        if (!resUser) throw _createError(GET_SERVER_RESPONSE_KEY('AUTH_INVALID_COOKIE_ANONIM_SESSION_KEY'))


        const salt = bcrypt.genSaltSync(10);
        const { username, email, password } = formData
        const appConfig = useRuntimeConfig()
        const userCreateData = Prisma.validator<Prisma.UserUpdateArgs>()({
            where: { id: resUser.user.id },
            data: {
                username,
                email,
                profileImage: appConfig.public.linkPhotoUserBase,
                password: bcrypt.hashSync(password!, salt),
                role: 'USER'
            },
        })

        let user: User | undefined
        try {
            user = await prisma.user.update(userCreateData)
            _deleteCookie(event, 'anonimSessionKey')
        } catch (error) {
            throw _createError(GET_SERVER_RESPONSE_KEY('CREATE_ERROR'))
        }

        await setNewSessionKey(event, { id: user.id, role: user.role })
        return await getUser(user)
    } catch (error) {
        console.log(error)
        return error
    }
})
