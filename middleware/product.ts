export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== from.path) {
        return navigateTo({ ...to, meta: { ...to.meta, newWindow: true } })
    }
    return
})