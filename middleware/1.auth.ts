import { alert as _alert } from "@/stores/alert";

export default defineNuxtRouteMiddleware(async(to, from) => {

    const storeAlert = _alert()
    const { data } = await useFetch('/api/auth/auth')
    
    if (!data.value && !to.path.startsWith('/auth')) {{
        storeAlert.create({ key: 'MIDDLEWARE_ADD_ROUTER_ERROR' , state: 'error' })
        return navigateTo('/auth')
    }}
})