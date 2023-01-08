import prisma from "."

export const prismaCreateReviews = async(body: any) => {
    return await prisma.comment.create({
        data: body
    })
}