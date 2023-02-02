<template>
<div class="flex items-center border rounded py-2 px-4 bg-white">
    <button class="w-4 h-4 relative sm:h-3 sm:w-3"
    :class="{ 'cursor-no-drop': dataQuantity === 0}"
    @click="quanity > 1 ? quanity-- : ''">
        <div :class="style.span"></div>
    </button>

    <p class="text-lg px-4 sm:text-base sm:px-2"
    :class="[dataQuantity === 0 ? 'text-gray-500' : 'text-blue-300']"
    >{{ quanity }}</p>
    
    <button class="w-4 h-4 relative sm:h-3 sm:w-3"
    :class="{ 'cursor-no-drop': dataQuantity === 0}"
    @click="quanity < dataQuantity ? quanity++ : ''">
        <div :class="style.span"></div>
        <div :class="style.span" class="rotate-90"></div>
    </button>
</div>
</template>
<script setup lang="ts">

const props = withDefaults(defineProps<{
    dataQuantity: number, quantityNumber?: number
    }>(), {
        dataQuantity: 0,
        quantityNumber: 1
})

const emit = defineEmits<{
    (e: 'numberOfProducts', value: number): void
}>()

const quanity = ref(props.quantityNumber)
const style = {
    span: 'w-full h-px bg-black-500 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
}

watch(() => quanity.value, (newQuanity) => emit('numberOfProducts', newQuanity))
</script>