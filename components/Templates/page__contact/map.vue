<template>
    <section class="relative mb-12">
        <template v-if="true">
            <div class="top-4 left-4 absolute" ref="modalbutton">
                <AtomButtonStandart class="bg-white text-2xl rounded-md px-6 py-4 text-gray-500
                filter-none hover:shadow  xl:text-xl lg:hidden" @click="update(true)">
                    Адреса для самовывоза
                </AtomButtonStandart>
            </div>
            <AtomModalMask :state="state" :clickFun="update" class="lg:hidden">
                <AtomModalTransition :state="state" :addclass="'h-min w-min'">
                    <AtomModalContent :click-fun="update" :decor-line="false" class="bg-white p-12 xl:p-8 min-w-min xl:max-w-4xl w-[64rem] h-min">
                            <template #title>
                                <h2 class="text-2xl grow text-black-300 mb-6">Адреса для самовывоза</h2>
                            </template>
                            <template #default>
                                <div>
                                    <div class="flex justify-between bg-gray-100 py-3 px-5 rounded-md">
                                        <p class="text-gray-300">Адрес</p>
                                        <p class="text-gray-300">Режим работы</p>
                                    </div>
                                    <ContentDoc :path="'/contact/market'" v-slot="{ doc }">
                                        <ul v-for="item in doc.body" :key="item.adress">
                                            <li class="flex px-5 py-3 border-b border-gray-300 xl:px-2">
                                                <p class="grow pr-12">{{ item.adress }}</p>
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
                                </div>
                            </template>
                        </AtomModalContent>
                </AtomModalTransition>
            </AtomModalMask>
        </template>
        <iframe class="w-full aspect-[2.3/1] rounded-md"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7d6a1168fb8d16752cf83dd4cf2d8e58a4e0a3813fc21288224711925e8cb0ab&amp;source=constructor"
            frameborder="0"></iframe>
    </section>
</template>

<script setup lang="ts">
import localState from "@/utils/localState";

const { state, update } = localState()
const modalbutton = ref<HTMLElement | null>(null)
</script>