import { BasketItem } from "@/type/intex";

export const basket = defineStore('basket', () => {
    
    // const localData = ref<{ quantity: number, id: number }[]>([])
    // const resData = ref()
    // function updateData(newData: typeof data.value) {
    //     if (newData) {
    //         data.value = newData
    //     }
    // }

    // function addItem<T extends BasketItem>(item: T) { 
    //     data.value.push(item)
    //     const localDataUpdate = data.value.map(_ => ({ quantity: _.quantity, id: _.data.id }))
    //     localSet('MARKET_5kv_basket', localDataUpdate)
    //     localData.value = localDataUpdate
    // }

    // function findItem(id:number) {
    //     return data.value.find(el => el.data.id === id)
    // }

    // function removeItem(id: number) {
    //     data.value = data.value.filter(_ => _.data.id !== id)
    //     const localDataUpdate = data.value.map(_ => ({ quantity: _.quantity, id: _.data.id }))
    //     localSet('MARKET_5kv_basket', localDataUpdate)
    //     localData.value = localDataUpdate
    // }

    
    // onBeforeMount(() => {
    //     const localStorage = localGet('MARKET_5kv_basket')
    //     if (localStorage) {
    //         const localDataParse = JSON.parse(localStorage) as typeof localData.value
    //         const idCard = [... new Set([...localDataParse.map(_ => _.id)])]
    //         if (idCard.length === localDataParse.length) {
    //             localData.value = localDataParse
    //         } else {
    //             const mapBasket = new Map<number, typeof localData.value[number]>()
    //             for (let i = 0, l = localDataParse.length; i < l; i++) {
    //                 const item = localDataParse[i];
    //                 if (mapBasket.has(item.id)) {
    //                     const mapItem = mapBasket.get(item.id)
    //                     mapBasket.set(item.id, { id: item.id, quantity: mapItem!.quantity + item.quantity })
    //                 } else {
    //                     mapBasket.set(item.id, { id: item.id, quantity: item.quantity })
    //                 }
    //             }
    //             localData.value = [...mapBasket].map(_ => _[1])
    //             localSet('MARKET_5kv_basket', localData.value)
    //         }
    //     }
    // })


    // const res = useFetch('/api/product/get', {
    //     server: false,
    //     method: 'GET',
    //     params: { 'id': localData.value.length ? 'in:' + localData.value.map(_ => _.id).join(',') : '', 'orderBy': 'quantity:desc' },
    //     watch: [localData.value.length],
    //     onResponse({ response }) {
    //         if (response._data?.data) {
    //             resData.value = response._data?.data
    //         }
    //         console.log(response._data)
    //     }
    // })
    
    return {}
})