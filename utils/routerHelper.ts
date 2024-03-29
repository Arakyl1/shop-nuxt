import { RouteLocation } from "vue-router";
import { RouteLocationPathRaw, Router } from "vue-router";

export const isThisPage = (route: RouteLocation, page: string) => route.path === page
export const isProductCardPage = (route: RouteLocation) => route.path.startsWith('/catalog/')