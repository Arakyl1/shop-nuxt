<template>
<div class="flex">
    <p v-if="sale" :class="style" class="text-black-500 mr-5 sm:mr-3">
        {{ priceTransform(Math.floor(price * 0.9), { currency: 'RUB', style: 'currency' })}}
    </p>
    <p :class="[style, sale ? 'text-gray-300 line-through decoration-gray-300' : 'text-black-500', ]"
        >{{ priceTransform(price, !sale ? { currency: 'RUB', style: 'currency' } : {}) }}
    </p>
</div>
</template>

<script setup lang="ts">
const props = defineProps<{price: number, sale: boolean, style: string}>()

const getOptions = (option: object) =>  new Intl.NumberFormat("ru", {
  minimumFractionDigits: 0,
  ...option
})

const priceTransform = (price: number, option: any) => getOptions(option).format(price)
</script>