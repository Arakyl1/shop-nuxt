import jwtDecode from "jwt-decode";

export default () => {
    const createAccess = async () => {
        const { access: _aceesToeken } = useStore()
        const { updateAccessToken } = _aceesToeken()
        try {
            const headers  = useRequestHeaders(['cookie']);
            
            const { data } = await useFetch('/api/auth/refrech', { headers })            
            const _data = unref(data)
            if (_data ) {
                if ('message' in _data && _data.message) {
                    console.log(_data.message);
                    return
                }             
                updateAccessToken(_data.accessToken || '')
            }
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