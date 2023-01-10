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

    const register = (event: Event) => {
        return new Promise<boolean | Error>(async(resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/register', {
                    method: "POST",
                    body: event
                })
              
                updateUser(data.user)
                updateAccess(data.access_token)
                updateAlertText('Пользователь зарегистрирован')
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
        
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
            console.log(error);
            
        }
        // return new Promise<boolean | Error>(async(resolve, reject) => {
        //     try {
                
                
        //         resolve(true)
        //     } catch (error: any) {
        //         reject(error)
        //     }
        // })
    }

    const logout = () => {
        return new Promise<boolean | Error>(async(resolve, reject) => {
            try {
                await $fetch('/api/auth/logout', {method: "POST"})
                updateUser(null)
                updateAccess('')
                resolve(true)
            } catch (error) {
                reject(error.statusMessage)
            }
        })
    }

    const initAuth = async() => {
        try {
            await initRefrechToken();
            await getUset()
            reRefrechAccessToken()
        } catch (error) {
            return error
        }
    }

    const initRefrechToken = () => {
        return new Promise<boolean | Error>(async(resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refrech')
                updateAccess(data)
                resolve(true)
            } catch (error) {
                reject(error.statusMessage)
            }
        })
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

    const getUset = () => {
        return new Promise<void>(async(resolve, reject) => {
            try {
                const access = accessToken();
                const data = await $fetch('/api/auth/user', {
                    headers: {
                        method: "GET",
                        Authorization: `Bearer ${access.accessToken}`
                    }
                })
                updateUser(data)   
                resolve(true)
            } catch (error) {
                reject(error.statusMessage)
            }
        })
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