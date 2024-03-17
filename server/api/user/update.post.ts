import { defineAuthenticatedEventHandler } from "@/server/utils/auth"
import { selectComment, selectProductCardMin } from "@/server/utils/selectData"
import prisma from "@/server/db"
import { Prisma, User } from "@prisma/client"



export default defineAuthenticatedEventHandler(async(event, authUser) => {
    const modelKey: Array<keyof User> = ['email','username','name']
    const formBody = await readFormData(event)

    const updateData: Prisma.UserUpdateArgs['data'] = {}

    for (const [key,value] of formBody) {
        if (modelKey.includes(key)) {
            updateData[key as keyof User] = value as string
        }
    }
    await prisma.user.update({ where: { id: authUser.id  }, data: updateData})
    return true
})