<template>
    <div class="flex items-center justify-between py-5 lg:py-4">
        <NuxtLink to="/" class="xl:w-28 lg:mr-4">
            <img src="@/assets/img/logo.png" alt="logo">
        </NuxtLink>
        <h3 class="xl:text-xl text-2xl lg:grow">+7 (499) 719-99-94</h3>
        <div class="group header-main lg:grow"><slot></slot></div>
        <ClientOnly>
            <SharedUIOtherSocialIcon class="lg:hidden" />
        </ClientOnly>
        <UIStandart class="bg-yellow-500 text-white py-2 lg:hidden">
            Адреса магазинов
        </UIStandart>
        <SharedUIButtomShowUser/>
    </div>
</template>

