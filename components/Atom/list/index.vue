<template>
    <select class="p-2 rounded-md text-gray-300 w-full focus-visible:outline-none">
        <template v-if="list">
            <option v-for="item in list" :key="item" class="text-gray-300">
                {{ item }}
            </option>
        </template>
        <option v-else class="text-gray-300"><slot></slot></option>
    </select>
</template>
<script setup lang="ts">
defineProps<{ list: (string | number)[]}>()
</script>