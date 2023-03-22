import { H3Event } from "h3"
import bcryptjs from "bcryptjs";
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";
import { prismaCreate } from "~~/server/db/methods";
import { userTransform } from "~~/server/utils/userTransform";
import { Prisma } from "@prisma/client";

export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event)
    const { username, email, password, repeartPassword } = body

    const userData = {
        username,
        email,
        password,
        profileImage: "https://ie.wampi.ru/2023/01/26/avatar.jpg"
    }

    try {
        const salt = bcryptjs.genSaltSync(10);
        const updateUserData = {
            ...userData,
            password: bcryptjs.hashSync(userData.password, salt)
        }
        
        const UserSelect =  {
                id: true,
                email: true,
                name: true,
                username: true,
                profileImage: true,
            }
        
        const select = Prisma.validator<Prisma.UserArgs>()({select: UserSelect })
        type UserBase = Prisma.UserGetPayload<typeof select>
        
        const user: UserBase = await prismaCreate('user', { data: updateUserData , select: UserSelect })
        
        // Generate Token
        try {
            const { accessToken, refrechToken } = await generateTokens(user)
            
            prismaCreate('refrechToken', { data: { token: refrechToken, userId: user.id }})
            
            sendRefrechToken(event, refrechToken)

            return {
                access_token: accessToken,
                user: userTransform<UserBase>(user)
            }
        } catch (error) {
            return {
                access_token: '',
                user: userTransform<UserBase>(user)
            }
        }

    } catch (error) {
        return { message: "Такой пользователь уже существует" }
    }
})
