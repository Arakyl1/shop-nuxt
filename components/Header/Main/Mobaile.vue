<template>
<header>
    <div class="max-w-7xl mx-auto px-4 sm:px-3">
        <!-- <div class="h-2"></div>
        <div class="flex items-center py-4 sm:justify-between">
            <NuxtLink to="/" class="sm:w-24">
                <img src="@/assets/img/logo.png" alt="logo" >
            </NuxtLink>

            <div class="grow sm:hidden"></div>

            <NuxtLink to="/add" class="ml-6 sm:ml-0">
                <IconAddItem/>
            </NuxtLink>
            <ButtomStandart class="p-0 rounded-none ml-6 sm:ml-0">
                <IconStatic class="group is-icon-black"/>
            </ButtomStandart>
            <ButtomFavoriteShow class="ml-6 sm:ml-0 sm:pr-2"/>
            <ButtomShowBasket class="ml-6 sm:ml-0 sm:pr-2"/>
            <ButtomUser >
                <template #buttom="{ user, updateStage }">
                    <ButtomStandart class="p-0 ml-4 sm:ml-0 sm:scale-90" @click="updateStage"
                    :class="{ 'bg-yellow-500': user.userData }">
                        <IconUser :class="[ user.userData ? 'group is-icon-white' : 'group is-icon-black']"/>
                    </ButtomStandart>
                </template>
            </ButtomUser>
            <ButtomStandart class="p-1 ml-2 bg-blue-500 sm:ml-0"
            @click="updateStage">
                <IconMenu class="group is-icon-white"/>
            </ButtomStandart>
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
            <SearchForm>
                <template #form>
                    <form class="flex bg-gray-100 px-4 py-3 rounded">
                        <input type="text" placeholder="Что ищем?." class="focus-visible:outline-none grow bg-gray-100 ">
                        <ButtomStandart class="p-0">
                            <IconSearch class="group is-icon-black"/>
                        </ButtomStandart>
                    </form>
                </template> 
            </SearchForm>
        </div> -->
    </div>
    <!-- <HeaderSelectMobaile :class="[ stage ? 'translate-x-0' : 'translate-x-full']" :updateFun="updateStage"/> -->
</header>
</template>
<script setup lang="ts">
// import SearchForm from '../Other/SearchForm.vue';
// import { ShowContent } from '~~/components/Other/Modal/Show';

// const { stage, updateStage } = ShowContent()

</script>