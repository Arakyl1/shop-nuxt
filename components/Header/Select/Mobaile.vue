<template>
<div class="fixed w-screen h-screen top-0 z-50 transition-all right-0"
ref="modalMenu">
    <div class="bg-blue-500 h-full pb-8 pt-4 px-4 overflow-y-scroll">
        <img src="@/assets/img/logo.png" alt="logo" class="w-32 mb-4">

        <template v-if="data && !('children' in subcategorList)">
            <ul ref="categor">
                <li v-for="item in data.body" :key="item"
                class=" py-3 border-b border-blue-100">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="{ path: '/catalog', query: { ...route.query, categor: item.name } }"
                    class="text-white cursor-pointer"
                    > {{ item.name }}</NuxtLink>
                    <div class="ml-5 cursor-pointer grow flex justify-end">
                        <IconArround @click="subcategorName = item.name"/>
                    </div>
                </div>
                </li>
            </ul>
        </template>
        <template v-else-if="'children' in subcategorList">
            <ul class="">
                <HeaderSelectAditionalItem v-for="elem in subcategorList.children" :item="elem" :key="elem.name"/>
            </ul>
        </template>
    </div>
</div>
</template>
<script setup lang="ts">
import { ParsedContent } from '@nuxt/content/dist/runtime/types';
import { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import { ArrowFunction, FunctionExpression } from 'typescript';

interface ToucheData {
    x: number | null,
    y: number | null,
    vector: number | null,
    started: boolean,
}

const props = defineProps<{
    updateFun: Function
}>()

const { data }: _AsyncData<Pick<ParsedContent, string>, Error | null> = await useAsyncData('select', () => queryContent('/select').findOne())
const route = useRoute()

const subcategorName = ref<string | null>(null)
const modalMenu = ref<HTMLElement | null>(null)
const toucheData: ToucheData = toucheElemPosition(modalMenu)

const subcategorList = computed(() => data.value &&
    subcategorName.value ? data.value.body.find(el => el.name === subcategorName.value) :
    {}
)

watch(() => toucheData.vector, (newVector) => {
    if (newVector === 1) {
        props.updateFun()
        subcategorName.value = null
    }
})


</script>