<template>
    <div>
        <ul :class="[containerClass]">
            <li v-for="(item, index) in data.length" :key="item"
                :class="[itemClass, indexActiveButton === index ? itemActiveState : itemBaseState]"
                @click="updateScrolLeftSlader(index)"></li>
        </ul>
    </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
    indexActiveButton: number,
    updateScrolLeftSlader: (index: number) => void, 
    data: any[],
    containerClass?: string,
    itemClass?: string,
    itemBaseState?: string,
    itemActiveState?: string
}>(), {
    containerClass: 'flex justify-center pt-2',
    itemClass: 'h-4 aspect-square rounded-full mx-2',
    itemBaseState: 'bg-blue-100',
    itemActiveState: 'bg-blue-500'
})
</script>