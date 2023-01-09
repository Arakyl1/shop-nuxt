
export default () => {
    const addProduct = async(event: string) => {
        try {
            const result = await $fetch('/api/product/create', {
                method: "POST",
                body: event
             })
             return result
        } catch (error) {
            alert(error.statusMessage)
        }
    }
    // const getProduct = async(searchOption: object = {}, name: string = `data${searchOption.where.id}`) => {
    //     try {
    //         const { data, refresh } = await useAsyncData(name, () => $fetch('/api/product/get', {
    //             method: "POST",
    //             body: searchOption
    //         })) 
    //         return { data, refresh}
    //     } catch (error) {
    //         return error 
    //     }
    // }

    // const getProductForCategor = async(params: object) => {
    //     try {
    //         const data = ref(null)
    //         data.value = await $fetch('/api/product/getForCategot', {
    //             method: "POST",
    //             body: params
    //         })
    //         return data
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const getMakerlist = async(params: object) => {
    //     const makerList = ref<Set<string>>(new Set([]))

    //     const makerListModifi = () => [...makerList.value].map(el => Object.assign({}, { name: el, value: el}))

    //     try {
    //         const res = await $fetch('/api/product/makerList', {
    //             method: "POST",
    //             body: params
    //         })

    //         res.forEach(el => {
    //             makerList.value.add(el.maker)
    //         });

    //         return makerListModifi()
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const putProductData = async(data: object) => {
    //     try {
    //         const res = await $fetch('/api/product/update', {
    //             method: "PUT",
    //             body: data
    //         })
    //         return true
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return { addProduct }
    // return { addProduct, getProduct, getProductForCategor, putProductData, getMakerlist }
}