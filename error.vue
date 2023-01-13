<template>
    <div class="h-screen flex justify-center items-center">
        <ButtomStandart class="bg-blue-500 text-xl text-white"
        @click="handleError">
            Перейти на главную
        </ButtomStandart>
    </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
handleError()
</script>