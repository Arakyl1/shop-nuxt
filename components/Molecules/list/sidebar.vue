<template>
    <ul ref="categor">
        <template v-if="data">
            <li v-for="item in data" :key="item.id" class="py-3 border-t border-blue-100" :data-categor-id="item.id">
                <div class="flex items-center justify-between">
                    <NuxtLink :to="{ path: '/catalog', query: { ...route.query, categor: item.id, page: 1 } }"
                        class="text-white cursor-pointer whitespace-nowrap"> {{ item.value }}</NuxtLink>
                    <div class="ml-5 cursor-pointer grow flex justify-end">
                        <CreateIcon name="arround_6_11" :att="{ class: 'fill-white' }" />
                    </div>
                </div>
            </li>
        </template>
    </ul>
</template>

<script setup lang="ts" generic="T extends { id: number, name: string, value: string }">
import CreateIcon from "@/content/icons/create";


interface Props {
    data: T[] | null
}
const props = defineProps<Props>()
const categor = ref<HTMLElement | null>(null)
const route = useRoute()
</script>