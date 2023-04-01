<template>
    <div class="top bg-gray-100 w-full">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex w-full py-2 items-center justify-between">
                <div>
                    <NuxtLink to="/delivery" class="text-black-500 mr-4">Доставка и оплата</NuxtLink>
                    <NuxtLink to="/contact" class="text-black-500">Контакты</NuxtLink>
                </div>
                <div class="grow lg:hidden">
                    <div class="flex justify-center">
                        <p class="text-gray-300">Построй и обустрой</p>
                        <div class="flex items-center mx-8">
                            <div v-for="item in 3" :key="item"
                                class="h1__top-circre w-1.5 h-1.5 bg-blue-500 rounded-full"
                                :class="[item === 2 ? 'mx-2' : '']"></div>
                        </div>
                        <p class="text-black-500">Всё для дома, дачи и стройки!</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <NuxtLink to="/add" class="mr-5">
                        <IconAddItem />
                    </NuxtLink>
                    <IconStatic class="mr-5" />
                    <ClientOnly>
                        <div class="relative">
                            <AtomButtonShowFavorite/>
                            <AtomUILengthArray class="-right-1">{{ favorite.size }}</AtomUILengthArray>
                        </div>
                        <div class="relative ml-4">
                            <AtomButtonShowbasket/>
                            <AtomUILengthArray class="-right-2">{{ basket.length }}</AtomUILengthArray>
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const { basket: basketStore, favorite: favoriteStore } = useStore()
const { basket } = basketStore()
const { favorite } = favoriteStore()
</script>

