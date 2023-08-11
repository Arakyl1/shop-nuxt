import { BasketItem } from "@/type/intex";

export const basket = defineStore('basket', () => {
    
    const data = ref<BasketItem[]>([])
    const localData = ref<{ quantity: number, id: number }[]>([])

    function updateData(newData: typeof data.value) {
        if (newData) {
            data.value = newData
        }
    }

    function addItem<T extends BasketItem>(item: T) { 
        data.value.push(item)
        const localDataUpdate = data.value.map(_ => ({ quantity: _.quantity, id: _.data.id }))
        localSet('MARKET_5kv_basket', localDataUpdate)
        localData.value = localDataUpdate
    }

    function findItem(id:number) {
        return data.value.find(el => el.data.id === id)
    }

    function removeItem(id: number) {
        data.value = data.value.filter(_ => _.data.id !== id)
        const localDataUpdate = data.value.map(_ => ({ quantity: _.quantity, id: _.data.id }))
        localSet('MARKET_5kv_basket', localDataUpdate)
        localData.value = localDataUpdate
    }

    
    onBeforeMount(() => {
        const localStorage = localGet('MARKET_5kv_basket')
        if (localStorage) {
            localData.value = JSON.parse(localStorage)
        }
    })
    return { data, localData, updateData, addItem, findItem, removeItem }
})