export default defineNuxtRouteMiddleware((to, from) => {
    if (!to.query.page || !to.query.limit) {
        return navigateTo({
            path: to.path, query: {
                ...to.query,
                page: 1,
                limit: to.query.limit ? to.query.limit : 12
            }
        })
    }
    return
}) 
