import { H3Event } from "h3"
import bcryptjs from "bcryptjs";
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";
import { prismaCreate } from "~~/server/db/methods";
import { userTransform } from "~~/server/utils/userTransform";
import { UserCreateBase, UserCreateSelect } from "~~/type/intex";

export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event)
    const { username, email, password } = body

    type UserCreateData = {
        username: string,
        email:  string,
        password: string,
        profileImage: string
    }
    const userData: UserCreateData = {
        username,
        email,
        password,
        profileImage: "https://res.cloudinary.com/dmxetw6p8/image/upload/v1675156698/upload-examples/w7xbdugi7bgqt0psz3kg.webp"
    }

    try {
        const salt = bcryptjs.genSaltSync(10);
        const updateUserData = {
            ...userData,
            password: bcryptjs.hashSync(userData.password, salt)
        }

        const user: UserCreateBase = await prismaCreate('user', { data: updateUserData, select: UserCreateSelect })
        
        // Generate Token
        try {
            const { accessToken, refrechToken } = await generateTokens(user)
            prismaCreate('refrechToken', { data: { token: refrechToken, userId: user.id }})
            sendRefrechToken(event, refrechToken)

            return {
                access_token: accessToken,
                user: userTransform<UserCreateBase>(user)
            }
        } catch (error) {
            return {
                access_token: '',
                user: userTransform<UserCreateBase>(user)
            }
        }

    } catch (error) {
        return { message: "Такой пользователь уже существует" }
    }
})
