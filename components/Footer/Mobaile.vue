<template>
    <footer class="w-screen">
        <div class="bg-black-500 py-8">
            <div class="max-w-7xl mx-auto z-20 px-4 sm:px-3">
                <div class="flex flex-wrap mb-4">
                    <img src="@/assets/img/logo.png" alt="logo" class="sm:h-8">
                    <p class="text-white text-xl grow text-right sm:text-lg">+7 (499) 719-99-94</p>
                </div>
                <div class="flex mb-4">
                    <p class="text-white text-xl grow sm:text-base">Ежедневно 9:30 - 20:00 (МСК)</p>
                    <p class="text-white text-xl sm:text-base">info@5kvt.ru</p>
                </div>
                <p class="text-gray-300 text-xl mb-8 sm:text-base">117218, г. Москва, пр-кт Нахимовский .,дом 30/43, кв. 81</p>
                <FooterItem :path="'/footer/link-info'" :title="'Информация'"/>
                <FooterItem :path="'/footer/link-services'" :title="'Служба поддержки'"/>
                <FooterItem :path="'/footer/link-user'" :title="'Личный кабинет'"/>
                <div class="decor-line mb-8"></div>
                <div>
                    <div class="flex items-center mb-8">
                        <img src="@/assets/img/iconSocials/whatsApp.png" alt="whatsApp" class="mr-2">
                        <img src="@/assets/img/iconSocials/vider.png" alt="viber" class="mr-4">
                        <p class="text-gray-500 text-lg sm:text-base">Напишите нам</p>
                    </div>

                    <ButtomStandart class="flex bg-blue-500 w-full justify-center items-center py-5 mb-12
                    sm:py-4">
                        <img src="@/assets/img/svg/user.svg" alt="user" class="mr-3">
                        <p class="text-white text-lg">Служба поддержки</p>
                    </ButtomStandart>

                    <h3 class="text-white text-xl mb-4 sm:text-lg">Принимаем к оплате</h3>
                    <div class="flex justify-left mb-6">
                        <div v-for="item in card" :key="item" class="mr-3">
                            <img class=" object-contain"
                            :src="`/img/card/${item}.png`"
                            :alt="item">
                        </div>
                    </div>
                    <p class="text-gray-500 text-xs"
                    >Все права защищены. Указанная стоимость товаров и условия их приобретения действительны на текущую дату.</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">

const card = ['maestro', 'master', 'mir', 'visa']
</script>