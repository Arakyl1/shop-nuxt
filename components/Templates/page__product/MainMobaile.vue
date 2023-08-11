<template>
    <section>
        <div>
            <div>
                <h3 class="text-2xl text-black-500 mb-4 sm:text-xl">{{ data.name }}
                    <span class="text-gray-300">{{ data.art }}</span>
                </h3>
            </div>
            <div class="decor-line"></div>
            <div class="flex py-4 justify-between items-center">
                <AtomFormRating :quantity-star="getAverageValue()" class="grow justify-between" />
                <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
            </div>
            <div class="decor-line"></div>
            <div class="flex py-4">
                <p class="mr-5 sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt }}</p>
                <p class="sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod }}</p>
            </div>
            <div class="relative">
                <AtomProductStatus :news="checkDate(data.createAt as unknown as string)"
                :discount="data.discount > 0" class="-left-4 top-16 text-lg px-5
                        sm:-left-3 sm:top-4 sm:px-3 sm:text-sm" />
                <div class="px-16">
                    <img :src="changeValueImageSize(data.image[0].link, { 'crop': 'c_fill', 'obj': 'g_auto:subject', heigth: 'h_480' })" :alt="data.name" class="object-cover">
                </div>
            </div>
            <div class="py-4">
                <p :class="{ 'text-red-500 text-2xl font-medium sm:text-lg': data.quantity === 0 }">{{
                    data.quantity > 0
                    ? 'В наличии' : 'Нет в наличии'
                }}</p>
            </div>
            <div class="flex justify-between py-4">
                <AtomProductPrice :price="data.price" :discount="data.discount" class="text-4xl sm:text-2xl" />
                <AtomOtherSelectionQuantity :data-quantity="data.quantity" @number-of-products="(e) => numberOfProducts = e"
                    class="sm:px-2 sm:py-1" />
            </div>
            <div class="flex">

                <AtomButtonStandart
                class="flex bg-blue-500  justify-center items-center px-16 lg:px-10 grow"
                @click="storeBasket.addItem({
                    data: { ...props.data, characteristic: [], reviews: [] },
                    quantity: numberOfProducts
                })"
                :disabled="data.quantity === 0">
                    <CreateIcon name="basket_25_25" :att="{ class: 'fill-white' }"/>
                    <p class="text-white ml-2">В корзину</p>
                </AtomButtonStandart>

                <ClientOnly>
                    <AtomButtonStandart class="bg-blue-500 px-4 mx-3 sm:px-3 aspect-square group"
                        @click="storeFavorite.toggleItem(data.id)">
                        <CreateIcon name="like_28_31"
                            :att="{ class: [ storeFavorite.findItem(data.id).value ? 'fill-red-500 stroke-none' : 'fill-none stroke-white stroke-[1.5px]'] }"/>
                    </AtomButtonStandart>
                    <AtomButtonShare @click="onClick" class="bg-blue-500 px-4  m:px-3 group is-icon-white aspect-square" />
                </ClientOnly>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import type { Content, ProductCardFull } from '~~/type/intex';
import CreateIcon from "@/content/icons/create";
import { basket as _basket } from "@/stores/basket";
import { favorite as _favorite } from "@/stores/favorite";
import { alert as _alert } from "@/stores/alert";

const props = defineProps<{ data: ProductCardFull }>()
const storeBasket = _basket()
const storeFavorite = _favorite()
const { copyLink } = useShare()
const numberOfProducts = ref<number>(1)
const storeAlert = _alert()
const _content = useState<Content | null>('CONTENT_APP')

function getAverageValue(): number {
   return props.data.reviews.reduce((s,_) => s + (_.ranting || 0),0)
}

function onClick() {
    copyLink()
    storeAlert.create({ text: _content.value?.ALERT_COPE_LINK_INFO_TEXT || null, state: 'info' })
}
</script>