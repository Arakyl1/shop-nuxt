<template>
    <section>
        <ContentDoc path="/contact/slader" v-slot="{ doc }">
            <EntitiesOtherSladerBase :data="doc.body" :container-class="style.container" class="relative">
                <template #item="{ elem }">
                    <div class="slader__item">
                        <div>
                            <img :src="elem.img" alt="market_foto" class="object-cover w-full">
                            <p class="py-2 lg:text-sm md:text-base">{{ elem.adress }}</p>
                        </div>
                    </div>
                </template>
                <template #bottom="{ prevItem, nextItem, indexActiveButton, updateScrolLeftSlader }">
                    <template v-if="isDesktopOrTablet">
                        <div class="absolute top-[42%] left-0 flex items-center -translate-y-1/2
                        -translate-x-1/2 hover:-left-0.5 -scale-100 transition-all xl:-translate-x-1/4 lg:top-[35%]">
                            <SharedUIButtomArround class="filter-none" @click="prevItem" />
                        </div>
                        <div class="absolute top-[42%] right-0 flex items-center -translate-y-1/2
                        translate-x-1/2  hover:-right-0.5 transition-all xl:translate-x-1/4 lg:top-[35%]">
                            <SharedUIButtomArround class="filter-none" @click="nextItem" />
                        </div>
                    </template>
                    <EntitiesOtherSladerControlItem :indexActiveButton="indexActiveButton"
                    :updateScrolLeftSlader="updateScrolLeftSlader" :data="doc.body"/>
                </template>
            </EntitiesOtherSladerBase>
        </ContentDoc>

    </section>
</template>

<script setup lang="ts">
const { isDesktopOrTablet } = useDevice()

const style = {
    container: '[grid-auto-columns:calc(100%/3)] md:[grid-auto-columns:calc(100%/2)] sm:[grid-auto-columns:calc(100%)]'
}
</script>