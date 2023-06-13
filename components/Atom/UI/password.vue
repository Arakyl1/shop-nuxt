<template>
    <input type="password" required autocomplete="on"
    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
    minlength="8" maxlength="25"
    class="input--validation"
    :value="modelValue"
    @input="e => (e.target as HTMLInputElement).validity.valid ?
        $emit('update:modelValue', (e.target as HTMLInputElement).value) : null"/>
</template>

<script setup lang="ts">
defineProps<{ modelValue: any }>()
defineEmits(['update:modelValue'])
</script>