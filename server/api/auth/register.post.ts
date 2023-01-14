import { H3Event } from "h3"
import { createUser } from "~~/server/db/user"
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";
import { createRefrechToken } from "~~/server/db/refrechTokem";
import { userTransform } from "~~/server/utils/userTransform";


export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event)

    const { username, email, password, repeartPassword } = body
    
    if (!username || !email || !password || !repeartPassword) {
        return { statusCode: 400, statusMessage: "Невалидные параметры" }
        // return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid params" }))
    }
    if (password !== repeartPassword) {
        return { statusCode: 400, statusMessage: "Пароли не совпадают" }
        // return sendError(event, createError({ statusCode: 400, statusMessage: "Password do not match" }))
    }
    const userData = {
        username,
        email,
        password,
        profileImage: "https://ie.wampi.ru/2022/08/02/Ivan_Abramov.png"
    }

    try {
        const user = await createUser(userData)

        // Generate Token
        try {
            const { accessToken, refrechToken } = await generateTokens(user)
            
            await createRefrechToken({ token: refrechToken, userId: user.id })
            
            sendRefrechToken(event, refrechToken)

            return {
                access_token: accessToken,
                user: user
            }
        } catch (error) {
            return {
                access_token: '',
                user: userTransform(user)
            }
        }

    } catch (error) {
        return { statusCode: 400, statusMessage: "Такой пользователь уже существует" }
       // return sendError(event, createError({ statusCode: 400, statusMessage: "Такой пользователь уже существует" }))
    }
})
