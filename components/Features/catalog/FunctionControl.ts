import { RouteLocationNormalizedLoaded } from "vue-router";
// const route = useRoute()

export function prevPage(route: RouteLocationNormalizedLoaded) {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: +route.query.page! > 1 ? +route.query.page! - 1 : route.query.page
        }
    })
}

export function nextPage(route: RouteLocationNormalizedLoaded) {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: +route.query.page! + 1
        }
    })
}