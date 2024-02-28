import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";

export default defineNuxtRouteMiddleware((to, from) => {
    const storeUser = _user()
    const storeAlert = _alert()
    const { data: userData, anonim } = storeToRefs(storeUser)

    if (anonim.value || !userData.value) {
        storeAlert.create({ key: 'MIDDLEWARE_ADD_ROUTER_ERROR' , state: 'error' })
        return abortNavigation()
    } else {
        return navigateTo('/auth')
    }
})