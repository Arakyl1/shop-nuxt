<template>
    <slot v-bind="{ prevPage, nextPage }"></slot>
</template>
<script setup lang="ts">
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