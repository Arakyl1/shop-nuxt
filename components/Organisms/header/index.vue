<template>
    <header class="header">
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
                                <svg v-for="item in 3" :key="item" :class="[item === 2 ? 'mx-2' : '']" height="7"
                                    width="7px" xmlns="http://www.w3.org/2000/svg">

                                    <circle r="3" cx="4" cy="4" class="fill-blue-500"></circle>
                                </svg>
                            </div>
                            <p class="text-black-500">Всё для дома, дачи и стройки!</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <NuxtLink to="/add" class="mr-5">
                            <CreateIcon :name="'add-list_28_28'" :att="{ class: 'fill-yellow-500' }" />

                        </NuxtLink>
                        <CreateIcon :name="'static_24_24'" :att="{ class: 'fill-gray-700' }" class="mr-5" />
                        <ClientOnly>
                            <div class="relative">
                                <AtomButtonShowFavorite />
                                <AtomOtherAdditionalInfo class="-right-1 bottom-0">{{ favoriteData.size }}
                                </AtomOtherAdditionalInfo>
                            </div>
                            <div class="relative ml-4">
                                <AtomButtonShowbasket />
                                <AtomOtherAdditionalInfo class="-right-2 bottom-0">{{ basketData.length }}
                                </AtomOtherAdditionalInfo>
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-3">
            <div class="flex items-center justify-between py-5 lg:py-4">
                <NuxtLink to="/" class="lg:mr-4 xl:w-28 ">
                    <img src="@/assets/img/logo.png" alt="logo">
                </NuxtLink>
                <h3 class="text-2xl lg:text-lg xl:text-xl ">+7 (499) 719-99-94</h3>
                <div class="group header-main lg:grow">
                    <OrganismsSearch class="lg:mx-6" />
                </div>
                <AtomOtherSocialIcon class="lg:hidden" />
                <AtomButtonStandart class="bg-yellow-500 text-white py-2 lg:hidden">
                    Адреса магазинов
                </AtomButtonStandart>
                <AtomButtonShowUser />
            </div>
            <OrganismsHeaderBottom />
        </div>
    </header>
</template>

<script setup lang="ts">
import { basket as _basket } from "@/stores/basket";
import { favorite as _favorite } from "@/stores/favorite";
import CreateIcon from "@/content/icons/create";

const storeBasket = _basket()
const storeFavorite = _favorite()
const { data: basketData } = storeToRefs(storeBasket)
const { data: favoriteData } = storeToRefs(storeFavorite)

</script>