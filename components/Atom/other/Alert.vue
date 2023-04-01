<template>
    <div v-show="alertActive"
    class="fixed top-5 right-5 shadow-md shadow-gray-300 z-50">
        <div class="bg-white px-4 py-2 w-min h-min rounded">
            <p class="text-blue-500 sm:text-sm whitespace-nowrap">{{ content }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { content, alertActive } = useAlert()
</script>