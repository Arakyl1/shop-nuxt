<template>
    <div v-if="content" class="flex">
        <div class="w-full flex flex-col">
            <div class="w-full aspect-square bg-gray-100 rounded-md relative">
                <SharedUIOtherInfoForStock :sell="content.sale" :news="content.news" class="top-4 left-4 z-10 sm:text-xs sm:py-0 sm:px-2
                group-[.is-pos-info-for-stock]:left-0 " />
                <div class="absolute z-20 right-3 top-3 sm:scale-75 sm:top-1.5 sm:right-1.5">
                    <slot name="bt-favorite" v-bind="{ content }"></slot>
                </div>
                <div
                    class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-8 flex items-center justify-center z-0">
                    <NuxtLink :to="`/catalog/${content.id}`" class="w-full h-full">
                        <img :src="content.img" alt="product_image" class="object-contain max-w-full max-h-full">
                    </NuxtLink>
                </div>
            </div>
            <div class="py-4 grow flex flex-col sm:py-2">
                <p class="text-gray-500 text-lg truncate sm:text-sm">{{ content.art }}</p>
                <p class="text-lg text-black-700 mb-2 grow xl:text-base sm:text-sm sm:mb-1">{{ content.name }}</p>
                <div class="flex items-center justify-between">
                    <SharedUITransformPrice :price="content.price" :sale="content.sale" :style="style" class="grow" />
                    <UIIconStatic class="sm:hidden" />
                </div>
            </div>
            <slot name="bt-basket" v-bind="{ content }"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ListProduct } from '~~/utils/type';

const props = withDefaults(defineProps<{
    data?: ListProduct | null
    id?: number
}>(), { data: null })

const content = ref<ListProduct | null>(props.data)

async function getCardData() {
    const data = await getInfoProduct({ where: { id: props.id }, ...selectForCard() })
    if (data) content.value = data
}

if (props.id) {
    getCardData()
}
const style = "text-2xl lg:text-xl md:text-base"
</script>