export const getInfo = async(searchOption: object = {}) => {
    try {
        return await $fetch('/api/product/get', {
            method: "POST",
            body: searchOption
        })
    } catch (error) {
        return error 
    }
}