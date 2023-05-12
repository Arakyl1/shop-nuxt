<template>
    <div class="flex items-center justify-between py-5 lg:py-4">
        <NuxtLink to="/" class="lg:mr-4 xl:w-28 ">
            <img src="@/assets/img/logo.png" alt="logo">
        </NuxtLink>
        <h3 class="text-2xl lg:text-lg xl:text-xl ">+7 (499) 719-99-94</h3>
        <div class="group header-main lg:grow"><slot></slot></div>
        <ClientOnly>
            <AtomOtherSocialIcon class="lg:hidden"/>
        </ClientOnly>
        <AtomButtonStandart class="bg-yellow-500 text-white py-2 lg:hidden">
            Адреса магазинов
        </AtomButtonStandart>
        <AtomButtonShowUser/>
    </div>
</template>

