<template>
<ButtomStandart
    class="flex bg-blue-500 text-white justify-center items-center"
    @click="addBasket">
    <IconBasketSmall :style="'fill-white'" class="mr-3 group-[.is-icon]:sm:h-4"/>
    В корзину
</ButtomStandart>
</template>

<script setup lang="ts">
import { basketProduct } from "@/pinia/store";

const props = withDefaults(defineProps<{ id: number, quantity?: number}>(), { quantity: 1 })

const store = basketProduct()

function addBasket() {
    store.addBasketProduct({ id: props.id, quantity: props.quantity })
}
</script>