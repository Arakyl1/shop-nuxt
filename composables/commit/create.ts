export const create = async(body: object) => {
    try {
        return await $fetch('/api/review/create', {
            method: 'POST',
            body: body
        })
    } catch (error) {
        console.log(error);
    }
}