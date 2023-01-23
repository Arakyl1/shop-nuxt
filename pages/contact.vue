<template>
    <h1 class="text-4xl mb-6 xl:text-3xl lg:text-2xl lg:mb-4">Контакты</h1>
    <p class="text-lg py-4 lg:text-base sm:text-sm">Часы работы и приёма звонков: Понедельник- суббота с 9:00 до 20:00 ,воскресенье-выходной</p>
    <section class="relative mb-12">
        <template v-if="true">
            <ButtomStandart
            class="top-4 left-4 bg-white text-2xl rounded-md px-6 py-4 text-gray-500
            filter-none hover:shadow absolute xl:text-xl lg:hidden"
            @click="updateStage">
                Адреса для самовывоза
            </ButtomStandart>
            <OtherModalTransition :active="stage" class="w-[64rem] h-min xl:max-w-4xl lg:hidden">
                <OtherModalContent :hude-window="updateStage"
                :title="'Адреса для самовывоза'"
                :decor-line="false"
                class="min-w-min bg-white p-12 xl:p-8">
                <template #title>
                    <h2 class="text-2xl grow text-black-300 mb-6">Адреса для самовывоза</h2>
                </template>
                <div class="flex justify-between bg-gray-100 py-3 px-5 rounded-md">
                    <p class="text-gray-300">Адрес</p>
                    <p class="text-gray-300">Режим работы</p>
                </div>
                <ContentDoc :path="'/contact/market'" v-slot="{ doc }">
                    <ul v-for="item in doc.body" :key="item.adress">
                        <li class="flex px-5 py-3 border-b border-gray-300 xl:px-2"> 
                            <p class="grow pr-12">{{  item.adress }}</p>
                            <div class="text-right">
                                <p class="whitespace-nowrap">
                                    <span class="text-blue-500">Понедельник</span>
                                    - суббота с
                                    <span class="text-gray-300">{{ item.working_hours_from }}</span>
                                    до
                                    <span class="text-gray-300">{{ item.working_hours_to }}</span>
                                </p>
                                <p class="whitespace-nowrap">
                                    <span class="text-yellow-500">Воскресенье</span>
                                    <span class="text-gray-300">{{ item.weekend }}</span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </ContentDoc>
                </OtherModalContent>
            </OtherModalTransition>
        </template>
        <iframe
          class="w-full aspect-[2.3/1] rounded-md"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A7d6a1168fb8d16752cf83dd4cf2d8e58a4e0a3813fc21288224711925e8cb0ab&amp;source=constructor"
          frameborder="0"
        ></iframe>
    </section>
    <ClientOnly>
        <ContactMarket class="mb-12"/>

    </ClientOnly>
    <ContactRequisites class="mb-12"/>
</template>

<script setup lang="ts">
import ShowContent from "@/utils/ShowContent";

definePageMeta({
    title: "Контакты",
    keepalive: true
})


const { stage, updateStage } = ShowContent()
</script>
