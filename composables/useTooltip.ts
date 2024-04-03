export default () => {

    const { handleResponse } = useResponse()

    const create = async(body: string) => {
        try {
            useFetch('/api/admin/tooltip/create', {
                method: 'POST',
                body,
                server: true,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                onResponse({ response }) {
                    handleResponse(response._data)
                },
            })
            return true
        } catch (error) {
            console.log(error);
        }
    }

    return { create }
}