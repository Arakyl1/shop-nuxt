<template>
<div>
<button type="button"
    class="cursor-pointer focus-visible:outline-0 relative"
    @click="updateStage($event)">
    <ClientOnly>    
        <IconBasket :update-class="!!basket.length"/>
        <OtherProductLengthArray :quanity="basket.length"/>
    </ClientOnly>
</button>
<OtherModalTransition :active="stage" class="model-style">
    <OtherModalContent :title="'Ваша корзина'" :text-default="'Ваша корзина пуста'" :hude-window="updateStage">
        <ul v-if="basket.length">
            <ProductCardBasket v-for="(item, index) in basket" :key="item.id" :item="item" :index="index"/>
        </ul>
    </OtherModalContent>
</OtherModalTransition>
</div>
</template>

<script setup lang="ts">
import { basketProduct } from "@/pinia/store";
import { storeToRefs } from "pinia";
import ShowContent from "~~/utils/ShowContent";

const { stage, updateStage } = ShowContent();
const basketProd = basketProduct()

const { basket } = storeToRefs(basketProd);

</script>