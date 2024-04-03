export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path.endsWith('/tooltip')) {
        return navigateTo({ path: to.path + '/create' })
    }
    return
}) 
