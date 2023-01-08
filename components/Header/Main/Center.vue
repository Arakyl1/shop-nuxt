<template>
<div class="flex items-center justify-between py-5 lg:py-4">
    <NuxtLink to="/" class="xl:w-28">
        <img src="@/assets/img/logo.png" alt="logo" >
    </NuxtLink>
    <h3 class="xl:text-xl text-2xl ">+7 (499) 719-99-94</h3>
    <HeaderOtherSearchForm class="group header-main"/>
    <ClientOnly>
        <OtherElseSocialIcon class="lg:hidden"/>
    </ClientOnly>
    <ButtomStandart class="bg-yellow-500 text-white py-2 lg:hidden">
        Адреса магазинов
    </ButtomStandart>
    <button class="flex justify-between">
        <ButtomUser/>
    </button>
</div>
</template>
<script setup lang="ts">

</script>

<style lang="css">
</style>