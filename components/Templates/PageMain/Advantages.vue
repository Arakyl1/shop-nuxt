<template>
    <section v-if="data">
        <slot name="title">
            <UITParagraphTitle :text="t('PAGE_MAIN.ADVANTAGES_TITLE')" class="mb-10 sm:mb-12 md:mb-14 lg:mb-16"/>
        </slot>
        <UITBlockGridScroll :data="data.body" class="relative" :container="'lg'" >
            <template #default="{ elem }">
                <UITBlockCard :rounded="'xl'" :mode="'gray'" class="py-6 px-3 lg:py-8 lg:px-6 h-full">
                    <UITBlockGroup class="h-full" :align="'center'" >
                        <UITBlockFlex :justify="'center'" :class="$style.circle">
                            <img :src="elem.link_img" alt="" class="relative z-20">
                        </UITBlockFlex>
                        <UITParagraphText :text="elem.title" :size="'md'" class="lg:text-lg text-center mb-4 lg:mb-5"/>
                        <UITParagraphText :text="elem.text" :color="'gray-500'" class="text-center mb-5"/>
                    </UITBlockGroup>
                </UITBlockCard>
            </template>
            <template v-if="viewport.isGreaterOrEquals('sm')"
            #center="{ prev, next, listValueScroll }" >
                <ControlButtons v-bind="{ listValueScroll, next, prev }"/>
            </template>
            <template v-else #footer="{ indexActiveButton, updateScrollLeft, listValueScroll }">
                <div class="mt-4">
                    <ControlButtonsItem
                    class="gap-4 justify-center"
                    :data="data.body.length"
                    :indexActiveButton="Number(indexActiveButton)"
                    :updateScroll="updateScrollLeft" />
                </div>
            </template>
        </UITBlockGridScroll>
    </section>
</template>

<script setup lang="ts">
import { UITBlockGridScroll, UITBlockFlex, UITBlockGroup, UITBlockCard, UITParagraphTitle, UITParagraphText } from '#components';
import ControlButtonsItem from "@/components/Templates/Carousel/Control/Item.vue";
import ControlButtons from "@/components/Templates/Carousel/Control/ButtonsCenter.vue";
import { t } from "#imports";

const { data } = useLazyAsyncData('advantages', () => queryContent('/main/advantages').findOne(), { server: true })
const viewport = useViewport()


</script>

<style lang="css" module>
.circle {
    position: relative;
    width: 5rem;
    height: 5rem;
    border-radius: 9999px;
    overflow: hidden;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}
.circle::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background-color: var(--yellow-500);
    z-index: 10;
}

</style>