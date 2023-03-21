import { UserCommit } from "@/type/intex"

export default () => {
    const create = async(body: UserCommit) => {
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