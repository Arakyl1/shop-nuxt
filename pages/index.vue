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
definePageMeta({
   keepalive: true
})

useHead({
    title: 'Главная страница'
})

</script>
