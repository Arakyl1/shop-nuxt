import { Prisma } from "@prisma/client";

export default () => {
    const create = async(body: Prisma.CommentUncheckedCreateInput) => {
        try {
            return await $fetch('/api/review/create', {
                method: 'POST',
                body: body
            })
        } catch (error) {
            console.log(error);
        }
    }
    return { create }
}