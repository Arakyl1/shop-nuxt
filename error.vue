<template>
    <div class="h-screen flex justify-center items-center">
        <!-- <AtomButtonStandart class="bg-blue-500 text-xl text-white"
        @click="handleError">
            Перейти на главную
        </AtomButtonStandart> -->
    </div>
</template>

<script setup>
const props = defineProps({
  error: Error
})

const handleError = () => clearError({ redirect: '/' })
handleError()
</script>