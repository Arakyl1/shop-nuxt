export default defineNuxtRouteMiddleware((to, from) => {
    const { user: _user } = useStore()
    const { userData } = _user()
    const { createAlert } = useAlert()

    if (!userData.value) {
        createAlert('Для перехода на эту страницу, авторизируйтесь')
        return abortNavigation()
    }
})