import { ProductCard } from "@prisma/client"
import prisma from "."

// export const prismaCreateProduct = async(body: any) => {
//     return await prisma.productCard.create({
//         data: body
//     })
// }

export const prismaGetProduct = (option: any) => {
    return prisma.productCard.findUnique(option)
}

export const prismaUpdateProductRanting = async (data: { paramSearch: object,  newContent: object}) => {
    return await prisma.productCard.update({
        where: data.paramSearch,
        data: data.newContent
    })
}

export const prismaGetProductForCatagor = (params: { where: object, select: object}) => {
    return prisma.productCard.findMany(params)
}

// export const prismaAddProductCharacteristic = (characteristic: any) => {   
//     return prisma.characteristic.create({
//         data: characteristic
//     })
// }

// export const prismaAddProductCharacteristicItem = (item: any) => { 
//     return prisma.characteristicItem.create({
//         data: item
//     })
// }
