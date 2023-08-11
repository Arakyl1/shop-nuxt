import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";

export default defineNuxtRouteMiddleware((to, from) => {
    const storeUser = _user()
    const storeAlert = _alert()
    const { data: userData } = storeToRefs(storeUser)

    if (!userData.value) {
        storeAlert.create({ text: 'Для перехода на эту страницу, авторизируйтесь', state: 'error' })
        return abortNavigation()
    }
})