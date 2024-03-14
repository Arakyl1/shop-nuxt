import { UserCreateCommit } from "@/type/intex"
import { ProductCard } from "@prisma/client"

export const createReviews = defineStore('createReviews', () => {

    const data = ref<Pick<ProductCard, 'name'|'art'|'id'> | null>(null)
    
    function updateData(value: typeof data.value) {
        data.value = value
    }

    return { data, updateData }
})