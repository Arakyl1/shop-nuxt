<template>
    <p :class="[style]"><slot></slot></p>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ style?: string}>(), { style: 'bg-blue-500 text-white text-xs absolute -bottom-1 rounded-md px-1'})
</script>