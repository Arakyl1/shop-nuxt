<template>
<div>
    <div class="flex mb-6 lg:mb-4 items-center">
        <h2 class="text-3xl grow lg:text-2xl sm:text-xl"><slot></slot></h2>
        <div class="flex">
            <SharedUIButtomArround @click="prevItem" class=" -scale-100 group big xl:py-3 sm:py-2" />
            <SharedUIButtomArround @click="nextItem" class="ml-5  group big xl:py-3 xl:ml-4 sm:py-2" />
        </div>
    </div>
    <div class="decor-line mb-8 lg:mb-6"></div>
</div>
</template>

<script setup lang="ts">
defineProps<{ prevItem: () => void, nextItem: () => void }>()
</script>