<template>
<div class="py-6 xl:py-4">
    <div class="flex">
        <nuxt-link to="/" class="text-gray-500">Главная</nuxt-link>
        <nuxt-link v-for="item in route.matched"
        :key="item.meta.title" :to="item.path.split('/')"
        class="flex items-center ml-3">
        <icon-arround class="path__icon mr-1"/>
        {{ item.meta.title }}</nuxt-link>
    </div>
</div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style lang="css">
.path__icon > path{
    fill: #9c9c9c;
}
</style>