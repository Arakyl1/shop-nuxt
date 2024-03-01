import type { storageCategorData } from "@/type/intex"
import prisma from "~~/server/db"

export async function getCategor() {
    let storageData: storageCategorData | null = await useStorage().getItem('CATEGOR_DATA')

    if (storageData) return storageData

    const res = await prisma.attribute.findMany({ where: { type: 'CATEGOR' }, include: { children: { include: { children: true } } } })
    await useStorage().setItem('CATEGOR_DATA', res)
    return res
}