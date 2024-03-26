export default defineNuxtRouteMiddleware((to, from) => {
    if ((!to.query.page || !to.query.limit) && !from.path.startsWith('/catalog')) {
        console.log('work middleware catalog')
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
