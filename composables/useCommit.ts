import { UserCreateCommit } from "@/type/intex"

export default () => {
    const create = async(body: UserCreateCommit) => {
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