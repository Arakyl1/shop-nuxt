import { Prisma } from "@prisma/client";
import prisma from "~~/server/db";


export default defineEventHandler(async(event) => {
    const body = await readBody<{ [key: string]: any }>(event);

    const ATTRIBUTE = await prisma.attribute.findMany({ where: {OR:[
        { 'type': 'CATEGOR' }, { 'type': 'SUBCATEGOR' }, { 'type': 'CLASS' },
        { 'type': 'MAKER' }, { 'type': 'OTHER' }
    ] }, select: {
        id: true,
        value: true,
        type: true,
        name: true,
        children: {
            select: {
                id: true, value: true, name: true, type: true, children: {
                    select: { id: true, name: true, value: true, type: true }
                }
            }
        }
    } })
    const ProductCardMainKey = ['art', 'description', 'itemArt', 'itemMod', 'name', 'price', 'quantity']
    const createProductCardData = Prisma.validator<Prisma.ProductCardCreateInput>()({
        art: '',
        name: '',
        itemArt: '',
        itemMod: '',
        price: 0,
        quantity: 0,
        discount: 0,
        description: '',
        attribute: {
            connect: [],
            create: [],
        },
        image: {
            create: []
        },
        characteristic: {
            create: []
        }
    })
    const otherListAttridute = ATTRIBUTE.filter(_ => _.type === 'OTHER').map(_ => ({ value: _.value, id: _.id }))
    let findResCategor = null
    for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            const value = body[key];
            const findResMainKey = ProductCardMainKey.includes(key.trim())
            if (findResMainKey) {
                createProductCardData[key as keyof typeof createProductCardData] = value as never
            } else if (key === 'image' && Array.isArray(value)) {
                for (let i = 0, l = value.length; i < l; i++) {
                    const imageItem  = value[i];
                    if (typeof imageItem === 'object' && 'link' in imageItem && 'main' && imageItem) {
                        createProductCardData.image.create.push({ link: imageItem.link, main: imageItem.main } as never)
                    }
                }
            } else if (key === 'characteristic' && Array.isArray(value)) {
                for (let i = 0, l = value.length; i < l; i++) {
                    if (typeof value[i] === 'object' && 'title' in value[i] &&
                    'children' in value[i] && Array.isArray(value[i].children)
                    ) {
                        const chatItem: { title: string, children: [] } = value[i];
                        const updateData: Prisma.CharacteristicCreateWithoutProductCardInput = {
                            title: chatItem.title,
                            content: { create: chatItem.children.map((_: { name: string, value: string }) => ({ name: _.name, value: _.value })) }
                        }
                        createProductCardData.characteristic.create.push(updateData as never)
                    }
                }
                
               
            } else if (key === 'maker') {
                const findMakerRes = ATTRIBUTE.find((_) => _.type === 'MAKER' && _.value === value)
                if (findMakerRes) {
                    createProductCardData.attribute.connect.push({ id: findMakerRes.id } as never)
                } else {
                    createProductCardData.attribute.create.push({ type: 'MAKER', value: value } as never)
                }
            } else if (typeof key === 'string' && ['CATEGOR', 'SUBCATEGOR', 'CLASS'].includes(key.trim())) {
                if (key === 'CATEGOR' || key === 'SUBCATEGOR') {
                    findResCategor = findResCategor ?
                    findResCategor.children.find(_ => _.type === key && _.value === value) || null :
                    ATTRIBUTE.find(_ => _.type === key && _.value === value) || null
                } else if (key === 'CLASS') {
                    if (findResCategor) {
                        const findRes = findResCategor.children.find(_ => _.type === key && _.value === value)
                        findRes ? createProductCardData.attribute.connect.push({ id: findRes.id } as never) : null
                    } else {
                        const findRes = ATTRIBUTE.find(_ => _.type === key && _.value === value)
                        findRes ? createProductCardData.attribute.connect.push({ id: findRes.id } as never) : null
                    }
                }
            } else if (otherListAttridute.find(_ => _.value === key.trim())) {
                const findRes = otherListAttridute.find(_ => _.value === key.trim())
                createProductCardData.attribute.connect.push({ id: findRes!.id } as never)
            }
        }
    }
   try {
    const createRes = await prisma.productCard.create({ data: createProductCardData, include: { image: true, attribute: true } })
    return createRes
   } catch (error) {
       console.log(error)
   }
})