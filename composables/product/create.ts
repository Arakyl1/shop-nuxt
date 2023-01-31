export const create = async(event: string) => {
    try {
        return await $fetch('/api/product/create', {
            method: "POST",
            body: event
         })
    } catch (error) {
        console.log(error);
    }
}
