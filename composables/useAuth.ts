import { alert as _alert } from "@/stores/alert";
import { user as _user } from "@/stores/user"
import { H3Event, EventHandlerRequest } from 'h3'


export default () => {
    const storeAlert = _alert()
    const storeUser = _user()

    function handleResponse(response: any) {
        if (response.status > 400) {
            handleResponseError(response._data)
        } else {
            handleResponseOk(response._data)
        }
    }

    function handleResponseOk(response: { [x: string]: any; }) {
        if (response) {
            const firstKey = Object.keys(response)[0]
            storeUser.update(response[firstKey])
        }
    }

    function handleResponseError(responseErr: { message: any; }) {
        if (responseErr) {
            storeAlert.create({ key: responseErr.message, state: 'error' }) 
        }
    }

    type RegisterData = { email: string, password: string }
    const register = async<T extends RegisterData>(body: T) => { 
        try {
            useFetch('/api/auth/register', {
                method: "POST",
                body: body,
                server: true,
                onResponse({ response }) {
                    handleResponse(response)
                },
            })
        } catch (error: any) {
            console.log(error);
        }
    }

    type LoginData = { username: string, email?: string, password: string }
    const login = async<T extends LoginData>(body: T) => {
        try {
            useFetch('/api/auth/login', {
                method: 'POST',
                body: body,
                server: true,
                onResponse({ response }) {
                    handleResponse(response)
                },
            
            })
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async() => {    
        try {
           await useFetch('/api/auth/logout', {
            method: "GET",
            server: true,
            onResponse({ response }) {
                handleResponse(response)
            }
        })

        //    _setCookie(event,'refrech_token', '')
        } catch (error) {
            console.log(error);   
        }
    }

    const initAuth = async(event: H3Event<EventHandlerRequest>) => {
        await useAsyncData(() => fetchWithCookie(event, '/api/auth/auth', {
            retry: 3,
            onResponse({ response }) {
                handleResponse(response)
            },
        }))
    }
    
    return { login, logout, register, initAuth }
}