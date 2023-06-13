<template>
    <input type="email" required
    pattern="[-.\w]+@([\w-]+\.)+[\w-]+"
    :value="modelValue"
    @input="e => (e.target as HTMLInputElement).validity.valid ?
        $emit('update:modelValue', (e.target as HTMLInputElement).value) : null"
    class="input--validation"/>
</template>

<script setup lang="ts">
defineProps<{ modelValue: any }>()
defineEmits(['update:modelValue'])
</script>