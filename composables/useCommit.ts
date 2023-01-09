
export default () => {
    const addReviewProduct = async(body: object) => {
        try {
            const data = await $fetch('/api/review/create', {
                method: 'POST',
                body: body
            })
            return data
        } catch (error) {
            console.log(error);
        }
    }
    return { addReviewProduct }
}