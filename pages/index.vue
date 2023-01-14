<template>
    <div>
        
        <MainStocks class="mb-16 xl:mb-12"/>

        <MainCarusel :searchCategor="'sale'" :title="'Товары на акции'"/>

        <MainCarusel :searchCategor="'news'" :title="'Новинки'"/>

        <MainAdvertisement class="mb-16 xl:mb-12"/>
        
        <MainCarusel :searchCategor="'top'" :title="'Товары месяца'"/>
    
        <MainAdvantages class="mb-20 xl:mb-16"/>
        
    </div>
</template>

<script setup lang="ts">
definePageMeta({
   keepalive: true,
   title: 'Главная страница'
})


</script>
