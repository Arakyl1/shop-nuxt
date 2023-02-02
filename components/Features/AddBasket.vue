<template>
    <slot v-bind="{ addBasketProduct }"></slot>
</template>

<script setup lang="ts">
import { basketProduct } from "@/pinia/basket";

interface ItemBasket {
    id: number,
    quantity: number,
    price: number
}
// const props = withDefaults(defineProps<{
//     id: number,
//     quantity?: number,
//     prise: number,
// }>(), { quantity: 1 })

const store = basketProduct()
const { createAlert } = useAlert()

// methods
function addBasketProduct(item:ItemBasket) {
    if (store.findProductInBasket(item.id) === -1) {
        store.addBasketProduct(item)
        createAlert('Товар добавлен в корзину')
    } else {
        createAlert('Этот товар уже в ващей корзине')
    }

}
</script>