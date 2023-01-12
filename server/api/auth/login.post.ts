import { getUser } from "../../db/user";
import { generateTokens, sendRefrechToken } from "../../utils/jwt";
import bcryptjs from "bcryptjs";
import { createRefrechToken } from "~~/server/db/refrechTokem";
import { userTransform } from "~~/server/utils/userTransform";
import { searchByidUsername } from "@/server/utils/searchParams";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    const { username, password } = body 

    const user = await getUser(searchByidUsername(username))

    if (!user) {
        return { statusCode: 400, statusMessage: 'Такой пользователь на зарегистрирован' }
        // throw createError({
        //     statusCode: 400,
        //     statusMessage: 'A user with this name is not registered'
        // })
    }

    const doesThePaswordMatch = await bcryptjs.compare(password, user.password)


    if (!doesThePaswordMatch) {
        return { statusCode: 400, statusMessage: 'Некорректный пароль' }
        // throw createError({
        //     statusCode: 400,
        //     statusMessage: 'The password is not correct'
        // })
    }
    // Generate Token

    const { accessToken, refrechToken } = await generateTokens(user)

    await createRefrechToken({
        token: refrechToken,
        userId: user.id
    })
    // console.log(1);
    
    // await updateRefrechToken({id: user.id, token: refrechToken})
    // console.log(2);

    sendRefrechToken(event, refrechToken)

    return  {
        access_token: accessToken,
        user: userTransform(user)
    }
})