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
                <AtomFormRating :quantity-star="middleRating" class="grow justify-between" />
                <p class="ml-4 grow text-gray-500">Отзывы ({{ data.reviews.length }})</p>
            </div>
            <div class="decor-line"></div>
            <div class="flex py-4">
                <p class="mr-5 sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt }}</p>
                <p class="sm:text-sm"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod }}</p>
            </div>
            <div class="relative">
                <AtomProductStatus :news="checkDate(data.createAt as unknown as string)" :discount="data.discount > 0"
                    class="-left-4 top-16 text-lg px-5
                        sm:-left-3 sm:top-4 sm:px-3 sm:text-sm" />
                <MoleculesSladerBase :data="data.image">
                    <template #header>
                        <div></div>
                    </template>
                    <template #item="{ elem, }">
                        <div class="px-16 xs:px-12 h-full flex justify-center items-center">
                            <img :src="changeValueImageSize(elem.link, { 'crop': 'c_fill', 'obj': 'g_auto:subject', heigth: 'h_480' })"
                                :alt="data.name" class="object-cover ">
                        </div>
                    </template>
                    <template #bottom="{ updateScrolLeftSlader, indexActiveButton  }" v-if="data.image.length > 1">
                        <MoleculesSladerControlItem
                            class="hidden"
                            :data="data.image.length"
                            :index-active-button="indexActiveButton"
                            :update-scrol-left-slader="updateScrolLeftSlader"
                            :container-class="'gap-x-4 pt-2'"
                            :item-class="'aspect-square h-12 w-12 justify-center'"
                                ><template #default="{ item }">
                                    <div >
                                        <div class="border-2 rounded-lg transition p-0.5 aspect-square flex justify-center items-center"
                                            :class="[(item-1) === indexActiveButton ? 'border-yellow-500 ' : 'border-blue-300']">
                                            <img :src="changeValueImageSize(data.image[(item-1)].link, { 'heigth': 'h_28' })" :alt="data.name"
                                                class="rounded-md">
                                        </div>
                                    </div>
                                </template>
                            </MoleculesSladerControlItem>
                    </template>
                </MoleculesSladerBase>

            </div>
            <div class="py-4">
                <p :class="{ 'text-red-500 text-2xl font-medium sm:text-lg': data.quantity === 0 }">{{
                    data.quantity > 0
                    ? 'В наличии' : 'Нет в наличии'
                }}</p>
            </div>
            <div class="flex justify-between py-4">
                <!-- <AtomProductPrice :price="data.price" :discount="data.discount" class="text-4xl sm:text-2xl" />
                <AtomOtherSelectionQuantity :data-quantity="data.quantity" @number-of-products="(e) => numberOfProducts = e"
                    class="sm:px-2 sm:py-1" /> -->
            </div>
            <div class="flex">

                <!-- <AtomButtonStandart class="flex bg-blue-500  justify-center items-center px-16 lg:px-10 grow" @click="addBasket({
                    data: { ...props.data, characteristic: [], reviews: [] },
                    quantity: numberOfProducts
                })" :disabled="data.quantity === 0">
                    <CreateIcon name="basket_25_25" :att="{ class: 'fill-white' }" />
                    <p class="text-white ml-2">В корзину</p>
                </AtomButtonStandart>

                <ClientOnly>
                    <AtomButtonStandart class="bg-blue-500 px-4 mx-3 sm:px-3 aspect-square group"
                        @click="storeFavorite.toggleItem(data.id)">
                        <CreateIcon name="like_28_31"
                            :att="{ class: [storeFavorite.findItem(data.id).value ? 'fill-red-500 stroke-none' : 'fill-none stroke-white stroke-[1.5px]'] }" />
                    </AtomButtonStandart>
                    <AtomButtonShare @click="onClick" class="bg-blue-500 px-4  m:px-3 group is-icon-white aspect-square" />
                </ClientOnly> -->
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

const middleRating = computed(() => props.data.reviews.reduce((s,_) => s + (_.ranting || 0),0) / props.data.reviews.length)

function onClick() {
    copyLink()
    storeAlert.create({ text: _content.value?.ALERT_COPE_LINK_INFO_TEXT || null, state: 'info' })
}

function addBasket(item: Parameters<typeof storeBasket['addItem']>[0]) {
    if (storeBasket.findItem(item.data.id)) {
        storeAlert.create({ 'text': _content.value?.ALERT_BASKET_PRODUCT_IS_ALREADY_THERE || null, state: 'info'  })
    } else {
        storeBasket.addItem({ quantity: item.quantity, data: item.data })
        storeAlert.create({ 'text':  _content.value?.ALERT_BASKET_ADD_ITEM || null , state: 'info'  })
    }
}
</script>