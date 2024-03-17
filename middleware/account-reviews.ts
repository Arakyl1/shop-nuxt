export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path.endsWith('/reviews')) {
        return navigateTo({ path: to.path + '/all' })
    }
    return
}) 
