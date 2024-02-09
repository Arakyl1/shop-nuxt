<template>
    <article class=" py-4 sm:py-2 sm:mb-2" v-if="data">
        <div class="flex items-center sm:flex-wrap">
            <img :src="changeValueImageSize(data.image[0].link, { 'heigth': 'h_56', 'bgrem': 'co_white,e_make_transparent:1' })" alt="image product">
            <div class="pl-6 grow sm:pl-3 sm:w-9/12 sm:mb-2">
                <NuxtLink :to="`/catalog/${data.id}`"
                    class="text-black-500 mb-1 inline-block text-lg sm:text-base sm:mb-0 ">
                    {{ data.name }}
                </NuxtLink>
                <p class="text-gray-500 text-lg sm:text-base">
                    {{ data.art }}
                </p>
            </div>
            <div class="mx-4 sm:grow sm:order-last">
                <!-- <AtomProductPrice :price="data.price" :discount="data.discount"
                :style="'text-xl ld:text-lg md:text-base sm:text-sm'" class="block sm:justify-end"/> -->
            </div>
            <div class="mr-6 sm:order-last block sm:mx-2">
                <div class="inline-block">
                    <AtomOtherSelectionQuantity class="md:py-1 md:px-2 grow-0" :quantity-number="basketData.quantity"/>
                </div>
            </div>
            <button type="button" class="">
                <CreateIcon name="close_16_16" class="cursor-pointer float-right"
                :att="{ class: 'fill-red-500' }"
                @click.stop="storeBasket.removeItem(data.id)"/>
    
            </button>
        </div>
    </article>
</template>
<script setup lang="ts">
import { basket as _basket } from "@/stores/basket";
import { BasketItem, ProductCardBase } from "@/type/intex";
import { changeValueImageSize } from "@/utils/other";
import CreateIcon from "@/content/icons/create";

const props = defineProps<{
    data: ProductCardBase | null,
    basketData: BasketItem,
    index: number
}>()

const storeBasket = _basket()
</script>