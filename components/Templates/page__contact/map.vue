<template>
    <section class="relative mb-12">
        <template v-if="true">
            <AtomButtonStandart class="top-4 left-4 bg-white text-2xl rounded-md px-6 py-4 text-gray-500
            filter-none hover:shadow absolute xl:text-xl lg:hidden" @click="update(true)">
                Адреса для самовывоза
            </AtomButtonStandart>
            <!-- <MoleculesModalAddresMarket
            class="w-[64rem] h-min xl:max-w-4xl lg:hidden"
            :stage="state"
            :update-stage="update">
            </MoleculesModalAddresMarket> -->
        </template>
        <iframe class="w-full aspect-[2.3/1] rounded-md"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7d6a1168fb8d16752cf83dd4cf2d8e58a4e0a3813fc21288224711925e8cb0ab&amp;source=constructor"
            frameborder="0"></iframe>
    </section>
</template>

<script setup lang="ts">
import localState from "@/utils/localState";
const { state, update } = localState()
</script>~