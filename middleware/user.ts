export default defineNuxtRouteMiddleware((to, from) => {
    if (to.matched.length === 1) {
        console.log('work middleware')
        return navigateTo({ path: to.path + '/main' })
    }
    return
}) 