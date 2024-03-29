<template>
    <article class="py-4 w-full">
        <Flex class="gap-6">
             <Image alt="image product" class="h-12" :square="true"
            :src="changeValueImageSize(data.card.image[0].link,
                { 'heigth': 'h_56', 'bgrem': 'co_white,e_make_transparent:1' })"/>
        
            <div class="grow" :class="className['product-name']">
                <Button
                :tag="'nuxt-link'"
                :to="`/catalog/${data.cardId}`"
                :text="data.card.name"
                :mode="'link'"
                target="_blank"
                class="text-md"
                rel="noopener"/>
                <p class="text-gray-500 text-md ">{{ data.card.art }}</p>
            </div>
            <div class="none /md:block">
                <ProductPrice
                class="text-base"
                :price="data.card.price"
                :discount="data.card.discount > 0" />
            </div>
            <div class="none /md:block">
                <Counter
                :value="data.count"
                :max-value="data.card.quantity"
                :class="className['counter']"/>
            </div>
            <Button
            :appearance="'gray-icon'"
            :icon-left="{ icon: 'close', 'size': '16_16' }"
            @click.stop="remove({ 'item_id': data.id })"/>
        </Flex>
    </article>
</template>

<script setup lang="ts" generic="T">

import Image from "@/components/UI/Image/Image.vue";
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import ProductPrice from "@/components/Templates/Product/Price.vue";
import Counter from "@/components/UI/Counter/Counter.vue";
import type { BasketItem } from "@/type/intex";

const props = defineProps<{
    data: BasketItem
}>()

const { remove } = useBasket()
const className = useCssModule()

</script>

<style lang="css" module>
@media (max-width: 768px) {
    .product-name > * {
        text-align: start;
        font-size: var(--text-sm) !important;
    }
    .product-name > button> p {
        white-space: wrap;
    }
}
</style>