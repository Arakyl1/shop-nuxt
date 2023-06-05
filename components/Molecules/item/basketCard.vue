<template>
    <article class=" py-4 sm:py-2 sm:mb-2" v-if="resData">
        <div class="flex items-center sm:flex-wrap">
            <img :src="changeValueImageSize(resData.image[0].link, { 'heigth': 'h_56' })" alt="image product">
            <div class="pl-6 grow sm:pl-3 sm:w-9/12 sm:mb-2">
                <NuxtLink :to="`/catalog/${resData.id}`"
                    class="text-black-500 mb-1 inline-block text-lg sm:text-base sm:mb-0 ">
                    {{ resData.name }}
                </NuxtLink>
                <p class="text-gray-500 text-lg sm:text-base">
                    {{ resData.art }}
                </p>
            </div>
            <div class="mx-4 sm:grow sm:order-last">
                <AtomTransformPrice :price="resData.price" :sale="resData.sale!"
                :style="'text-xl ld:text-lg md:text-base sm:text-sm'" class="block sm:justify-end"/>
            </div>
            <div class="mr-6 sm:order-last block sm:mx-2">
                <div class="inline-block">
                    <AtomOtherQuantitySelection class="md:py-1 md:px-2 grow-0" :quantity-number="basketData.quantity"
                        :data-quantity="basketData.quantity" />
                </div>
            </div>
            <button type="button" class="">
                <IconClose class="group is-icon-black h-6 w-6 cursor-pointer float-right "
                    @click="basketProd.removeBasketProduct(index)" />
            </button>
        </div>
    </article>
</template>
<script setup lang="ts">
import { basketProduct } from "~~/pinia/basket";
import { BasketItem, ProductCardForSearch } from "@/type/intex";
import { changeValueImageSize } from "@/utils/other";

const props = defineProps<{
    resData: ProductCardForSearch | null,
    basketData: BasketItem,
    index: number
}>()

const basketProd = basketProduct()
</script>