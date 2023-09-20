<template>
    <div>
        <div class="flex">
            <div class="flex items-center" v-show="data.children.length">
                <AtomButtonStandart class="bg-black-500 mr-3 rounded p-1" @click="() => { active = !active }">
                    <CreateIcon name="add-plus_16_16" :att="{ class: 'fill-white' }" />
                </AtomButtonStandart>
            </div>
            <div v-show="!data.children.length" class="w-9"></div>
            <NuxtLink class="text-white grow"
                :to="{ path: '/catalog', query: { categor: data.id, limit: $route.query.limit || 12, page: 1 } }">{{
                    data.value }}</NuxtLink>
        </div>
        <div v-if="'children' in data && Array.isArray(data.children) && data.children.length">
            <ul v-show="active" class="pl-8 pt-3">
                <li v-for="item in data.children" :key="item.id" class="mb-2 text-white last:mb-0">
                    <NuxtLink
                        :to="{ path: '/catalog', query: { categor: item.id, limit: $route.query.limit || 12, page: 1 } }">
                        {{ item.value }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts" generic="T extends {
    name: string,
    id: number,
    children: { name: string, id: number }[]
}">

import CreateIcon from "@/content/icons/create";

defineProps<{ data: T }>()

const active = ref<boolean>(false)
</script>