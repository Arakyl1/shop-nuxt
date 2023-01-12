<template>
    <div>
        
        <MainStocks class="mb-16 xl:mb-12"/>

        <MainCarusel :searchCategor="'sale'"/>
        <MainCarusel :searchCategor="'news'"/>

        

        <MainAdvertisement class="mb-16 xl:mb-12"/>
        
        <MainCarusel :searchCategor="'top'"/>
    
        <MainAdvantages class="mb-20 xl:mb-16"/>
        
    </div>
</template>

<script setup lang="ts">
// import { selectForCard } from "@/utils/prismaSelect";
definePageMeta({
   keepalive: true
})
// const { getProductForCategor } = useProduct()

useHead({
    title: 'Главная страница'
})

// const sale = await getProductForCategor({ where: { sale: true }, ...selectForCard()})
// const news = await getProductForCategor({ where: { news: true }, ...selectForCard()})
// const top = await getProductForCategor({ where: { top: true }, ...selectForCard()})



</script>
