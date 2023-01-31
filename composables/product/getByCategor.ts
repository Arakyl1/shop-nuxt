export const getByCategor = async(params: object) => {
    try {
        return await $fetch('/api/product/getForCategot', {
            method: "POST",
            body: params
        })
    } catch (error) {
        console.log(error);
    }
}
