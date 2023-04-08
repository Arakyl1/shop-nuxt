<template>
<div class="flex">
    <p v-if="sale" :class="style" class="text-black-500 mr-5 sm:mr-3">
        {{ transformPrice(transformOption.lg, transformOption.style, Math.floor(price * 0.9))}}
    </p>
    <p :class="[style, sale ? 'text-gray-300 line-through decoration-gray-300' : 'text-black-500', ]"
        >{{ transformPrice(transformOption.lg, !sale ? transformOption.style : {}, price) }}
    </p>
</div>
</template>

<script setup lang="ts">

interface Props {
    price: number,
    sale: boolean,
    style: string,
    transformOption?: { lg: string, style: Intl.NumberFormatOptions }
}

const props = withDefaults(defineProps<Props>(), {
    transformOption() {
        return { lg:'ru', style: { currency: 'RUB', style: 'currency' } }
    },
})
</script>