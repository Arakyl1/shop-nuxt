import prisma from "@/server/db"

export default defineEventHandler(async () => {

    const s = Date.now()
    
    const textListForComment = {
        1: ['Не рекомендую', "Ужасный товар, не рекомендую","Высокая цена"],
        2: ['Плохой товар', "Некачественный товар"],
        3: ['Завышенная  цена', "Не качественные материалы"],
        4: ['Хороший товар'],
        5: ['Отличный товар', "Рекомендую к покупке"]
    }

    const productCardList = await prisma.productCard.findMany({ where: {}, select: { id: true } })

    function getRandomNum(size: number = 10) {
        return Math.round(Math.random() * size)
    }
    
    function getRandomLengthArray() {
        return new Array(getRandomNum())
    }

    
    const d = productCardList.map(async(pro) => {
        const res = getRandomLengthArray().fill('dd').map(async() => {
            const rating = (getRandomNum(5) || 1) as keyof typeof textListForComment
            return await prisma.comment.create({
                data: {
                    ranting: rating,
                    text: (textListForComment[rating])[getRandomNum(textListForComment[rating].length - 1)],
                    'cardId': pro.id,
                    'userId': 193,
                },
                select: { id: true }
            })
        })
        return await Promise.any(res)
    })
    
    return { data: await Promise.any(d), time: Date.now() - s }

})