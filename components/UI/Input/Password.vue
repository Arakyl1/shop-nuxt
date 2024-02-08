<template>
<Input
    :type="showPassword ? 'password' : 'text'"
    :name="'password'"
    :mode="mode"
    :span="span"
    :icon="{ 'key': !showPassword ? 'hide' : 'view', size: '22_22' }"
    :icon-clickable="true"
    :required="true"
    autocomplete="new-password"
    @update:modelValue="(e) => emit('update:modelValue', e)"
    @icon-click="toggleShowPassword"/>
</template>

<script setup>
import Input from "@/components/UI/Input/Input.vue";
// import { View, Hide } from "@element-plus/icons-vue";

const props = defineProps({
    // стиль оформления input
    mode: {
        type: String,
        validator(value) {
            return ['primary', 'secondary', 'outline'].includes(value)
        }
    },
    // анимерованный placeholder вместо базового
    // если была передано значание для базовго placeholder (эт пропс placeholder)
    // то приоритет отдается базовому 
    span: {
        type: String
    },
    // базовый placeholder
    placeholder: {
        type: String
    }
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

function toggleShowPassword(e) {
    showPassword.value = !showPassword.value
}
</script>