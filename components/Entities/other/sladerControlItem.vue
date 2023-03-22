<template>
    <div>
        <ul class="flex justify-center pt-2">
            <li v-for="(item, index) in data.length" :key="item" class="h-4 aspect-square rounded-full mx-2"
                :class="[indexActiveButton === index ? 'bg-blue-500' : 'bg-blue-100 ']"
                @click="updateScrolLeftSlader(index)"></li>
        </ul>
    </div>
</template>
<script setup lang="ts">
defineProps<{
    indexActiveButton: number,
    updateScrolLeftSlader: (index: number) => void, 
    data: (number | object)[]
}>()
</script>