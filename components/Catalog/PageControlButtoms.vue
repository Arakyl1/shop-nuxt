<template>
    <div class="flex">
        <div class="w-1/4 md:hidden"></div>
        <div class="w-3/4 flex justify-center md:w-full">
            <ButtomArround @click="prevPage" :disabled="+route.query.page === 1" class="-scale-x-100 mr-32"/>
            <ButtomArround @click="nextPage" :disabled="!activeButtomNext"/>
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{ activeButtomNext: number }>()

const route = useRoute()

function prevPage() {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: +route.query.page > 1 ? +route.query.page - 1 : route.query.page
        }
    })
}

function nextPage() {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: +route.query.page + 1
        }
    })
}
</script>