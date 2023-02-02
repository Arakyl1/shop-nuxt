<template>
<div class="flex">
    <p v-if="sale" :class="style" class="text-black-500 mr-5 sm:mr-3">
        {{ transformPrice("ru", { currency: 'RUB', style: 'currency' }, Math.floor(price * 0.9))}}
    </p>
    <p :class="[style, sale ? 'text-gray-300 line-through decoration-gray-300' : 'text-black-500', ]"
        >{{ transformPrice('ru', !sale ? { currency: 'RUB', style: 'currency' } : {}, price) }}
    </p>
</div>
</template>

<script setup lang="ts">
const props = defineProps<{price: number, sale: boolean, style: string}>()
</script>