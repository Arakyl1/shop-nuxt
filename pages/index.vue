<template>
    <UITBlockPanel :mode="'view'"> 
        <TemplatesCarouselImage />
        <TemplatesCarouseProduct
        :params="{ 'discount': 'gte:1', limit: 24 }"
        :title="t('PAGE_MAIN.CAROUSEL_TITLE_1')"/>
        <!--<Carousel
        :params="{ 'createAt': `gte:${new Date(Date.now() - 11604800000).getTime()}`, limit: 24  }"
        :title="common.CAROUSEL_TITLE_2"/>
        <section class="">
            <picture class="relative rounded-xl block hidden" >
                <source srcset="/img/info/content.mobile.png" media="(max-width: 768px)" loading="lazy" class="h-full w-full block">
                <img src="/img/info/content.png" loading="lazy" alt="" class="h-full w-full block">
            </picture>
        </section>
        <Carousel
        :params="{ 'views': 'gt:0', 'orderBy': 'views:desc' }"
        :title="common.CAROUSEL_TITLE_3"/>
        <Advantages/> -->
    </UITBlockPanel>
</template>

<script setup lang="ts">
import { UITBlockPanel } from "#components";
import { t } from "@/UI/composables/useI18n";
import TemplatesCarouselImage from "@/components/Templates/Carousel/Image.vue";
import TemplatesCarouseProduct from "@/components/Templates/Carousel/Product.vue";
// import Carousel from '@/components/Templates/Carousel/Product.vue';
// import Advantages from '@/components/Templates/page__main/Advantages.vue';
// import Stocks from '@/components/Templates/page__main/Stocks.vue';
// import Panel from "@/components/UI/Panel/Panel.vue"

definePageMeta({
   title: t('PAGE_META.MAIN.TITLE')
})
</script>


