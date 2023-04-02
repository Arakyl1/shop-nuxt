<template>
    <div> 
        <TemplatesPageMainStocks class="mb-16 xl:mb-12"/>

        <TemplatesPageMainCarusel :searchCategor="{ 'sale': true }">
            <template #title>
                Товары на акции
            </template>
        </TemplatesPageMainCarusel>

        <TemplatesPageMainCarusel :searchCategor="{ 'news': true }">
            <template #title>
                Новинки
            </template>
        </TemplatesPageMainCarusel>

        <TemplatesPageMainAdvertisement class="mb-16 xl:mb-12"/>
        
        <TemplatesPageMainCarusel :searchCategor="{ 'top': true }">
            <template #title>
                Товары месяца
            </template>
        </TemplatesPageMainCarusel>
    
        <TemplatesPageMainAdvantages class="mb-20 xl:mb-16"/>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
   keepalive: true,
   title: 'Главная страница'
})
</script>
