<template>
<section>
    <div>
        <div>
            <h3 class="text-2xl text-black-500 mb-4 sm:text-xl"
            >{{data.name}}
            <span class="text-gray-300">{{ data.art }}</span></h3>
        </div>
        <div class="decor-line"></div>
        <div class="flex py-4 justify-between items-center">
            <OtherElseStar :quantity-star="data.ranting"
            class="grow justify-between"/>
            <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
        </div>
        <div class="decor-line"></div>
        <div class="flex py-4">
            <p class="mr-5 sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt}}</p>
            <p class="sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod}}</p>
        </div>
        <div class="relative">
            <OtherProductInfoForStock
            :news="data.news" :sell="data.sale"
            class="-left-4 top-16 text-lg px-5
            sm:-left-3 sm:top-4 sm:px-3 sm:text-sm"/>
            <div class="px-16">
                <img :src="data.img" :alt="data.name" class="object-cover">
            </div>
        </div>
        <div class="py-4">
            <p :class="{ 'text-red-500 text-2xl font-medium sm:text-lg': data.quantity === 0 }"
            >{{ data.quantity > 0 ? 'В наличии' : 'Нет в наличии'}}</p>
        </div>
        <div class="flex justify-between py-4">
            <OtherTransformPrice
            :price="data.price"
            :sale="data.sale"
            :style="'text-4xl sm:text-2xl'"/>
            <OtherElseQuantitySelection
            :data-quantity="data.quantity"
            @number-of-products="(e) => numberOfProducts = e"
            class="sm:px-2 sm:py-1"/>
        </div>
        <div class="flex">
            <ButtomAddBasket
            :id="data.id"
            :quantity="numberOfProducts"
            class="px-16 lg:px-10 grow "/>
            <ButtomAddFavorite #bt-data="{ favorite }" :id="data.id"
            class="bg-blue-500 px-4 ml-3 aspect-square sm:px-3">
                <IconLike :update-style="favorite.list.has(data.id)" class="h-6" :style="'stroke-white'"/>
            </ButtomAddFavorite>
            <ButtomStandart  class="bg-blue-500 px-4 ml-3 aspect-square sm:px-3">
                <IconIconsShare class="group is-icon-white"/>
            </ButtomStandart>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">

defineProps<{ data: object }>()

const numberOfProducts = ref<number>(1)
</script>