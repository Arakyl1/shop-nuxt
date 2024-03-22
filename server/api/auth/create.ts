import prisma from "@/server/db"

export default defineEventHandler(async() => {
    try {
        return await prisma.user.create({
            'data': { role: 'ANONIM', basket: { 'create': {} }, favorites: { create: {} } }
        })
    } catch (error) {
        return authError()
    }
})