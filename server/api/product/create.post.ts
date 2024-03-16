import { AttributeType, Prisma } from "@prisma/client";
import prisma from "~~/server/db";


export default defineEventHandler(async(event) => {
    const body = await readBody<{ [key: string]: any }>(event);

    const ATTRIBUTE = await prisma.attribute.findMany({
        where: {
            OR: ['CATEGOR', 'SUBCATEGOR', 'CLASS', 'MAKER', 'OTHER'].map(type => ({ type }))
        },
        select: {
            id: true,
            value: true,
            type: true,
            name: true,
            children: {
                select: {
                    id: true,
                    value: true,
                    name: true,
                    type: true,
                    children: {
                        select: { id: true, name: true, value: true, type: true }
                    }
                }
            }
        }
    });
    
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
        attribute: { connect: [], create: [] },
        image: { create: [] },
        characteristic: { create: [] }
    })

    const otherListAttribute = ATTRIBUTE.filter(_ => _.type === 'OTHER').map(_ => ({ value: _.value, id: _.id, name: _.name }))
    let findResCategor = null
    const attributeKeyList: { [k: `CATEGOR__${number}`]: AttributeType } = {
        'CATEGOR__1': 'CATEGOR',
        'CATEGOR__2': 'SUBCATEGOR',
        'CATEGOR__3': 'CLASS', 
    }


    function handlerConnectAttribute(value:never) {
        try {
            createProductCardData.attribute.connect.push(value)
        } catch (error) {
            console.log(error)
        }
    }

    function checkAttribute(res: any, key: AttributeType) {
        if (['CATEGOR','SUBCATEGOR'].includes(key) && res) {
            findResCategor = res
        } else if (key === 'CLASS' && res) { handlerConnectAttribute(res.id)}
    }


    for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
            const value = body[key];

            if (ProductCardMainKey.includes(key.trim())) {
                createProductCardData[key as keyof typeof createProductCardData] = value as never;
            } else if (key === 'image' && Array.isArray(value)) {
                value.forEach(_ => {
                    if (typeof _ === 'object' && ('link' in _) && ('main' && _)) {
                        createProductCardData.image.create.push({ link: _.link, main: _.main } as never)
                    }
                })

            } else if (key === 'characteristic' && Array.isArray(value)) {
                value.forEach((_: { title: string, children: [] }) => {
                    if (typeof _ === 'object' && 'title' in _ && 'children' in _ && Array.isArray(_.children)) {
                        const charData = {
                            title: _.title,
                            content: { create: _.children }
                        } as Prisma.CharacteristicCreateWithoutProductCardInput
                        createProductCardData.characteristic.create.push(charData as never)
                    }
                })

            } else if (key === 'maker') {
                const findMakerRes = ATTRIBUTE.find((_) => _.type === 'MAKER' && _.value === value)
                if (findMakerRes) {
                    handlerConnectAttribute({ id: findMakerRes.id })
                } else {
                    createProductCardData.attribute.create.push({ type: 'MAKER', value: value } as never)
                }
            } else if (key.startsWith('CATEGOR_')) {
                // /['CATEGOR', 'SUBCATEGOR', 'CLASS'].includes(key.trim())
               const _keyAttribute = attributeKeyList[key as 'CATEGOR__1']
                
               function getChildren(data: typeof ATTRIBUTE) {
                    return data.find(_ => _.type === _keyAttribute && _.value === value) || null
               }

               checkAttribute(getChildren(findResCategor ? findResCategor.children : ATTRIBUTE), _keyAttribute)
               
            } else { 
                const findRes = otherListAttribute.find(_ => _.name === key.trim())
                if (findRes) handlerConnectAttribute({ id: findRes!.id })
            }
        }
    }

    try {
        return await prisma.productCard.create({ data: createProductCardData, include: { image: true, attribute: true } })
    } catch (error) {
       console.log(error)
   }
})