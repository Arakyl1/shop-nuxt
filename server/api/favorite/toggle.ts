import { H3Event } from "h3"
import prisma from "@/server/db"
import { selectFavoriteItem } from "@/server/utils/selectData"
import { createResponse, isParameterPresentAndValueNumber } from "@/server/utils/other"
import type { AlertItemCreate } from "type/intex"
import { _createResponseMessage } from "@/server/utils/message"


type QueryListKey = 'favorite_id' | 'card_id'
export type QueryListFavorite = { [K in QueryListKey]?: string }

export default defineEventHandler(async (event: H3Event) => {
    
    const query = getQuery<QueryListFavorite>(event)
    let message: AlertItemCreate | null = null
    let type: 'add' | 'remove' | undefined
    const _favorite = prisma.userFavoriteProductItem

    try {
        if (!isParameterPresentAndValueNumber(query,'card_id') &&
            !isParameterPresentAndValueNumber(query,'favorite_id')
        ) return createResponse(null, null)
        
        const where = { favoriteId: Number(query.favorite_id), cardId: Number(query.card_id) }
        const findRes = await _favorite.findFirst({ where: where })

        if (findRes) {
            await _favorite.delete({ 'where': { id: findRes.id } })
            type = 'remove'
        } else {
            await _favorite.create({ data: where })
            type = 'add'
        }

        const favoriteNewDate = await prisma.userFavoriteProduct.findUnique({
            where: { id: where.favoriteId },
            include: { item: { select: selectFavoriteItem() } }
        })

        return createResponse(favoriteNewDate, message, { type: type })
    } catch (error) {
        console.log(error)
        return createResponse(null, _createResponseMessage('SERVER_ERROR','error'))
    }


})