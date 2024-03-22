export default defineNuxtRouteMiddleware((to, from) => {
    if (to.matched.length === 1) {
        return navigateTo({ path: to.path + '/main' })
    }
    return
}) 