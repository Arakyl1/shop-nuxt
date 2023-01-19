<template>
    <section>
        <div class="flex">
            <div class="w-1/2 relative lg:w-5/12">
                <div class="p-16 flex items-center justify-center xl:p-12">
                    <img :src="data.img" :alt="data.name" 
                    class="max-w-[80%] max-h-[80%]">
                </div>
                <OtherProductInfoForStock
                :news="data.news" :sell="data.sale"
                class="left-0 top-24"/>
            </div>
            <div class="w-1/2 bg-gray-100 p-12 xl:p-8 lg:w-7/12">
                <div class="relative">
                    <ButtomAddFavorite :id="data.id"
                    class="-right-1 -top-1 absolute p-1"/>
                    <h3 class="text-4xl pr-12 text-black-500 mb-8 xl:text-3xl xl:mb-6 lg:text-2xl"
                    >{{data.name}}
                    <span class="text-gray-300">{{ data.art }}</span></h3>
                    <div class="decor-line"></div>
                    <div class="flex py-8 justify-between xl:py-6">
                        <OtherElseStar :quantity-star="data.ranting"
                        class="grow justify-between"/>
                        <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
                        <ButtomShare class="p-0 group is-icon-blue"/>
                    </div>
                    <div class="decor-line"></div>
                    <div class="flex py-8 xl:py-6">
                        <p class="mr-5"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt}}</p>
                        <p><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod}}</p>
                    </div>
                    <div class="decor-line"></div>
                    <div class="py-8 flex justify-between xl:py-6">
                        <OtherTransformPrice
                        :price="data.price"
                        :sale="data.sale"
                        :style="'text-4xl xl:text-3xl lg:text-2xl'"/>
                        <OtherElseQuantitySelection
                        :data-quantity="data.quantity"
                        @number-of-products="(e) => numberOfProduct = e"
                        class="lg:py-1.5 lg:px-3"/>
                    </div>
                    <div class="decor-line"></div>
                    <div class="pt-8 flex items-center justify-between xl:pt-6">
                        <ButtomAddBasket
                        :id="data.id"
                        :quantity="numberOfProduct"
                        class="px-16 lg:px-10" />
                        <p class="text-lg font-medium"
                        :class="[ data.quantity === 0 ? 'text-red-500' : 'text-yellow-500 ' ]"
                        >{{ data.quantity > 0 ? 'В наличии' : 'Нет в наличии'}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
const props = defineProps<{ data: object }>()

const numberOfProduct = ref<number>(1)
</script>