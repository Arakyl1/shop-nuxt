<template>
    <p :class="className['body']">
        <span class="text-black-500"
        >{{ transformPrice(transformOption.lg, transformOption.style, parseFloat((price * ((100 - discount) /100)).toFixed(2)) ) }}</span>
        <span v-show="discount" :class="className['discount']"
        >{{ transformPrice(transformOption.lg, {}, price)  }}</span>
    </p>
</template>

<script setup lang="ts">

interface Props {
    price: number,
    discount: boolean
    transformOption?: { lg: string, style: Intl.NumberFormatOptions }
}

const props = withDefaults(defineProps<Props>(), {
    transformOption() {
        return { lg:'ru', style: { currency: 'BYN', style: 'currency' } }
    },
})

const className = useCssModule()


function transformPrice(reg:string, option: object, price:number):string {
    return new Intl.NumberFormat(reg, { minimumFractionDigits: 0, ...option }).format(price)
}
</script>

<style lang="css" module>
.body {
    display: flex;
    align-items: flex-end;
    gap: 1.25rem;
}
.discount {
    color: var(--gray-300);
    text-decoration-line: line-through;
    text-decoration-color: var(--gray-300);
    font-size: 0.85em;
}

@media screen and (max-width: 600px) {
    .body {
        gap: 0.75rem;
    }
}
</style>