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
                if (findResCategor) {
                    const res = findResCategor.children.find(_ => _.type === _keyAttribute && _.value === value)
                    checkAttribute(res, _keyAttribute)
                } else {
                    const res = ATTRIBUTE.find(_ => _.type === _keyAttribute && _.value === value) || null
                    checkAttribute(res, _keyAttribute)
                }
            } else { 
                const findRes = otherListAttribute.find(_ => _.name === key.trim())
                if (findRes) handlerConnectAttribute({ id: findRes!.id })
            }
        }
    }



    // for (const key in body) {
    //     if (Object.prototype.hasOwnProperty.call(body, key)) {
    //         const value = body[key];
    //         const findResMainKey = ProductCardMainKey.includes(key.trim())
    //         if (findResMainKey) {
    //             createProductCardData[key as keyof typeof createProductCardData] = value as never
    //         } else if (key === 'image' && Array.isArray(value)) {
    //             // for (let i = 0, l = value.length; i < l; i++) {
    //             //     const imageItem  = value[i];
    //             //     if (typeof imageItem === 'object' && 'link' in imageItem && 'main' && imageItem) {
    //             //         createProductCardData.image.create.push({ link: imageItem.link, main: imageItem.main } as never)
    //             //     }
    //             // }
    //         } else if (key === 'characteristic' && Array.isArray(value)) {
    //             // for (let i = 0, l = value.length; i < l; i++) {
    //             //     if (typeof value[i] === 'object' && 'title' in value[i] &&
    //             //     'children' in value[i] && Array.isArray(value[i].children)
    //             //     ) {
    //             //         const chatItem: { title: string, children: [] } = value[i];
    //             //         const updateData: Prisma.CharacteristicCreateWithoutProductCardInput = {
    //             //             title: chatItem.title,
    //             //             content: { create: chatItem.children.map((_: { name: string, value: string }) => ({ name: _.name, value: _.value })) }
    //             //         }
    //             //         createProductCardData.characteristic.create.push(updateData as never)
    //             //     }
    //             // }
                
               
    //         } else if (key === 'maker') {
    //             // const findMakerRes = ATTRIBUTE.find((_) => _.type === 'MAKER' && _.value === value)
    //             // if (findMakerRes) {
    //             //     createProductCardData.attribute.connect.push({ id: findMakerRes.id } as never)
    //             // } else {
    //             //     createProductCardData.attribute.create.push({ type: 'MAKER', value: value } as never)
    //             // }
    //         } else if (typeof key === 'string' && ['CATEGOR', 'SUBCATEGOR', 'CLASS'].includes(key.trim())) {
    //             // if (key === 'CATEGOR' || key === 'SUBCATEGOR') {
    //             //     findResCategor = findResCategor ?
    //             //     findResCategor.children.find(_ => _.type === key && _.value === value) || null :
    //             //     ATTRIBUTE.find(_ => _.type === key && _.value === value) || null
    //             // } else if (key === 'CLASS') {
    //             //     if (findResCategor) {
    //             //         const findRes = findResCategor.children.find(_ => _.type === key && _.value === value)
    //             //         findRes ? createProductCardData.attribute.connect.push({ id: findRes.id } as never) : null
    //             //     } else {
    //             //         const findRes = ATTRIBUTE.find(_ => _.type === key && _.value === value)
    //             //         findRes ? createProductCardData.attribute.connect.push({ id: findRes.id } as never) : null
    //             //     }
    //             // }
    //         } else if (otherListAttribute.find(_ => _.value === key.trim())) {
    //             // const findRes = otherListAttribute.find(_ => _.value === key.trim())
    //             // createProductCardData.attribute.connect.push({ id: findRes!.id } as never)
    //         }
    //     }
    // }
    try {
        return await prisma.productCard.create({ data: createProductCardData, include: { image: true, attribute: true } })
    } catch (error) {
       console.log(error)
   }
})