import prisma from "~~/server/db"
import { storageCategorData } from "~~/type/intex"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        let storageKey = ''
        Object.entries(body).forEach(_ => {
            const [key, value] = _
            if (Array.isArray(value)) {
                storageKey = 'NO KEY REQUIRED'
                return
            } else {
                storageKey += value
            }
        })
        
        
        if (storageKey === 'NO KEY REQUIRED') {
            return await prisma.attribute.findMany({ where: body, include: { children: { include: { children: true } } } })
        } else {
            let finalStorageKey = storageKey + "_DATA" 
            // console.log(finalStorageKey)
            let storageData: storageCategorData | null = await useStorage().getItem(finalStorageKey)
            if (!storageData) {
                const categorAttriduteRes = await prisma.attribute.findMany({ where: body, include: { children: { include: { children: true } } } })
                await useStorage().setItem(finalStorageKey, categorAttriduteRes)
                storageData = categorAttriduteRes
            } else {
                console.log('cache data')
            }
            return storageData
        }
        
    } catch (error) {
        return null
    }
})