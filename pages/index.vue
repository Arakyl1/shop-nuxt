<template>
    <div>
        
            <LazyMainStocks class="mb-16 xl:mb-12"/>

            <LazySlader :data="sale" :containerClass="style.container" :defaultTitle="'Акции недели'" class="mb-16 xl:mb-12">
            <template #item="{ elem }">
                <ProductCard :id="elem.id" class="slader__item group is-pos-info-for-stock"/>
            </template>
            <template #bottom>
                <div></div>
            </template>
            </LazySlader>
        
            <LazySlader :data="news" :containerClass="style.container" :defaultTitle="'Новинки'" class="mb-16 xl:mb-12">
                <template #item="{ elem }">
                    <ProductCard :id="elem.id" class="slader__item group is-pos-info-for-stock"/>
                </template>
                <template #bottom>
                    <div></div>
                </template>
            </LazySlader>

            <LazyMainAdvertisement class="mb-16 xl:mb-12"/>
        
        
            <LazySlader :data="top" :containerClass="style.container" :defaultTitle="'Товары месяца'" class="mb-16 xl:mb-12">
                <template #item="{ elem }">
                    <ProductCard :id="elem.id" class="slader__item group is-pos-info-for-stock"/>
                </template>
                <template #bottom>
                    <div></div>
                </template>
            </LazySlader>
        
            <LazyMainAdvantages class="mb-20 xl:mb-16"/>
            
    
    </div>
</template>

<script setup lang="ts">
import { containerSize } from "@/pinia/store";
import { storeToRefs } from "pinia";

const { getProductForCategor } = useProduct()
const containerFunc = containerSize()
const { size } = storeToRefs(containerFunc)


const sale = await getProductForCategor({ where: { sale: true }, select: { id: true }})
const news = await getProductForCategor({ where: { news: true }, select: { id: true }})
const top = await getProductForCategor({ where: { top: true }, select: { id: true }})


const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)]'
}
</script>
