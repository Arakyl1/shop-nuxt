<template>
    <p class="bg-blue-500 text-white text-xs absolute -bottom-1 -right-2 rounded-md px-1"
    >{{ quanity }}</p>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ quanity: number }>(), { quanity: 0 })
</script>