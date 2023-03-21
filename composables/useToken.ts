import jwtDecode from "jwt-decode";

export default () => {
    const createAccess = async() => {
        const { access: _aceesToeken } = useStore()
        const { updateAccessToken } = _aceesToeken()
        try {
            const data = await $fetch('/api/auth/refrech')
           
            if ('message' in data && data.message) {
                console.log(data.message);
                return 
            }
         
            updateAccessToken(data.accessToken ? data.accessToken : '')
        } catch (error) {
            console.log(error);
        }
    }

    const reRefrechAccess = () => {
    const { access: _aceesToeken } = useStore()
    const { accessToken } = _aceesToeken()
    if (!accessToken.value) {
        return
    }
    const jwt = jwtDecode(accessToken.value)
    
    const newRefrecmTime = jwt.exp - 60000
    setTimeout(() => {
        createAccess()
        reRefrechAccess()
    }, newRefrecmTime)
    
}
    return { createAccess, reRefrechAccess }
}