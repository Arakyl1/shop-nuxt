import prisma from "."

export const createRefrechToken = async(refrechToken: object) => {
    return prisma.RefrechToken.create({
        data: refrechToken
    })
}

// export const updateRefrechToken = async(newToken: {id: number, token: string }) => {
    
//     return prisma.RefrechToken.update({
//         where:{
//             token: newToken.token,
//         },
//         data: {
//             billingAddress: {
//                 id: newToken.id,
//                 token: newToken.token 
//             }
//         } 
//     })
// }

export const getRefrechTokenByTpken = async(token: string) => {
    return prisma.RefrechToken.findUnique({
        where: {
            token
        }
    })
}

export const removeRefrechToken = async(token: string) => {
    return prisma.refrechToken.delete({
        where: {
            token: token
        }
    })
}