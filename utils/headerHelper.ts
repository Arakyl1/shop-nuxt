import { RouteLocationNormalizedLoaded } from "vue-router";

export function getBaseCategorRoute(item: number, route: RouteLocationNormalizedLoaded): RouteLocationNormalizedLoaded {
    return ({ path: '/catalog', query: { categor: item, page: 1, limit: route.query?.limit || 12   } })
}