<template>
    <ul v-if="data" ref="categor">
        <li v-for="item in data.select" :key="item"
        class=" py-3 border-t border-blue-100">
        <div class="flex items-center justify-between">
            <NuxtLink :to="{ path: '/catalog', query: { ...route.query, categor: item.name, page: 1 } }"
            class="text-white cursor-pointer whitespace-nowrap"
            > {{ item.name }}</NuxtLink>
            <div class="ml-5 cursor-pointer grow flex justify-end"
            @click="$emit('categor', { obj: item, heigth: categor?.clientHeight })">
                <IconArround />
            </div>
        </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { CategorItem } from "@/type/intex";

const { data } = await useAsyncData('select', () => queryContent('/select').only(['select']).findOne())
const categor = ref<HTMLElement | null>(null)
const route = useRoute()

defineEmits<{
  (e: 'categor', id: { obj: CategorItem, heigth: 0 }): void
}>()
</script>