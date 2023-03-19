<template>
    <input type="password" :class="[!passwordValid ? 'bg-rose-200' : 'bg-indigo-300']" autocomplete="on"
        v-model="password" />
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'password', value: string): void
}>()
const password = ref<string>('')

const passwordValid = computed(() => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g.test(password.value)
})
watch(() => password.value, (newValue) => {
    if (passwordValid.value) {
        emit('password', newValue)
    }
})
</script>