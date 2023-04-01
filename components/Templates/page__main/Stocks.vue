<template>
    <section class="aspect-[228/101] w-full">
        <MoleculesSladerBase :data="data.body">
            <template #item="{ elem, prevItem, nextItem }">
                <template v-if="elem">
                    <div class="relative">
                        <img :src="isDesktopOrTablet ? elem.link_img_big : elem.link_img_small" alt=""
                            class="object-cover min-w-full rounded">
                        <div class="absolute w-[40%] h-min top-1/2 left-[10%]
                                -translate-y-1/2 text-black-300
                                lg:w-1/2
                                md:w-10/12 md:top-[20%] md:-translate-x-1/2 md:left-1/2 md:text-center
                                sm:w-11/12 sm:top-1/4">
                            <h3 class="text-5xl font-bold
                                    xl:text-4xl lg:text-3xl lg:mb-2 md:text-5xl md:mb-6 sm:text-2xl"
                                :class="elem.title_col">{{
                                    elem.title
                                }}</h3>
                            <p class="text-lg text-gray-300 mb-6
                                    lg:text-base lg:mb-3 md:text-2xl sm:text-lg">{{ elem.text }}</p>
                            <div class="flex md:hidden">
                                <AtomButtonStandart class="bg-blue-500 text-white mr-4 px-16 py-2.5 lg:px-10">
                                    Подробнее
                                </AtomButtonStandart>
                                <AtomButtonArround @click="prevItem" class="-scale-100 group big xl:py-3" />
                                <AtomButtonArround @click="nextItem" class="ml-2 group big xl:py-3" />
                            </div>
                        </div>
                    </div>
                </template>
                <MoleculesItemBase v-else class="aspect-[3/2]"/>
            </template>
            <template #bottom="{ nextItem, prevItem }">
                <template v-if="isMobile">
                    <div class="py-4">
                        <div class="flex justify-end">
                            <AtomButtonStandart class="bg-blue-500 text-white mr-4 text-center py-3 text-xl grow
                            sm:text-base sm:py-2">
                                Подробнее
                            </AtomButtonStandart>
                            <AtomButtonArround @click="prevItem" class="-scale-100 group big px-6 sm:px-5" />
                            <AtomButtonArround @click="nextItem" class="ml-2 group big px-6 sm:px-5" />
                        </div>
                    </div>
                </template>
                <div></div>
            </template>
        </MoleculesSladerBase>
    </section>
</template>
<script setup lang="ts">
const { isDesktopOrTablet, isMobile } = useDevice()

const data = await queryContent('/main/slader').findOne()
</script>