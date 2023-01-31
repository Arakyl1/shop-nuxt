<template>
    <div>
         
        <WidgetsMainStocks class="mb-16 xl:mb-12"/>

        <WidgetsMainCarusel :searchCategor="'sale'">
            <template #title>
                Товары на акции
            </template>
        </WidgetsMainCarusel>

        <WidgetsMainCarusel :searchCategor="'news'">
            <template #title>
                Новинки
            </template>
        </WidgetsMainCarusel>

        <WidgetsMainAdvertisement class="mb-16 xl:mb-12"/>
        
        <WidgetsMainCarusel :searchCategor="'top'">
            <template #title>
                Товары месяца
            </template>
        </WidgetsMainCarusel>
    
        <WidgetsMainAdvantages class="mb-20 xl:mb-16"/>
        
    </div>
</template>

<script setup lang="ts">
definePageMeta({
   keepalive: true,
   title: 'Главная страница'
})


</script>
