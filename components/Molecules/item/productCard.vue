<template>
    <article class="flex">
        <div class="w-full flex flex-col">
            <div class="w-full aspect-square rounded-md animate-loader-data  relative"
                :class="[!content ? 'liner__gradient-loader' : 'bg-gray-100']"
                :style="{ '--lin-grad-loader--deg': '90deg' }">
                <template v-if="content">
                    <AtomOtherInfoForStock :sell="content.sale!" :news="content.news!" class="top-4 left-4 z-10 sm:text-xs sm:py-0 sm:px-2
                                    group-[.is-pos-info-for-stock]:left-0 " />
                    <div class="absolute z-20 right-3 top-3 sm:scale-75 sm:top-1.5 sm:right-1.5">
                        <slot name="bt-favorite" v-bind="{ content }"></slot>
                    </div>
                    <div
                        class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full p-8 flex items-center justify-center z-0">
                        <NuxtLink :to="`/catalog/${content.id}`" class="w-full h-full">
                            <img :src="changeValueImageSize(content.image[0].link, { 'heigth': 'h_320' })"
                                :alt="content.name" class="object-contain max-w-full max-h-full">
                        </NuxtLink>
                    </div>
                </template>
            </div>
            <div class="py-4 grow sm:py-2">
                <AtomOtherSkeletonElem class="text-lg truncate sm:text-sm"
                    :tag="'p'"
                    :loader="!Boolean(content)"
                    :color="'text-gray-500'"
                    >{{ content ? content.art : '_' }}
                </AtomOtherSkeletonElem>
                <AtomOtherSkeletonElem class="text-lg mb-2 grow xl:text-base sm:text-sm sm:mb-1 truncate"
                    :tag="'p'" :loader="!Boolean(content)"
                    :color="'text-black-700'"
                    >{{ content ? content.name : '_' }}
                </AtomOtherSkeletonElem>
                <div class="flex items-center justify-between">
                    <AtomOtherSkeletonElem class="text-2xl lg:text-xl md:text-base"
                        v-if="!content"
                        :tag="'p'"
                        :animated="true"
                        :loader="!Boolean(content)"
                        :class="[style, 'mr-4 grow'].join(' ')"
                        :span-class="'h-4 rounded-md w-full'"
                        >_
                    </AtomOtherSkeletonElem>
                    <AtomTransformPrice
                    v-else
                    :price="content.price"
                    :sale="content.sale!"
                    :style="style" class="grow" />
                    <AtomButtonStandart class="p-0 group is-icon-black rounded-none">
                        <IconStatic class="sm:hidden" />
                    </AtomButtonStandart>
                </div>
            </div>
            <slot name="bt-basket" v-bind="{ content }"></slot>
        </div>
    </article>
</template>
<script setup lang="ts">
import { type _ProductCardBase } from '~~/type/intex';

const props = withDefaults(defineProps<{
    data: _ProductCardBase | null
}>(), { data: null })

const content = computed<_ProductCardBase | null>(() => props.data)

const style = "text-2xl lg:text-xl md:text-base"
</script>