<template>
    <section>
        <div class="rounded-md overflow-hidden relative md:-mx-4 sm:-mx-2">
            <img :src="'/img/info/' + (isDesktopOrTablet ? 'info-for-catalog' : 'info-for-catalog-mobaile') + '.jpg'" alt=""
            class="w-full">
            <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/3 xl:w-5/12
            md:w-3/4 sm:w-10/12">
                <p class="text-white text-2xl mb-3 xl:text-xl lg:text-lg
                md:text-2xl md:mb-6 sm:text-lg sm:mb-3">Стабилизаторы и Источникибесперебойного питания энергии</p>
                <div class="w-32 h-px bg-white mb-4"></div>
                <AtomButtonStandart
                class="bg-white text-blue-500 px-10 lg:px-8 lg:py-2.5
                md:py-4 md:text-xl sm:text-base sm:py-2">
                    Перейти в каталог
                </AtomButtonStandart>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const { isDesktopOrTablet } = useDevice()
</script>