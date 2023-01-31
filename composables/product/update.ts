export const update = async (data: object) => {
    try {
        return await $fetch('/api/product/update', {
            method: "PUT",
            body: data
        })
    } catch (error) {
        console.log(error);
    }
}