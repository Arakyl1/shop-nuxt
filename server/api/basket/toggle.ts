import { H3Event } from "h3"
import prisma from "@/server/db"
import { selectBasketItem } from "@/server/utils/selectData"
import { GET_SERVER_RESPONSE_KEY } from "@/server/utils/other"
import type { AlertItemCreate } from "type/intex"


type QueryListKey = 'basket_id'|'card_id'|'item_id'|'count'|'type'
export type QueryList = { [K in QueryListKey]?: K extends 'type' ? 'add'|'remove' : string }
export default defineEventHandler(async(event: H3Event) => {
    const query = getQuery<QueryList>(event)

    if (query?.type) {
        let res
        let message: AlertItemCreate | null = null
        try {
            switch (query?.type) {
                case 'add': {
                    if (query?.basket_id && query?.card_id && isNumeric(query?.basket_id) && isNumeric(query?.card_id)) {
                        const findRes = await prisma.basketItem.findFirst({
                            where: { basketId: Number(query.basket_id), cardId: Number(query.card_id) }
                        })

                        if (!findRes) {
                            await prisma.basketItem.create({
                                data: {
                                    'basketId': Number(query.basket_id),
                                    cardId: Number(query.card_id),
                                    count: query?.count ? Number(query.count) : 1
                                }
                            })
                            message = { key: GET_SERVER_RESPONSE_KEY('BASKET_ADD_SUCCESSFULLY'), state: 'success' }
                        } else {
                            message = { key: GET_SERVER_RESPONSE_KEY('BASKET_ALREADY_AVAILABLE_SUCCESSFULLY'), state: 'info' }
                        }
                    }
                    res = null
                    break;  
                }
                case 'remove': {
                    if (query?.item_id && isNumeric(query.item_id)) {
                        await prisma.basketItem.delete({
                            where: { id: Number(query.item_id) },
                        })
                        message = { key: GET_SERVER_RESPONSE_KEY('BASKET_REMOVE_SUCCESSFULLY'), state: 'info' }
                    }
                    res = null
                    message = null
                    break;
                }
            }

            if (query.basket_id && isNumeric(query.basket_id)) {
                const findRes = await prisma.basket.findUnique({
                    where: { id: Number(query.basket_id) },
                    include: { item: { select: selectBasketItem() } }
                })

                return { data: findRes, message: message }
            }
            // return { data: null, message: { key: GET_SERVER_RESPONSE_KEY('BASKET_ADD_ERROR_BASKET_ID'), state: 'error' } }
            return { data: null, message: message }
        } catch (error) {
            console.log(error)
            return { data: null, message: { key: GET_SERVER_RESPONSE_KEY('SERVER_ERROR'), state: 'error' } }
        }
    } else {
        return { data: null, message: { key: GET_SERVER_RESPONSE_KEY('BASKET_TYPE_ERROR'), state: 'error' } }
    }
    
})