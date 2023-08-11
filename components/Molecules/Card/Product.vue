<template>
    <article class="flex h-full">
        <div class="w-full flex flex-col">
            <div class="w-full aspect-square rounded-md animate-loader-data relative"
                :class="[!content ? 'liner__gradient-loader' : 'bg-gray-100']"
                :style="{ '--lin-grad-loader--deg': '90deg' }">
                <template v-if="content">
                    <AtomProductStatus :discount="content.discount > 0"
                        :news="checkDate(content.createAt as unknown as string)"
                        class="top-4 left-4 z-20 sm:text-xs sm:py-0 sm:px-2 group-[.is-pos-info-for-stock]:left-0 " />
                    <div class="absolute z-30 right-2 top-2 sm:scale-75 sm:top-1 sm:right-1">
                        <slot name="bt-favorite" v-bind="{ content }">
                            <ClientOnly>
                            <AtomButtonStandart v-if="content && !isNumber(content)" class="p-1 after:content-none"
                                @click="storeFavorite.toggleItem(content.id)">
                                <CreateIcon name="like_28_31"
                                    :att="{ class: [storeFavorite.findItem(content.id).value ? 'fill-red-500 stroke-none' : 'fill-none stroke-gray-500 stroke-[1.5px]'] }" />
                            </AtomButtonStandart>
                        </ClientOnly>
                        </slot>
                    </div>
                    <div class="absolute -translate-x-1/2 -translate-y-1/2 inset-1/2 p-8 w-full h-full z-10">
                        <NuxtLink :to="`/catalog/${content.id}`" class="h-full w-full flex justify-center items-center">
                            <img :src="content.image.length ?
                                changeValueImageSize(content.image[0].link, { 'heigth': 'h_320', 'bgrem': 'co_white,e_make_transparent:1' }) :
                                ''" :alt="content.name" class="object-contain max-w-full max-h-full">
                        </NuxtLink>
                    </div>

                </template>
            </div>
            <div class="py-4 grow sm:py-2 flex flex-col">
                <div v-if="content" class="grow">
                    <p class="line-clamp-2 text-lg xl:text-base sm:text-sm ">
                        <span class="mb-1 mr-2">{{ content.name }}</span>
                        <span class="text-gray-300">{{ content.art }}</span>
                    </p>
                </div>
                <div class="text-base xl:text-sm mb-2" v-else>
                    <AtomOtherSkeletonElem tag="p" class="mb-2" :loader="!Boolean(content)" />
                    <AtomOtherSkeletonElem tag="p" :loader="!Boolean(content)" />
                </div>

                <div class="flex items-center justify-between">
                    <AtomOtherSkeletonElem v-if="!content" class="grow text-xl lg:text-base mr-4" tag="p" :animated="true"
                        :loader="!Boolean(content)" />
                    <AtomProductPrice v-else :price="content.price" class="grow text-2xl lg:text-xl md:text-base"
                        :discount="content.discount" />
                    <AtomButtonStandart class="p-0 group is-icon-black rounded-none">
                        <CreateIcon name="static_24_24" :att="{ class: 'fill-gray-500' }" class="sm:hidden" />
                    </AtomButtonStandart>
                </div>
            </div>
            <slot name="bt-basket" v-bind="{ content, addBasket }">
                <AtomButtonStandart v-if="content && !isNumber(content)"
                    class="flex bg-blue-500  justify-center items-center md:py-2 sm:text-sm" @click.stop="addBasket({
                        data: { ...content },
                        quantity: 1
                    })" :disabled="content.quantity === 0">
                    <CreateIcon name="basket_25_25" :att="{ class: 'fill-white' }" />
                    <p class="text-white ml-2"> {{ _content?.TEXT_BASKET_ADD_ITEM || 'add basket'  }}</p>
                </AtomButtonStandart>
            </slot>
        </div>
    </article>
</template>
<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
import { Content, ProductCardBase } from "~~/type/intex";
import { basket as _basket } from "@/stores/basket";
import { alert as _alert } from "@/stores/alert";
import { favorite as _favorite } from "@/stores/favorite";

const props = withDefaults(defineProps<{
    data: ProductCardBase | null
}>(), { data: null })

const style = "text-2xl lg:text-xl md:text-base"
const _content = useState<Content | null>('CONTENT_APP')
const storeAlert = _alert()
const storeBasket = _basket()
const storeFavorite = _favorite()

const content = computed<ProductCardBase | null>(() => props.data)

function addBasket(item: Parameters<typeof storeBasket['addItem']>[0]) {
    if (storeBasket.findItem(item.data.id)) {
        storeAlert.create({ 'text': _content.value?.ALERT_BASKET_PRODUCT_IS_ALREADY_THERE || null, state: 'info'  })
    } else {
        storeBasket.addItem({ quantity: item.quantity, data: item.data })
        storeAlert.create({ 'text':  _content.value?.ALERT_BASKET_ADD_ITEM || null , state: 'info'  })
    }
}
</script>