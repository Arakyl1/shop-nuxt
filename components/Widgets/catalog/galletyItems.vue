<template>
    <div class="w-3/4 lg:w-2/3 md:w-full">
        <div v-if="loader" class="flex justify-center mt-32">
            <UIIconLoader />
        </div>
        <div class="flex flex-wrap" v-else-if="!loader && Array.isArray(listIdProduct) ? listIdProduct.length : null">
            <template v-for="item in listIdProduct" :key="item.id">
                <EntitiesItemProductCard v-if="item" :data="item"
                    class="group is-pos-info-for-stock w-1/3 mb-10 lg:w-1/2 md:w-1/3 sm:w-1/2 slader__item">
                    <template #bt-favorite>
                        <FeaturesAddFavorite :id="item.id">
                            <template #default="{ addProducFavorite, checkIdInFavorites }">
                                <ClientOnly>
                                    <UIStandart class="group p-1" @click="addProducFavorite"
                                        :class="[checkIdInFavorites ? 'icon-red' : 'icon-black']">
                                        <UIIconLike class="h-7" />
                                    </UIStandart>
                                </ClientOnly>
                            </template>
                        </FeaturesAddFavorite>
                    </template>
                    <template #bt-basket>
                        <FeaturesAddBasket>
                            <template #default="{ addBasketProduct }">
                                <UIStandart @click="addBasketProduct({
                                    id: item.id,
                                    quantity: 1,
                                    price: item.sale ? Math.floor(item.price * 0.9) : item.price})"
                                    class="flex bg-blue-500  justify-center items-center">
                                    <UIIconBasketSmall class="group icon-white" />
                                    <p class="text-white ml-2">В корзину</p>
                                </UIStandart>
                            </template>
                        </FeaturesAddBasket>
                    </template>
                </EntitiesItemProductCard>
            </template>
        </div>
        <div v-else>
            <p class="text-2xl text-gray-500 p-8 lg:text-xl sm:text-lg sm:p-4">По вашему запросу ничего не
                найденно</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { _ProductCardBaseOption } from "@/type/intex";
defineProps<{ listIdProduct: _ProductCardBaseOption[], loader: boolean }>()
</script>