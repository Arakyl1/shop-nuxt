<template>
    <section>
        <ContentDoc path="/contact/slader" v-slot="{ doc }">
            <MoleculesSladerBase :data="doc.body" :container-class="style.container" class="relative">
                <template #item="{ elem }">
                    <div >
                        <div>
                            <ClientOnly>
                                <img :src="elem.img" alt="market_foto" class="object-cover w-full">
                            </ClientOnly>
                            <p class="py-2 lg:text-sm md:text-base">{{ elem.adress }}</p>
                        </div>
                    </div>
                </template>
                <template #bottom="{ prevItem, nextItem, indexActiveButton, updateScrolLeftSlader }">
                    <template class="block sm:hidden">
                        <div class="absolute top-[42%] left-0 flex items-center -translate-y-1/2
                        -translate-x-1/2 hover:-left-0.5 -scale-100 transition-all xl:-translate-x-1/4 lg:top-[35%]">
                            <AtomButtonArround class="filter-none" @click="prevItem" />
                        </div>
                        <div class="absolute top-[42%] right-0 flex items-center -translate-y-1/2
                        translate-x-1/2  hover:-right-0.5 transition-all xl:translate-x-1/4 lg:top-[35%]">
                            <AtomButtonArround class="filter-none" @click="nextItem" />
                        </div>
                    </template>
                    <MoleculesSladerControlItem :indexActiveButton="indexActiveButton"
                    :updateScrolLeftSlader="updateScrolLeftSlader" :data="doc.body.length"
                    class="hidden sm:block "/>
                </template>
            </MoleculesSladerBase>
        </ContentDoc>
    </section>
</template>

<script setup lang="ts">

const style = {
    container: '[grid-auto-columns:calc(100%/3)] md:[grid-auto-columns:calc(100%/2)] sm:[grid-auto-columns:calc(100%)]'
}
</script>