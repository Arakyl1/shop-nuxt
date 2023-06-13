<template>
    <section>
        <div class="flex">
            <div class="w-1/2 relative lg:w-5/12">
                <div class="p-16 flex items-center justify-center xl:p-12">
                    <MoleculesSladerBase :data="data.image">
                        <template #item="{ elem }">
                            <div class="flex justify-center items-center h-full">
                                <img :src="elem.link" :alt="data.name" class="max-w-[80%] max-h-[80%]">
                            </div>
                        </template>
                        <template #bottom="{ updateScrolLeftSlader, indexActiveButton }" v-if="data.image.length > 1">
                            <MoleculesSladerControlItem
                            :data="data.image"
                            :index-active-button="indexActiveButton"
                            :update-scrol-left-slader="updateScrolLeftSlader"
                            :item-class="'aspect-square h-14 w-14 mx-2'"
                                ><template #default="{ item, index }">
                                    <div>
                                        <div class="border-2 rounded-lg transition p-0.5 aspect-square flex justify-center items-center"
                                            :class="[index === indexActiveButton ? 'border-yellow-500 ' : 'border-blue-300']">
                                            <img :src="changeValueImageSize(item.link, { 'heigth': 'h_48' })" alt=""
                                                class="rounded-md">
                                        </div>
                                    </div>
                                </template>
                            </MoleculesSladerControlItem>
                        </template>
                    </MoleculesSladerBase>
                </div>
                <AtomOtherInfoForStock :news="data.news!" :sell="data.sale!" class="left-0 top-24" />
            </div>
            <div class="w-1/2 bg-gray-100 p-12 xl:p-8 lg:w-7/12">
                <div class="relative">
                    <div class="absolute z-20 -right-1 top-1 sm:scale-75 sm:top-1.5 sm:right-1.5">
                        <ClientOnly>
                            <AtomButtonStandart class="group p-1" @click="addFatoriteItem(data.id)"
                                :class="[checkIdInFavorites(data.id).value ? 'icon-red' : 'icon-black']">
                                <IconLike class="h-7" />
                            </AtomButtonStandart>
                        </ClientOnly>
                    </div>

                    <h3 class="text-4xl pr-12 text-black-500 mb-8 xl:text-3xl xl:mb-6 lg:text-2xl">{{ data.name }}
                        <span class="text-gray-300">{{ data.art }}</span>
                    </h3>
                    <div class="decor-line"></div>
                    <div class="flex py-8 justify-between xl:py-6">
                        <AtomUIStar :quantity-star="data.ranting" class="grow justify-between" />
                        <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
                        <AtomButtonShare @click="copyLink" class="p-0 group is-icon-blue" />
                    </div>
                    <div class="decor-line"></div>
                    <div class="flex py-8 xl:py-6">
                        <p class="mr-5"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt }}</p>
                        <p><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod }}</p>
                    </div>
                    <div class="decor-line"></div>
                    <div class="py-8 flex justify-between xl:py-6">
                        <AtomTransformPrice :price="data.price" :sale="data.sale!"
                            :style="'text-4xl xl:text-3xl lg:text-2xl'" />
                        <AtomOtherQuantitySelection :data-quantity="data.quantity"
                            @number-of-products="(e) => numberOfProduct = e" class="lg:py-1.5 lg:px-3" />
                    </div>
                    <div class="decor-line"></div>
                    <div class="pt-8 flex items-center justify-between xl:pt-6">
                        <AtomButtonStandart
                        @click="addBasket({
                            id: data.id,
                            quantity: numberOfProduct,
                            price: data.sale ? Math.floor(data.price * 0.9) : data.price
                        })"
                        class="flex bg-blue-500  justify-center items-center px-16 lg:px-10"
                        :disabled="!checkAvailability(data)">
                            <IconBasketSmall class="group icon-white" />
                            <p class="text-white ml-2">В корзину</p>
                        </AtomButtonStandart>
                        <p class="text-lg font-medium" :class="[data.quantity === 0 ? 'text-red-500' : 'text-yellow-500 ']">
                            {{ data.quantity > 0 ? 'В наличии' : 'Нет в наличии' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import type { _ProductCardFull } from '~~/type/intex';

const props = defineProps<{ data: _ProductCardFull }>()
const { addBasket } = useBasket()
const { addFatoriteItem, checkIdInFavorites } = useFavorite()
const { copyLink } = useShare()

const numberOfProduct = ref<number>(1)
</script>