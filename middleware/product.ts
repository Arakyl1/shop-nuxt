export default defineNuxtRouteMiddleware((to, from) => {
    if (to.params.id && from.params.id) {
        return abortNavigation()
    }
    return
})