import { H3Event } from "h3"
import prisma from "@/server/db"
import { selectBasketItem } from "@/server/utils/selectData"
import type { AlertItemCreate } from "@/type/intex"
import { _createResponseMessage } from "@/server/utils/message"
import { createResponse, isParameterPresentAndValueNumber } from "@/server/utils/other"


type QueryListKey = 'basket_id' | 'card_id' | 'item_id' | 'count' | 'type'
export type QueryList = { [K in QueryListKey]?: K extends 'type' ? 'add' | 'remove' : string }

export default defineEventHandler(async (event: H3Event) => {
    const query = getQuery<QueryList>(event)

    if (!query?.type) return createResponse(null, _createResponseMessage('BASKET_TYPE_ERROR','error'))

    let message: AlertItemCreate | null = null
    try {
        switch (query?.type) {
            case 'add': 
                message = await handlerAddItem(query)
                break;
            case 'remove': 
                message = await handlerRemoveItem(query)
                break;
        }

        if (!isParameterPresentAndValueNumber(query, 'basket_id')) return createResponse()

        const findRes = await prisma.basket.findUnique({
            where: { id: Number(query.basket_id) },
            include: { item: { select: selectBasketItem() } }
        })

        return { data: findRes, message }
    } catch (error) {
        console.log(error)
        return createResponse(null, _createResponseMessage('SERVER_ERROR','error'))
    }
})


async function handlerAddItem(query: QueryList) {
    if (!isParameterPresentAndValueNumber(query, 'card_id') && !isParameterPresentAndValueNumber(query, 'basket_id')) return null

    const whereParams = { basketId: Number(query.basket_id), cardId: Number(query.card_id) }
    const findRes = await prisma.basketItem.findFirst({ where: whereParams })

    if (findRes) return _createResponseMessage('BASKET_ALREADY_AVAILABLE_SUCCESSFULLY')

    await prisma.basketItem.create({
        data: { ...whereParams, count: query?.count ? Number(query.count) : 1 }
    })
        
    return _createResponseMessage('BASKET_ADD_SUCCESSFULLY','success')
}

async function handlerRemoveItem(query: QueryList) {
    if (!isParameterPresentAndValueNumber(query, 'item_id')) return null
    await prisma.basketItem.delete({
        where: { id: Number(query.item_id) },
    })
   return _createResponseMessage('BASKET_REMOVE_SUCCESSFULLY')
}



