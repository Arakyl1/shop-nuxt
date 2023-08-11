import { UserBase } from "~~/type/intex"

export const user = defineStore('user', () => {
    const data = ref<UserBase | null>(null)

    function update(user: UserBase | null) {
        data.value = user
    }

    return { data, update }
})