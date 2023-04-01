<template>
    <div></div>
    <h1 class="text-4xl mb-6 xl:text-3xl lg:text-2xl lg:mb-4">Контакты</h1>
    <p class="text-lg py-4 lg:text-base sm:text-sm">Часы работы и приёма звонков: Понедельник- суббота с 9:00 до 20:00 ,воскресенье-выходной</p>
    <TemplatesPageContactMap/>
    <ClientOnly>
        <TemplatesPageContactMarket class="mb-12"/>
    </ClientOnly>
    <TemplatesPageContactRequisites class="mb-12"/> 
</template>

<script setup lang="ts">
definePageMeta({
    title: "Контакты",
    keepalive: true
})
</script>
