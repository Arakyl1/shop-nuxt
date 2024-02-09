<template>
    <Panel :mode="'primary'">
        <TemplatesPageCatalogHeader />
        <Flex :align="'flex-start'" class="gap-8">
            <!-- <div class=" fixed top-1/2 left-0 z-40 transition-all hidden md:block"
                :class="[state ? 'opacity-0' : ' opacity-100']">
                <AtomButtonStandart class="bg-blue-500 aspect-square
                sm:px-2 sm:py-1" @click="visibleFilter(true)">
                    <CreateIcon name="filter_20_20" :att="{ class: 'fill-white' }" />
                </AtomButtonStandart>
            </div> -->
            <div ref="filter" 
            :class="[className['filter']]">
                <Card :container="'xl'" :appearance="'gray'" @scroll.prevent>
                    <Filter/>
                </Card>
            </div> 
            <div class="grow" :class="className['main']">
                <Grid v-show="pending || dataLength" :container="'md'" class="gap-8 w-full">
                    <template v-for="(el,i) in dataLength" :key="el">
                        <CardProduct :data="pending ? null : data.data[i]"/>
                    </template>
                </Grid>
                <Transition name="opacity" >
                    <div v-show="!pending && data && !dataLength">
                        <p class="text-2xl text-gray-500 p-8 lg:text-xl sm:text-lg sm:p-4"
                        >{{ 'nothing found'  }}</p>
                    </div>
                </Transition>
            </div>

        </Flex>
        <Flex :justify="'center'">
            <Card class="visible px-8"><div :style="{ width: '250px' }"></div></Card>
            <Pagination v-if="countItem"
            :total="countItem"
            :range-before="1"
            :range-after="2"
            :size-page="(sizePage as number)"
            :current="activePage"
            @update:current="(e) => updatePage(e, countItem, sizePage)"
            :before-content="true"
            :afterContent="true"
            class="gap-4"
            />
        </Flex>
    </Panel>
</template>

<script setup lang="ts">
import localState from "@/utils/localState";
import Grid from "@/components/UI/Grid/Grid.vue";
import Card from "@/components/UI/Card/Card.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Panel from "@/components/UI/Panel/Panel.vue";
import CardProduct from '@/components/Templates/Card/Product.vue'
import Filter from '@/components/Templates/page__catalog/Filter.vue'
import Pagination from "@/components/UI/Pagination/Pagination.vue";


definePageMeta({
    middleware: ['catalog'],
    title: 'Каталог товаров',
})

const { state, update } = localState({ watch: false })
const filter = ref<HTMLElement | null>(null)
const toucheData = toucheElemPosition(filter)
const mouseData = mouseElemPosition(filter)
const route = useRoute()
const className = useCssModule()
const { activePage, updatePage, getInfoPagination } = paggination()


const sizePage = computed(() =>'limit' in route.query ? Number(route.query.limit) : 12)
const paramsRouteQuery = computed(() => Object.values(route.query).map((el: any) => el.trim()).join('_'))
const countItem = computed(() => data.value?.countItem || 0)
const dataLength = computed(() => pending.value ? sizePage.value : data.value?.data.length)

const { error, data, pending, refresh } = useAsyncData(() => $fetch('/api/product/get', {
    method: 'POST',
    params: { ...route.query,  }
}), {
    'lazy': true,
    transform: (context) => {
        if (context && 'data' in context && 'countItem' in context && Array.isArray(context.data)) {
            return context
        }
        return { data: [], nextPageLength: 0, countItem: 0 }
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

// function prevPage(route: RouteLocationNormalizedLoaded) {
//     return navigateTo({
//         path: route.path,
//         query: {
//             ...route.query,
//             page: +route.query.page! > 1 ? +route.query.page! - 1 : route.query.page
//         }
//     })
// }

// function nextPage(route: RouteLocationNormalizedLoaded) {
//     return navigateTo({
//         path: route.path,
//         query: {
//             ...route.query,
//             page: +route.query.page! + 1
//         }
//     })
// }
</script> 

<style lang="css" module>
.filter {
    width: min-content;
}
.main {
    min-height: 100%;
}
</style>