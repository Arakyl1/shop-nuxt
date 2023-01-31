<template>
<div>
<SharedUIModalTransition :active="stage" class="model-style">
    <SharedUIModalContent :title="'Ваша корзина'" :text-default="'Ваша корзина пуста'" :hude-window="updateStage">
        <ul v-if="basket.length">
            <template v-for="(item, index) in basket" :key="item.id">
                <slot v-bind="{ item, index}"></slot>
            </template>
        </ul>
    </SharedUIModalContent>
</SharedUIModalTransition>
</div>
</template>

<script setup lang="ts">

import ShowContent from "~~/utils/ShowContent";

const { stage, updateStage } = ShowContent();
const { basket} = useBasket()

onBeforeMount(() => {
  window.addEventListener('showModalBasketProduct', updateStage)
})
</script>