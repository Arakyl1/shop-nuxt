import prisma from "~~/server/db"
import { db } from "@/utils/dbcategor";

export default defineEventHandler(async () => {

    for (const categor of db) {
        console.log('start', Date.now())
        const createCategorRes = await prisma.attribute.create({
            data: { name: categor[0] as string, type: 'CATEGOR' },
            select: { id: true }
        })
        const updateListCategor = categor.filter(_ => Array.isArray(_))

        if (updateListCategor.length) {
            for (const subcategor of updateListCategor) {
                if (subcategor[0]) {
                    let parent: { id: number } | null = null

                    const findSubCategorRes = await prisma.attribute.findFirst({
                        where: { name: subcategor[0] as string, type: 'SUBCATEGOR' },
                        select: { id: true, parent: { select: { id: true }} }
                    })

                    if (findSubCategorRes) {
                        parent = await prisma.attribute.update({
                            where: { id: findSubCategorRes.id },
                            data: { parent: { connect: [{ id: createCategorRes.id }, ...findSubCategorRes.parent] } },
                            select: { id: true }
                        })

                    } else {
                        parent = await prisma.attribute.create({
                            data: { name: subcategor[0] as string, type: 'SUBCATEGOR', parent: { connect: [{ id: createCategorRes.id }]} },
                            select: { id: true }
                        })

                    }
                    
                    if (parent) {
                        const updateListSubCategor = subcategor[1] as string[]
                        if (updateListSubCategor) {
                            for (const group of updateListSubCategor) {

                                const findGroupRes = await prisma.attribute.findFirst({
                                    where: { name: group as string, type: 'CLASS' },
                                    select: { id: true, parent: { select: { id: true }} }
                                })
                                if (findGroupRes) {
                                    await prisma.attribute.update({
                                        where: { id: findGroupRes.id },
                                        data: { parent: { connect: [...findGroupRes.parent, { id: parent.id }] }},
                                    })

                                } else {
                                    const createSubcategorRes = await prisma.attribute.create({
                                        data: { name: group as string, type: 'CLASS', parent: { connect: [{ id: parent.id }]} }
                                    })

                                }
                            }
                        }
                    }
                }
            }
        }

        console.log('end', Date.now())
    }
    
    return true
})