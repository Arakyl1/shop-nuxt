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
                <SharedUIStar :quantity-star="data.ranting" class="grow justify-between" />
                <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
            </div>
            <div class="decor-line"></div>
            <div class="flex py-4">
                <p class="mr-5 sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt }}</p>
                <p class="sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod }}</p>
            </div>
            <div class="relative">
                <SharedUIOtherInfoForStock :news="data.news!" :sell="data.sale!" class="-left-4 top-16 text-lg px-5
            sm:-left-3 sm:top-4 sm:px-3 sm:text-sm" />
                <div class="px-16">
                    <img :src="data.img" :alt="data.name" class="object-cover">
                </div>
            </div>
            <div class="py-4">
                <p :class="{ 'text-red-500 text-2xl font-medium sm:text-lg': data.quantity === 0 }">{{
                    data.quantity > 0
                        ? 'В наличии' : 'Нет в наличии'
                }}</p>
            </div>
            <div class="flex justify-between py-4">
                <SharedUITransformPrice :price="data.price" :sale="data.sale!" :style="'text-4xl sm:text-2xl'" />
                <SharedUIOtherQuantitySelection :data-quantity="data.quantity"
                    @number-of-products="(e) => numberOfProducts = e" class="sm:px-2 sm:py-1" />
            </div>
            <div class="flex">
                <FeaturesAddBasket>
                    <template #default="{ addBasketProduct }">
                        <UIStandart class="flex bg-blue-500  justify-center items-center px-16 lg:px-10 grow"
                         @click="addBasketProduct({
                            id: data.id,
                            quantity: numberOfProducts,
                            price: data.sale ? Math.floor(data.price * 0.9) : data.price
                        })">
                            <UIIconBasketSmall class="group icon-white" />
                            <p class="text-white ml-2">В корзину</p>
                        </UIStandart>
                    </template>
                </FeaturesAddBasket>
                <FeaturesAddFavorite :id="data.id">
                    <template #default="{ addProducFavorite, checkIdInFavorites }">
                        <ClientOnly>
                            <UIStandart class="group bg-blue-500 px-4 ml-3 aspect-square sm:px-3"
                                @click="addProducFavorite" :class="[checkIdInFavorites ? 'icon-red' : 'icon-black']">
                                <UIIconLike class="h-7" />
                            </UIStandart>
                        </ClientOnly>
                    </template>
                </FeaturesAddFavorite>
                <SharedUIButtomShare class="bg-blue-500 px-4 ml-3 aspect-square sm:px-3 group is-icon-white" />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { _ProductCardFull } from '~~/type/intex';

defineProps<{ data: _ProductCardFull }>()
const numberOfProducts = ref<number>(1)
</script>