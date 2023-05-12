<template>
    <footer class="block sm:hidden">
        <div class="bg-black-500">
            <div class="max-w-7xl mx-auto z-20 px-4">
                <div class="py-12 xl:py-10">
                    <div class="grid grid-cols-4 gap-x-8 mb-12 xl:gap-x-4 lg:grid-cols-2 lg:gap-12 ">
                        <div class="lg:order-3">
                            <img src="@/assets/img/logo.png" alt="logo" class="mb-7 xl:mb-6">
                            <p class="text-white mb-5 xl:mb-4">+7 (499) 719-99-94</p>
                            <p class="text-white mb-5 xl:mb-4">info@5kvt.ru</p>
                            <p class="text-white mb-5 xl:mb-4">Ежедневно 9:30 - 20:00 (МСК)</p>
                            <p class="text-gray-300">117218, г. Москва, пр-кт Нахимовский .,дом 30/43, кв. 81</p>
                        </div>
                        <div class="pl-6 xl:pl-2">
                            <h3 :class="style.title">Информация</h3>
                            <ul v-if="linkInfo">
                                <li v-for="item in linkInfo.body" class="mb-2 xl:mb-1.5">
                                    <NuxtLink :to="item.href" class="text-gray-500"> {{ item.name }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                        <div class="pl-6 xl:pl-2 ">
                            <div>
                                <h3 :class="style.title">Служба поддержки</h3>
                                <ul v-if="linkSercices">
                                    <li v-for="item in linkSercices.body" class="mb-2 xl:mb-1.5">
                                        <NuxtLink :to="item.href" class="text-gray-500"> {{ item.name }}</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 :class="style.title">Личный кабинет</h3>
                                <ul v-if="linkUser">
                                    <li v-for="item in linkUser.body" class="mb-2 xl:mb-1.5">
                                        <NuxtLink :to="item.href" class="text-gray-500"> {{ item.name }}</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="order-last">
                            <div class="flex items-center mb-8">
                                <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="mr-2">
                                <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="mr-4">
                                <p class="text-gray-500">Напишите нам</p>
                            </div>
                            <AtomButtonStandart class="flex bg-blue-500 w-full justify-center mb-8">
                                <img src="@/assets/img/svg/user.svg" alt="user">
                                <p class="text-white">Служба поддержки</p>
                            </AtomButtonStandart>
                            <h3 :class="style.title">Принимаем к оплате</h3>

                            <div class="flex justify-between lg:justify-start">
                                <div v-for="item in card" :key="item" class="xl:mr-2 xl:last:mr-0">
                                    <img class=" object-contain" :src="`/img/card/${item}.png`" :alt="item">
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-gray-500 text-xs">Все права защищены. Указанная стоимость товаров и условия их
                        приобретения действительны на текущую дату.</p>
                </div>
            </div>
        </div>
    </footer>
    <footer class="sm:block hidden bg-black-500">
        <div class="py-8">
            <div class="z-20 px-4 sm:px-3">
                <div class="flex flex-wrap mb-4">
                    <img src="@/assets/img/logo.png" alt="logo" class="sm:h-8">
                    <p class="text-white text-xl grow text-right sm:text-lg">+7 (499) 719-99-94</p>
                </div>
                <div class="flex mb-4">
                    <p class="text-white text-xl grow sm:text-base">Ежедневно 9:30 - 20:00 (МСК)</p>
                    <p class="text-white text-xl sm:text-base">info@5kvt.ru</p>
                </div>
                <p class="text-gray-300 text-xl mb-8 sm:text-base">117218, г. Москва, пр-кт Нахимовский .,дом 30/43, кв. 81
                </p>
                <MoleculesListItem :data="linkInfo ? linkInfo.body : null" :title="'Информация'" />
                <MoleculesListItem :data="linkSercices ? linkSercices.body : null" :title="'Служба поддержки'" />
                <MoleculesListItem :data="linkUser ? linkUser.body : null" :title="'Личный кабинет'" />
                <div class="decor-line mb-8"></div>
                <div>
                    <div class="flex items-center mb-8">
                        <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="mr-2">
                        <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="mr-4">
                        <p class="text-gray-500 text-lg sm:text-base">Напишите нам</p>
                    </div>

                    <AtomButtonStandart class="flex bg-blue-500 w-full justify-center items-center py-5 mb-12
                        sm:py-4">
                        <img src="@/assets/img/svg/user.svg" alt="user" class="mr-3">
                        <p class="text-white text-lg">Служба поддержки</p>
                    </AtomButtonStandart>

                    <h3 class="text-white text-xl mb-4 sm:text-lg">Принимаем к оплате</h3>
                    <div class="flex justify-left mb-6">
                        <div v-for="item in card" :key="item" class="mr-3">
                            <img class=" object-contain" :src="`/img/card/${item}.png`" :alt="item">
                        </div>
                    </div>
                    <p class="text-gray-500 text-xs">Все права защищены. Указанная стоимость товаров и условия их
                        приобретения действительны на текущую дату.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { LisLink } from '~~/type/intex';

const { data: linkInfo } = await useAsyncData(
    'link-info',
    () => queryContent<LisLink>('/footer/link-info').findOne()
)

const { data: linkSercices } = await useAsyncData(
    'link-services',
    () => queryContent<LisLink>('/footer/link-services').findOne()
)

const { data: linkUser } = await useAsyncData(
    'link-user',
    () => queryContent<LisLink>('/footer/link-user').findOne()
)

const card: readonly string[] = ['maestro', 'master', 'mir', 'visa']
const style = {
    title: 'text-lg text-white mb-5 xl:text-base xl:mb-4',
    text: '',
}
</script>