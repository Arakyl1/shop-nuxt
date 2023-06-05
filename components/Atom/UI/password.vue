<template>
    <input type="password" required autocomplete="on"
    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
    minlength="8" maxlength="25"
    :value="modelValue"
    @input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    class="input--validation" />
</template>

<script setup lang="ts">
defineProps<{ modelValue: any }>()
defineEmits(['update:modelValue'])
</script>