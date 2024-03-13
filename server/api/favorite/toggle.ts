import { H3Event } from "h3"
import prisma from "@/server/db"
import { selectFavoriteItem } from "@/server/utils/selectData"
import { GET_SERVER_RESPONSE_KEY } from "@/server/utils/other"
import type { AlertItemCreate } from "type/intex"


type QueryListKey = 'favorite_id' | 'card_id'
export type QueryListFavorite = { [K in QueryListKey]?: string }

export default defineEventHandler(async (event: H3Event) => {
    
    const query = getQuery<QueryListFavorite>(event)
    let res
    let message: AlertItemCreate | null = null
    let type: 'add' | 'remove' | undefined

    try {
        if (query?.favorite_id && query?.card_id && isNumeric(query?.favorite_id) && isNumeric(query?.card_id)) {
            const where = { favoriteId: Number(query.favorite_id), cardId: Number(query.card_id) }
            const findRes = await prisma.userFavoriteProductItem.findFirst({ where: where })
            if (findRes) {
                await prisma.userFavoriteProductItem.delete({ 'where': { id: findRes.id } })
                type = 'remove'
            } else {
                await prisma.userFavoriteProductItem.create({ data: where })
                type = 'add'
            }

            res = await prisma.userFavoriteProduct.findUnique({
                where: { id: Number(query.favorite_id) },
                include: { item: { select: selectFavoriteItem() } }
            })

            return { data: res, message: message, type }
        }

        // return { data: null, message: { key: GET_SERVER_RESPONSE_KEY('BASKET_ADD_ERROR_BASKET_ID'), state: 'error' } }
        return { data: null, message: message, type }
    } catch (error) {
        console.log(error)
        return { data: null, message: { key: GET_SERVER_RESPONSE_KEY('SERVER_ERROR'), state: 'error' } }
    }


})