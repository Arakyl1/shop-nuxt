<template>
    <section v-if="data">
        <slot name="title">
            <h2 class="text-3xl text-black-500 mb-16 xl:mb-12 lg:text-2xl lg:mb-8 sm:text-xl sm:mb-6">Наши преимущества</h2>
        </slot>
        <EntitiesOtherSladerBase :data="data.body" :container-class="style.container"
        class="relative">
            <template #header><div></div></template>
            <template #item="{ elem }">
                <template v-if="elem">
                    <div class="h-full">
                        <div class="bg-gray-100 py-8 px-6 flex flex-col items-center h-full xl:py-6 xl:px-3">
                            <div class="w-20 h-20 relative rounded-full overflow-hidden flex p-6 items-center justify-center mb-4
                            after:content-[' '] after:absolute after:w-full after:h-full after:bg-yellow-500 after:top-0 after:left-0 z-10 after:opacity-30">
                                <img :src="`/img/svg/${elem.link_img}.svg`" alt=""
                                class="relative z-20">
                            </div>
                            <h4 class="text-lg text-black-500 mb-3 text-center xl:mb-1 xl:text-base">{{  elem.title }}</h4>
                            <p class="text-gray-500 text-center xl:text-sm">{{ elem.text  }}</p>
                        </div>
                    </div>
                </template>
                <EntitiesItemBase v-else/>
            </template>
            <template #bottom="{ prevItem, nextItem, indexActiveButton, updateScrolLeftSlader }" >
                <template v-if="data && size.width">
                    <div class="relative" v-if="(data.body.length / quantitySladerItem) > 1 && isDesktopOrTablet">
                        <SharedUIButtomArround class="-scale-x-100 absolute -top-32 -left-1"
                        @click="prevItem"/>
                        <SharedUIButtomArround class="absolute -top-32 -right-1"
                        @click="nextItem"/>
                    </div>
                    <div v-else-if="isMobile">
                        <EntitiesOtherSladerControlItem :data="data.body"
                        :indexActiveButton="indexActiveButton" :updateScrolLeftSlader="updateScrolLeftSlader"/>
                    </div>
                </template>
            </template>
        </EntitiesOtherSladerBase>
    </section>
</template>

<script setup lang="ts">
const { size } = useWindowContainer()
const { isDesktopOrTablet, isMobile } = useDevice()
const { data } = useAsyncData('advantages', () => queryContent('/main/advantages').findOne())

const quantitySladerItem = computed(() => size.value.width <= 640 ? 1 : size.value.width <= 768 ? 2 : size.value.width < 1028 ? 3 : 4)

const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] md:[grid-auto-columns:calc(100%/2)] sm:[grid-auto-columns:calc(100%)]'
}
</script>