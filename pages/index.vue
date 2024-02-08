<template>
    <Panel :mode="'view'"> 
        <Stocks />
        <Carousel
        :params="{ 'discount': 'gt:0', limit: 24 }"
        :title="common.CAROUSEL_TITLE_1"/>
        <Carousel
        :params="{ 'createAt': `gte:${new Date(Date.now() - 11604800000).getTime()}`, limit: 24  }"
        :title="common.CAROUSEL_TITLE_2"/>
        <Advertisement />
        <Carousel
        :params="{ 'views': 'gt:0', 'orderBy': 'views:desc' }"
        :title="common.CAROUSEL_TITLE_3"/>
        <Advantages/>
    </Panel>
</template>

<script setup lang="ts">
import Carousel from '@/components/Templates/Carousel/Product.vue';
import Advantages from '@/components/Templates/page__main/Advantages.vue';
import Stocks from '@/components/Templates/page__main/Stocks.vue';
import Advertisement from '@/components/Templates/page__main/Advertisement.vue';
import Panel from "@/components/UI/Panel/Panel.vue"
import { PAGE_MAIN as common, PAGE_META as META } from "@/common/C";

definePageMeta({
   title: META.MAIN.TITLE,
   keepalive: true,
})
</script>


