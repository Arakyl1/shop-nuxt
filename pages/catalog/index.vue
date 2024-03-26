<template>
    <Panel :mode="'primary'">
        <Flex :justify="'between'" >
            <Title :tag="'h2'" :text="META.CATALOG.TITLE" class="grow"/>
            <div class="none /md:block">
                <SelectSize />
            </div>
            <Button
            :appearance="'blue'"
            :square="true"
            :icon-left="{ icon: 'filter', size: '24_24' }"
            class="/md:hidden justify-center"
            @click="() => update(true)"/>
        </Flex>
        <Flex :align="'flex-start'" class="gap-8">
            <div ref="filter"
            :class="[className['filter']]" :data-show-filter=state>
                <Card :container="'xl'" :appearance="'gray'" @scroll.prevent class="h-full">
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
                        <p class="text-lg p-8 text-gray-500">{{ PAGE_CATALOG.EMPTY_RESULT_FOR_PRODUCT  }}</p>
                    </div>
                </Transition>
            </div>

        </Flex>
        <Flex :justify="'center'">
            <Card class="visible px-8 none /md:block"><div :style="{ width: '250px' }"></div></Card>
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
import Title from "@/components/UI/Title/Title.vue";
import CardProduct from '@/components/Templates/Card/Product.vue'
import Filter from '@/components/Templates/page__catalog/Filter.vue'
import Button from "@/components/UI/Button/Button.vue";
import SelectSize from '@/components/Templates/page__catalog/SelectSize.vue'
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import { PAGE_META as META, PAGE_CATALOG } from "@/common/C";


definePageMeta({
    middleware: ['catalog'],
    title: META.CATALOG.TITLE,
    keepalive: true
})

const { state, update } = localState({ watch: false })
const filter = ref<HTMLElement | null>(null)
const toucheData = toucheElemPosition(filter)
const mouseData = mouseElemPosition(filter)
const route = useRoute()
const className = useCssModule()
const { activePage, updatePage } = paggination()


const sizePage = computed(() =>'limit' in route.query ? Number(route.query.limit) : 12)
const paramsRouteQuery = computed(() => Object.values(route.query).map((el: any) => el.trim()).join('_'))
const countItem = computed(() => data.value?.countItem || 0)
const dataLength = computed(() => pending.value ? sizePage.value : data.value?.data.length)

const { error, data, pending, refresh } = await useAsyncData(async() => await $fetch('/api/product/get', {
    method: 'POST',
    params: { ...route.query,  }
}), {
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

</script> 

<style lang="css" module>
.filter {
    --widget-filter-width: 300px;
    min-width: var(--widget-filter-width);
    max-width: var(--widget-filter-width);
    width: 100%;
}
.filter fieldset > * {
    width: calc(var(--widget-filter-width) - 2rem - 2rem);
}
.filter > * {
    min-height: 300px;
}
.main {
    min-height: 100%;
}
@media screen and (max-width: 768px) {
    .filter {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        max-width: 100vh;
        height: 100vh;
        z-index: 40;
        overflow: hidden scroll;
        transform: translateX(-110%);
        transition: transform ease-in-out 0.3s;
    }
    .filter[data-show-filter=true] {
        transform: translateX(0);
    }
    .filter fieldset > * {
        width: 100%;
    }
}
</style>