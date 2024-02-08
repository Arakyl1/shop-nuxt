<template>
    <div>
        <TemplatesPageCatalogHeader />
        <div class="flex -mx-4 md:relative mb-8 min-h-[90vh] sm:-mx-2">
            <!-- <div class=" fixed top-1/2 left-0 z-40 transition-all hidden md:block"
                :class="[state ? 'opacity-0' : ' opacity-100']">
                <AtomButtonStandart class="bg-blue-500 aspect-square
                sm:px-2 sm:py-1" @click="visibleFilter(true)">
                    <CreateIcon name="filter_20_20" :att="{ class: 'fill-white' }" />
                </AtomButtonStandart>
            </div> -->
            <div ref="filter" 
            :class="[className['filter']]">
                <div class="bg-gray-100 px-4 py-8 xl:px-3 xl:py-6 rounded-md md:min-h-full" @scroll.prevent>
                    <TemplatesPageCatalogFilter />
                </div>
            </div>
            <TemplatesPageCatalogGalletyItems :data="!pending && data ? data.data : []" :pending="pending" />
        </div>
        <div class="flex mb-20">
            <div class="w-1/4 md:hidden"></div>
            <div class="w-3/4 flex justify-center md:w-full">
                <AtomButtonArround @click="prevPage(route)" :disabled="route.query.page ? (+route.query.page === 1) : false"
                    class="-scale-x-100 mr-32" />
                <AtomButtonArround @click="nextPage(route)" :disabled="data?.nextPageLength === 0" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
import { RouteLocationNormalizedLoaded } from "vue-router";
import localState from "@/utils/localState";


definePageMeta({
    middleware: ['catalog'],
    title: 'Каталог товаров',
    keepalive: true
})

const { state, update } = localState({ watch: false })
const filter = ref<HTMLElement | null>(null)
const toucheData = toucheElemPosition(filter)
const mouseData = mouseElemPosition(filter)
const route = useRoute()
const className = useCssModule()

const paramsRouteQuery = computed(() => Object.values(route.query).map((el: any) => el.trim()).join('_'))

const { error, data, pending, refresh } = useAsyncData(() => $fetch('/api/product/get', {
    method: 'POST',
    params: { ...route.query,  }
}), {
    'lazy': true,
    transform: (context) => {
        if (context && 'data' in context && 'nextPageLength' in context && Array.isArray(context.data)) {
            return context
        }
        return { data: [], nextPageLength: 0 }
    }
})



watch(() => toucheData.vector, (newVector) => {
    if (newVector === 3) {
        visibleFilter(false)
    }
})

watch(() => mouseData.vector, (newVector) => {
    if (newVector === 3) {
        visibleFilter(false)
    }
})

watch(() => paramsRouteQuery.value, () => {
    setTimeout(() => {
        refresh()
    }, 0);
})



function visibleFilter(state: boolean) {
    if (state) {
        update(true)
        if (document) {
            document.body.style.overflow = 'hidden'
        }
    } else {
        update(false)
        if (document) {
            document.body.style.overflow = 'auto'
        }
    }
}

function prevPage(route: RouteLocationNormalizedLoaded) {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: +route.query.page! > 1 ? +route.query.page! - 1 : route.query.page
        }
    })
}

function nextPage(route: RouteLocationNormalizedLoaded) {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: +route.query.page! + 1
        }
    })
}
</script> 

<style lang="css" module>
.filter {
    width: 25%;
}
</style>