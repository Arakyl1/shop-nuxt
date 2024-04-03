export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path.endsWith('/user')) {
        return navigateTo({ path: to.path + '/main' })
    }
    return
}) 