import { defineAuthenticatedEventHandler } from "@/server/utils/auth"
import { selectComment, selectProductCardMin } from "@/server/utils/selectData"
import prisma from "@/server/db"
import { Prisma } from "@prisma/client"

export default defineAuthenticatedEventHandler(async(event, authUser) => {
    const params = getQuery(event)

    if (!('tag' in params)) throw _createError('"tag" parameter is missing')

    let selectParams: Prisma.UserSelect
    switch (params.tag) {
        case 'reviews': 
            selectParams = {
                'reviews': {
                    select: selectComment({
                        'ProductCard': {
                            'select': selectProductCardMin()
                        }
                    })
                }
            }
            break;
        default:
            throw _createError(`unknown value "tag" params "${params.tag}"`)
    }
    try {
        return await prisma.user.findUnique({ where: { id: authUser.id }, select: selectParams })
    } catch (error) {
        throw _createError('something we wrong')
    }
})