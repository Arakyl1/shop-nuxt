import { alertContent } from "@/pinia/store";


export default () => {
    const updateAlertText = (text: string) => {
        const alert = alertContent()
        alert.updateContent(text)
    }

    const addProduct = async(event: string) => {
        try {
            const result = await $fetch('/api/product/create', {
                method: "POST",
                body: event
             })
             updateAlertText('Товар добавлен')
             return result
        } catch (error) {
            updateAlertText('Произошла ощибка, повторите потытку позже')
        }
    }
    const getProduct = async(searchOption: object = {}, name: string = `data${searchOption.where.id}`) => {
        try {
            return await useAsyncData(name, () => $fetch('/api/product/get', {
                method: "POST",
                body: searchOption
            })) 
           
            // return { data, refresh }
        } catch (error) {
            return error 
        }
    }

    const getProductForCategor = async(params: object) => {
        try {
            return await $fetch('/api/product/getForCategot', {
                method: "POST",
                body: params
            })
        } catch (error) {
            console.log(error);
        }
    }

    const putProductData = async(data: object) => {
        try {
            return await $fetch('/api/product/update', {
                method: "PUT",
                body: data
            })
        } catch (error) {
            console.log(error);
        }
    }

    
    return { addProduct, getProduct, getProductForCategor, putProductData }
}