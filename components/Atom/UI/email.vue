<template>
        <input type="email" required
        pattern="[-.\w]+@([\w-]+\.)+[\w-]+"
        :value="modelValue"
        @input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
        class="input--validation"/>
</template>

<script setup lang="ts">
defineProps<{ modelValue: any }>()
defineEmits(['update:modelValue'])
</script>