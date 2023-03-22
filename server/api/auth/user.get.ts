import { prismaFindUnique } from "@/server/db/methods"
import { decodeAccessToken } from "@/server/utils/jwt"
import { userTransform } from "~~/server/utils/userTransform"
import { returnParamsMain, returnParamsAditional } from "@/server/utils/searchParams";
import { Prisma } from '@prisma/client'


export default defineEventHandler(async(event) => {
    const token = event.req.headers['authorization']?.split(' ')[1] || ""
    const decoded = decodeAccessToken(token)
    
    if (!(decoded instanceof Object && 'userId' in decoded)) return { message: 'Unauthorized' }

    try {
        const searchParams = returnParamsMain({ id: decoded.userId }, returnParamsAditional({}))
        const select = Prisma.validator<Prisma.UserArgs>()({select: searchParams.select })
        type UserBase = Prisma.UserGetPayload<typeof select>

        const user: UserBase = await prismaFindUnique('user', searchParams)
        return { user: userTransform<UserBase>(user)}
    } catch (error) {
        return { message: 'Error' }
    }
})