import { H3Event } from "h3"
import prisma from "@/server/db"
import { selectBasketItem } from "@/server/utils/selectData"


type QueryListKey = 'basket_id'|'card_id'|'item_id'|'count'|'type'
type QueryList = { [K in QueryListKey]?: K extends 'type' ? 'add'|'remove' : string }
export default defineEventHandler(async(event: H3Event) => {
    const query = getQuery<QueryList>(event)

    if (query?.type) {
        let res
        let message = null
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
                        } else { message = 'Товар уже в вашей корзине' }
                    }
                    res = true
                    break;  
                }
                case 'remove': {
                    if (query?.item_id && isNumeric(query.item_id)) {
                        await prisma.basketItem.delete({
                            where: { id: Number(query.item_id) },
                        })
                    }
                    res = true
                    message = 'Товар успешно удален'
                    break;
                }
            }

            if (res && query.basket_id && isNumeric(query.basket_id)) {
                const findRes = await prisma.basket.findUnique({
                    where: { id: Number(query.basket_id) },
                    include: { item: { select: selectBasketItem() } }
                })

                return { data: findRes, message: message }
            }
            return { data: null, message: 'absent or invalid params "basket_id"' }
        } catch (error) {
            console.log(error)
            return { data: null, message: GET_CONTENT_KEY('AUTH_ERROR') }
        }
    }
    
    return { data: null, message: 'absent or invalid params "type"' }
})