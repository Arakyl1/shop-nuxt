<template>
    <header>
        <div class="max-w-7xl mx-auto px-4 sm:px-3">
            <div class="h-2"></div>
            <div class="flex items-center py-4 sm:justify-between">
                <NuxtLink to="/" class="sm:w-24">
                    <img src="@/assets/img/logo.png" alt="logo">
                </NuxtLink>

                <div class="grow sm:hidden"></div>

                <NuxtLink to="/add" class="ml-6 sm:ml-0">
                    <UIIconAddItem />
                </NuxtLink>
                <UIStandart class="p-0 rounded-none ml-6 sm:ml-0">
                    <UIIconStatic class="group is-icon-black" />
                </UIStandart>
                <ClientOnly>
                    <div class="relative">
                        <SharedUIButtomShowFavorite />
                        <SharedUILengthArray>{{ favorite.size }}</SharedUILengthArray>
                    </div>
                    <div class="relative ml-4">
                        <SharedUIButtomShowbasket />
                        <SharedUILengthArray>{{ basket.length }}</SharedUILengthArray>
                    </div>
                </ClientOnly>
                <SharedUIButtomShowUser>
                    <template #bt="{ showModalUser, userData }">
                        <UIStandart class="px-2 py-1 ml-4 sm:ml-0 sm:scale-90 aspect-square" @click="showModalUser"
                            :class="{ 'bg-yellow-500': userData }">
                            <UIIconUser :class="[userData ? 'group is-icon-white' : 'group is-icon-black']" class="h-6"/>
                        </UIStandart>
                    </template>
                </SharedUIButtomShowUser>
                <UIStandart class="px-1.5 py-0 ml-2 bg-blue-500 sm:ml-0 aspect-square" @click="updateStage">
                    <UIIconMenu class="group is-icon-white h-6"/>
                </UIStandart>
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
                <FeaturesSearchForm :input="inputText">
                    <template #form="{ getSearch, clearDataSearch }">
                        <form class="flex bg-gray-100 px-4 py-3 rounded" @submit.prevent>
                            <input type="text" placeholder="Что ищем?." v-model="inputText"
                                @keyup.enter="getSearch(inputText)"
                                class="focus-visible:outline-none grow bg-gray-100 ">
                            <UIStandart class="p-0" @click="getSearch(inputText)">
                                <UIIconSearch class="group is-icon-black" />
                            </UIStandart>
                        </form>
                    </template>
                </FeaturesSearchForm>
            </div>
        </div>
        <EntitiesSelectMobaile :class="[stage ? 'translate-x-0' : 'translate-x-full']" :updateFun="updateStage" />
    </header>
</template>
<script setup lang="ts">
import ShowContent from '@/utils/ShowContent';

const { stage, updateStage } = ShowContent()
const { basket } = useBasket()
const { favorite } = useFavorite()
const inputText = ref<string>('')
</script>