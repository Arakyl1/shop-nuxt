import { error } from "console";
import jwtDecode from "jwt-decode";
import { userActive, accessToken, alertContent } from "~~/pinia/store";

export default () => {

    const updateUser = (data: object | null) => {
        const user = userActive();
        user.updateActiveUser(data)
    }
    const updateAccess = (data: string) => {
        const access = accessToken();
        access.updateAccessToken(data)
    }

    const updateAlertText = (text: string) => {
        const alert = alertContent()
        alert.updateContent(text)
    }

    const register = async(event: Event) => {
        try {
            const data = await $fetch('/api/auth/register', {
                method: "POST",
                body: event
            })
          
            updateUser(data.user)
            updateAccess(data.access_token)
            updateAlertText('Пользователь зарегистрирован')
            return true
        } catch (error: any) {
            updateAlertText(await error.statusMessage)
            // updateAlertText('Возникла ощибка, повторите попытку позже')
        }
    }

    const login = async (event: Event) => {
        try {
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: event
            })
            updateUser(data.user)
            updateAccess(data.access_token)
            updateAlertText('Вы успешно вошли в свой акаунт')
            return true
        } catch (error) {
            updateAlertText('Проверьте введенные данные')
        }
    }

    const logout = async() => {
        try {
            await $fetch('/api/auth/logout', {method: "POST"})
            updateUser(null)
            updateAccess('')
        } catch (error) {
            console.log(error);   
        }
    }

    const initAuth = async() => {
        try {
            await initRefrechToken();
            await getUset()
            reRefrechAccessToken()
        } catch (error) {
            console.log(error);
        }
    }

    const initRefrechToken = async() => {
        try {
            const data = await $fetch('/api/auth/refrech')
            updateAccess(data)
        } catch (error) {
            throw error
        }
    }

    const reRefrechAccessToken = () => {
        const access = accessToken();
        if (!access.accessToken) {
            return
        }
        const jwt = jwtDecode(access.accessToken)
        
        const newRefrecmTime = jwt.exp - 60000
        setTimeout(() => {
            initRefrechToken()
            reRefrechAccessToken()
        }, newRefrecmTime)
        
    }

    const getUset = async() => {
        try {
            const access = accessToken();
            const data = await $fetch('/api/auth/user', {
                headers: {
                    method: "GET",
                    Authorization: `Bearer ${access.accessToken}`
                }
            })
            updateUser(data)   
        } catch (error) {
            throw error
        }
    }

    const getUsetInfo = async(event) => {
        try {
            const data = await $fetch('/api/auth/userInfo', {
                method: 'POST',
                body: event
            })
            return data
        } catch (error) {
            console.log(error);
        }
    }

    return { login, initAuth, logout, register, getUsetInfo }
}