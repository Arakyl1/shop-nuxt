<template>
<Input
    :type="showPassword ? 'text' : 'password'"
    :name="'password'"
    :icon="{ 'icon': showPassword ? 'hide' : 'view', size: '22_22' }"
    :icon-clickable="true"
    :required="true"
    
    v-bind="{ ...props }"
    @update:modelValue="(e) => emit('update:modelValue', e)"
    @icon-click="toggleShowPassword"/>
</template>
<!-- aria-autocomplete="list" -->
<script setup lang="ts">
import { default as Input, type Props as InputProps } from "@/components/UI/Input/Input.vue";

interface Props extends Pick<InputProps, 'autocomplete'|'disabled'|'placeholder'|'span'|'pattern'|'mode'> {}
const props = withDefaults(defineProps<Props>(), { autocomplete: 'new-password' })

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

function toggleShowPassword(e) {
    showPassword.value = !showPassword.value
}
</script>

<style lang="css">
input[type=password]::-ms-reveal,
input[type=password]::-ms-clear
{
    display: none;
}

</style>