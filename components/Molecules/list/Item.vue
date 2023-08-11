<template>
    <div v-if="data">
        <div class="decor-line"></div>
        <div class="py-5 sm:py-4">
            <div class="flex items-center">
                <h3 class="grow text-white text-xl sm:text-lg">{{ title }}</h3>
                <CreateIcon name="add-plus_16_16" :att="{ class: 'fill-white' }"
                @click="() => active = !active"/>
            </div>
            <ul v-show="active" class="mt-4">
                <li v-for="item in data">
                    <slot>
                        <div class="mb-1.5 text-lg sm:text-base">
                            <NuxtLink :to="item.href" class="text-gray-300"> {{ item.name }}</NuxtLink>
                        </div>
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import CreateIcon from "@/content/icons/create";

withDefaults(defineProps<{
    data: any[]|null,
    title?: string
}>(), {
    title: 'Информация'
})
const active = ref(false)
</script>