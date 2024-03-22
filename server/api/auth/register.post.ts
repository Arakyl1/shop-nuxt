import { H3Event } from "h3"
import bcrypt from 'bcryptjs';
import { Prisma, User } from "@prisma/client";
import prisma from "@/server/db";
import { CookieKey } from "@/type/intex";
import { setNewSessionKey } from "@/server/utils/auth";
import { _createError } from "@/server/utils/message";
import { getUser } from "@/server/utils/auth"

export default defineEventHandler(async(event: H3Event) => {

    const body = await readBody<Pick<Prisma.UserCreateInput, 'email'|'password'|'username'>>(event)
    const keyCookie: CookieKey = 'sessionKey'
    const cookieSessionKey = getCookie(event, keyCookie)
    const appConfig = useRuntimeConfig()
    const { username, email, password } = body

    try {

        if (!username || !email || !password) throw _createError('invalid create data')
        if (!cookieSessionKey) throw _createError('absent cookie sessionKey')

        const resUser = await prisma.refrechToken.findFirst({
            where: { token: cookieSessionKey },
            select: { 'user': { select: { id: true, role: true } } }
        })

        console.log(resUser)
        if (!resUser) throw _createError('invalid sessionKey')


        const salt = bcrypt.genSaltSync(10);
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
        } catch (error) {
            throw _createError('error update user data')
        }

        await setNewSessionKey(event, { id: user.id, role: user.role })
        return await getUser(user)

    } catch (error) {
        // console.log()
        // return { messageKey: GET_CONTENT_KEY('AUTH_REGISTER_SUCH_USER_ALREADY_EXISTS')}
        return error
    }
})
