import { H3Event, sendError } from "h3"
import { createUser } from "~~/server/db/user"
import createAndSendError from "~~/server/utils/createAndSendError";
import { generateTokens, sendRefrechToken } from "../../utils/jwt";
import { createRefrechToken } from "~~/server/db/refrechTokem";


export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event)

    const { username, email, password, repeartPassword } = body
    
    if (!username || !email || !password || !repeartPassword) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Invalid params"
        }))
    }
    if (password !== repeartPassword) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "Password do not match"
        }))
    }
    const userData = {
        username,
        email,
        password,
        profileImage: "https://picsum/200/200"
    }

    // const user = await createUser(userData)
    // if (!user) {
    //     createAndSendError(event, 404, "Error when creating")
    // }

    // Generate Token

    const { accessToken } = await generateTokens(userData)

    // await createRefrechToken({
    //     token: refrechToken,
    //     userId: user.id
    // })

    // sendRefrechToken(event, refrechToken)


    return {
        access_token: accessToken,
        // user: user
    }
})
