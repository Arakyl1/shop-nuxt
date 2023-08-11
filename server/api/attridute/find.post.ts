import prisma from "~~/server/db"
import { storageCategorData } from "~~/type/intex"

// transfer object extends Prisma.AttributeWhereInput
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    // console.log(body)
    try {
        let storageKey = ''
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const elem = body[key];
                if (Array.isArray(elem)) {
                    storageKey = 'NO KEY REQUIRED'
                    break
                } else {
                    storageKey += elem
                }
            }
        }
        
        
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