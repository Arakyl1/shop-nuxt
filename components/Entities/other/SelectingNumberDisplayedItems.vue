<template>
    <select 
        @change="paramsLimitUpdate($event)" :value="route.query.limit">
        <option v-for="item in numders" :key="item" :value="item" class="text-gray-500">{{ item }}</option>
    </select>
</template>

<script setup lang="ts">
const route = useRoute()

const numders = [
    6, 12, 18, 24, 30, 36, 42, 48, 54, 60
]

function paramsLimitUpdate(e: any) {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: 1,
            limit: e.target.value,
        }
    })
}
</script>