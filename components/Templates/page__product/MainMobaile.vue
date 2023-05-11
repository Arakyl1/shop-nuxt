<template>
    <section>
        <div>
            <div>
                <h3 class="text-2xl text-black-500 mb-4 sm:text-xl">{{ data.name }}
                    <span class="text-gray-300">{{ data.art }}</span>
                </h3>
            </div>
            <div class="decor-line"></div>
            <div class="flex py-4 justify-between items-center">
                <AtomUIStar :quantity-star="data.ranting" class="grow justify-between" />
                <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
            </div>
            <div class="decor-line"></div>
            <div class="flex py-4">
                <p class="mr-5 sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt }}</p>
                <p class="sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod }}</p>
            </div>
            <div class="relative">
                <AtomOtherInfoForStock :news="data.news!" :sell="data.sale!" class="-left-4 top-16 text-lg px-5
                        sm:-left-3 sm:top-4 sm:px-3 sm:text-sm" />
                <div class="px-16">
                    <img :src="data.image[0].link" :alt="data.name" class="object-cover">
                </div>
            </div>
            <div class="py-4">
                <p :class="{ 'text-red-500 text-2xl font-medium sm:text-lg': data.quantity === 0 }">{{
                    data.quantity > 0
                    ? 'В наличии' : 'Нет в наличии'
                }}</p>
            </div>
            <div class="flex justify-between py-4">
                <AtomTransformPrice :price="data.price" :sale="data.sale!" :style="'text-4xl sm:text-2xl'" />
                <AtomOtherQuantitySelection :data-quantity="data.quantity" @number-of-products="(e) => numberOfProducts = e"
                    class="sm:px-2 sm:py-1" />
            </div>
            <div class="flex">

                <AtomButtonStandart class="flex bg-blue-500  justify-center items-center px-16 lg:px-10 grow" @click="addBasket({
                    id: data.id,
                    quantity: numberOfProducts,
                    price: data.sale ? Math.floor(data.price * 0.9) : data.price
                })">
                    <IconBasketSmall class="group icon-white" />
                    <p class="text-white ml-2">В корзину</p>
                </AtomButtonStandart>

                <ClientOnly>
                    <AtomButtonStandart class="bg-blue-500 px-4 mx-3 sm:px-3 aspect-square group"
                        @click="addFatoriteItem(data.id)"
                        :class="[checkIdInFavorites(data.id).value ? 'icon-red' : 'icon-black']">
                        <IconLike class="h-7" />
                    </AtomButtonStandart>
                    <AtomButtonShare @click="copyLink" class="bg-blue-500 px-4  m:px-3 group is-icon-white aspect-square" />
                </ClientOnly>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import type { _ProductCardFull } from '~~/type/intex';

defineProps<{ data: _ProductCardFull }>()
const { addBasket } = useBasket()
const { checkIdInFavorites, addFatoriteItem } = useFavorite()
const { copyLink } = useShare()
const numberOfProducts = ref<number>(1)
</script>