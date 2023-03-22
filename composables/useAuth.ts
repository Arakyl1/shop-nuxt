
import { UserLoginData, UserRegisterData } from "@/type/intex";

export default () => {
    const register = async(event: UserRegisterData) => {
        const { createAlert} = useAlert()
        const { user: _userStore, access: _accessToken } = useStore()
        const { updateUser } = _userStore()
        const { updateAccessToken } = _accessToken()
    
        try {
            const data = await $fetch('/api/auth/register', {
                method: "POST",
                body: event
            })
    
            if (data.message) return createAlert(data.message)
    
            updateUser(data.user || null)
            updateAccessToken(data.access_token || "")
            createAlert('Пользователь зарегистрирован')
            return true
        } catch (error: any) {
            console.log(error);
        }
    }

    const login = async (event: UserLoginData): Promise<true | void> => {
        const { createAlert } = useAlert()
        const { user: _userStore, access: _accessToken } = useStore()
        const { updateUser } = _userStore()
        const { updateAccessToken } = _accessToken()
    
        try {
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: event
            })
      
            if ('message' in data && data.message) return createAlert(data.message)
            
            data.user ? updateUser(data.user) : null
            data.access_token ? updateAccessToken(data.access_token) : null
            createAlert('Вы успешно вошли в свой акаунт')
            return true
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async() => {
        const { user: _userStore, access: _accessToken } = useStore()
        const { updateUser } = _userStore()
        const { updateAccessToken } = _accessToken()
    
        try {
            await $fetch('/api/auth/logout', {method: "POST"})
            updateUser(null)
            updateAccessToken('')
        } catch (error) {
            console.log(error);   
        }
    }

    const data = async() => {
        const { user: _userStore, access: _accessToken } = useStore()
        const { updateUser } = _userStore()
        const { accessToken } = _accessToken()
        
    
        try {
            const data = await $fetch('/api/auth/user', {
                headers: {
                    method: "GET",
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            if (data.message) return new Error('Error')
    
            updateUser(data.user || null)   
        } catch (error) {
            throw new Error('Error')
        }
    }

    const initAuth = async() => {
        const { createAccess, reRefrechAccess } = useToken()
        try {
            await createAccess();
            await data()
            reRefrechAccess()
        } catch (error) {
            console.log(error);
        }
    }
    return { login, logout, register, data, initAuth }
}