<template>
    <li class=" py-4 sm:py-2 sm:mb-2" v-if="data">
        <div class="flex items-center sm:flex-wrap">
            <img :src="data.img" alt="image product" class="w-14 sm:w-10">
            <div class="pl-6 grow sm:pl-3 sm:w-9/12 sm:mb-2">
                <NuxtLink :to="`/catalog/${item.id}`"
                    class="text-black-500 mb-1 inline-block text-lg sm:text-base sm:mb-0 ">
                    {{ data.name }}
                </NuxtLink>
                <p class="text-gray-500 text-lg sm:text-base">
                    {{ data.art }}
                </p>
            </div>
            <div class="mx-4 sm:grow sm:order-last">
                <AtomTransformPrice :price="data.price" :sale="data.sale!"
                :style="'text-xl ld:text-lg md:text-base sm:text-sm'" class="block sm:justify-end"/>
            </div>
            <div class="mr-6 sm:order-last block sm:mx-2">
                <div class="inline-block">
                    <AtomOtherQuantitySelection class="md:py-1 md:px-2 grow-0" :quantity-number="item.quantity"
                        :data-quantity="data.quantity" />
                </div>
            </div>
            <button type="button" class="">
                <ClientOnly>
                    <IconClose class="group is-icon-black h-6 w-6 cursor-pointer float-right "
                        @click="basketProd.removeBasketProduct(index)" />
                </ClientOnly>
            </button>
        </div>
    </li>
</template>
<script setup lang="ts">
import { basketProduct } from "~~/pinia/basket";
import { ProductCardForSearch, productCardParamsForSearchSelect, BasketItem } from "@/type/intex";

const props = defineProps<{
    item: BasketItem,
    index: number
}>()

const basketProd = basketProduct()
const { getInfo: getInfoProduct } = useProduct() 

const data = await getInfoProduct<ProductCardForSearch>({ where: { id: props.item.id }, ...productCardParamsForSearchSelect})
</script>