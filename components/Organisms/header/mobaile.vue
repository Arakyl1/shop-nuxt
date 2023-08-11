<template>
    <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-3">
            <div class="h-2"></div>
            <div class="flex items-center py-4 sm:justify-between">
                <NuxtLink to="/" class="sm:w-24">
                    <img src="@/assets/img/logo.png" alt="logo">
                </NuxtLink>

                <div class="grow sm:hidden"></div>

                <NuxtLink to="/add" class="ml-4 sm:ml-0">
                    <CreateIcon :name="'add-list_28_28'" :att="{ class: 'fill-yellow-500' }"/>
                </NuxtLink>
                <AtomButtonStandart class="p-0 rounded-none ml-4 sm:hidden">
                    <CreateIcon name="static_20_20" :att="{ class: 'fill-gray-500' }"/>
                </AtomButtonStandart>
                <ClientOnly>
                    <div class="relative ml-4 sm:ml-1">
                        <AtomButtonShowFavorite />
                        <AtomOtherAdditionalInfo class="absolute right-0 bottom-0">{{ favoriteData.size }}</AtomOtherAdditionalInfo>
                    </div>
                    <div class="relative ml-4 sm:ml-1">
                        <AtomButtonShowbasket />
                        <AtomOtherAdditionalInfo class="absolute right-0 bottom-0">{{ basketData.length }}</AtomOtherAdditionalInfo>
                    </div>
                </ClientOnly>
                <AtomButtonShowUser>
                    <template #bt="{ showModalUser, _userData }">
                        <AtomButtonStandart class="p-1.5 ml-4 sm:ml-0 sm:scale-90 aspect-square"
                            @click="showModalUser"
                            :class="{ 'bg-yellow-500': _userData }">
                            <CreateIcon name="user_20_20"
                                :att="{ class: [, _userData ? 'fill-white' : 'fill-gray-500'] }"/>
                        </AtomButtonStandart>
                    </template>
                </AtomButtonShowUser>
                <AtomButtonStandart @click.stop="update(true)"
                class="p-2 ml-4 bg-blue-500 sm:ml-0 aspect-square">
                     <CreateIcon name="menu_20_20" :att="{ class: 'fill-white' }"/>
                </AtomButtonStandart>
            </div>
            <div class="decor-line"></div>
            <div class="flex justify-between py-4">
                <div class="flex items-center ">
                    <img src="@/assets/img/svg/phone.svg" alt="">
                    <p class="text-lg ml-2">8-(495)-005-52-15</p>
                </div>
                <div class="flex items-center">
                    <img src="@/assets/img/svg/email.svg" alt="">
                    <a href="mailto:info@5kvt.ru" class="text-lg ml-2">info@5kvt.ru</a>
                </div>
            </div>
            <div>
                <OrganismsSearch>
                    <template #form="{ getSearch, updateState }">
                        <form class="flex bg-gray-100 px-4 py-3 rounded" @submit.prevent>
                            <input type="text" placeholder="Что ищем?." v-model="inputText"
                                @input.stop="getSearch(inputText)"
                                @focus.stop="updateState(true)"
                                @keyup.enter="getSearch(inputText)"
                                class="focus-visible:outline-none grow bg-gray-100 ">
                            <AtomButtonStandart class="p-0" @click="getSearch(inputText)">
                                <CreateIcon name="magnifier_20_20" :att="{ class: 'fill-gray-500' }"/>
                            </AtomButtonStandart>
                        </form>
                    </template>
                </OrganismsSearch>
            </div>
        </div>
        <OrganismsMenuMobaile :class="[state ? 'translate-x-0' : 'translate-x-full']" :updateFun="update" />
        </header>
</template>
<script setup lang="ts">
import { basket as _basket } from "@/stores/basket";
import { favorite as _favorite } from "@/stores/favorite";
import CreateIcon from "@/content/icons/create";
import localState from "@/utils/localState";

const { state, update } = localState()
const storeBasket = _basket()
const storeFavorite = _favorite()
const { data: basketData } = storeToRefs(storeBasket)
const { data: favoriteData } = storeToRefs(storeFavorite)
const inputText = ref<string>('')
</script>