<template>
<div class="py-6 xl:py-4">
    <div class="flex">
        <nuxt-link to="/" class="text-gray-500">Главная</nuxt-link>
        <nuxt-link v-for="item in route.matched"
        :key="item.meta.title" :to="(item.path.split('/') as RouteLocationRaw)"
        class="flex items-center ml-3">
        <CreateIcon name="arround_6_11" :att="{ class: 'fill-gray-500' }" class="mr-1"/>
        {{ item.meta.title }}</nuxt-link>
    </div>
</div>
</template>

<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
import { RouteLocationRaw } from 'vue-router';

const route = useRoute()
</script>
