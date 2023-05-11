<template>
    <div>
        <ul :class="[containerClass]">
            <li v-for="(item, index) in data" :key="item"
                @click="updateScrolLeftSlader(index)"
                :class="[itemClass]">
                <slot v-bind="{ item, index, indexActiveButton }">
                    <div :class="['h-4 aspect-square rounded-full mx-2', indexActiveButton === index ? 'bg-blue-500' : 'bg-blue-100']"></div>
                </slot>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
    indexActiveButton: number,
    updateScrolLeftSlader: (index: number) => void, 
    data: number | any[],
    containerClass?: string,
    itemClass?: string,
}>(), {
    containerClass: 'flex justify-center pt-2',
    itemClass: 'aspect-square',
})
</script>