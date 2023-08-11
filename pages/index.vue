<template>
    <div> 
        <TemplatesPageMainStocks class="mb-16 xl:mb-12"/>

         <TemplatesPageMainCarusel :params="{ 'discount.gt': 0, limit: 24 }">
            <template #title>
                Товары на акции
            </template>
        </TemplatesPageMainCarusel>

        <TemplatesPageMainCarusel :params="{ 'createAt.gte': new Date(Date.now() - 604800000 ), limit: 24  }">
            <template #title>
                Новинки
            </template>
        </TemplatesPageMainCarusel>
        <div></div>
        <TemplatesPageMainAdvertisement class="mb-16 xl:mb-12"/>
        
        <TemplatesPageMainCarusel :params="{ 'views.gt': 0, 'orderBy.views': 'desc' }">
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
