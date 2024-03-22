import { alert as _alert } from "@/stores/alert";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const storeAlert = _alert()
    const { data } = await useFetch('/api/auth/auth')
    
    if (to.path.startsWith('/auth') && data.value) {
        return navigateTo('/')
    } else if (!data.value && !from.path.startsWith('/auth')) {{
        storeAlert.create({ key: 'MIDDLEWARE_ADD_ROUTER_ERROR' , state: 'error' })
        return navigateTo('/auth')
    }}
})