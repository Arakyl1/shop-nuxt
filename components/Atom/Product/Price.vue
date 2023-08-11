<template>
    <p>
        <span class="text-black-500 mr-5 sm:mr-3"
        >{{ transformPrice(transformOption.lg, transformOption.style, parseFloat((price * ((100 - discount) /100)).toFixed(2)) ) }}</span>
        <span v-show="discount > 0" class="text-gray-300 line-through decoration-gray-300 text-[0.85em]"
        >{{ transformPrice(transformOption.lg, {}, price)  }}</span>
    </p>
</template>

<script setup lang="ts">

interface Props {
    price: number,
    discount: number
    transformOption?: { lg: string, style: Intl.NumberFormatOptions }
}

const props = withDefaults(defineProps<Props>(), {
    transformOption() {
        return { lg:'ru', style: { currency: 'BYN', style: 'currency' } }
    },
})

function transformPrice(reg:string, option: object, price:number):string {
    return new Intl.NumberFormat(reg, { minimumFractionDigits: 0, ...option }).format(price)
}
</script>