import prisma from "@/server/db"

export default defineEventHandler(async() => {
    try {
        return await prisma.mainSlider.findUnique({
            where: { id: 2 },
            include: { item: {} }
        })
    } catch (error) {
        
    }
})