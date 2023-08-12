
export const favorite = defineStore('favorite', () => {

    const data = ref(new Set<number>([]))

    onBeforeMount(() =>{
        const localStorage = localGet('MARKET_5kv_favorite')
        if (localStorage) {
            const localDataParse = JSON.parse(localStorage) as number[]
            const idCard = new Set([...localDataParse])
            data.value = idCard
            if (idCard.size !== localDataParse.length) {
                localSet('MARKET_5kv_favorite', [...idCard])
            }
        }
    })

    function toggleItem(id: number) {
        if (!data.value.has(id)) {
            data.value.add(id)
        } else {
            data.value.delete(id)
        }
        localSet('MARKET_5kv_favorite', [...data.value])
    }
    const findItem = (id: number) => computed(() => data.value.has(id))

    return { data, toggleItem, findItem }
})
