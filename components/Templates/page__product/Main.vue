<template>
    <section>
        <div class="flex">
            <div class="w-1/2 relative xl:w-5/12">
                <div class="px-16 h-full flex items-center justify-center xl:px-12">
                    <MoleculesSladerBase :data="data.image">
                        <template #item="{ elem }">
                            <div class="flex justify-center items-center h-full aspect-square object-contain">
                                <img :src="changeValueImageSize(elem.link, { 'crop': 'c_fill', 'obj': 'g_auto:subject', heigth: 'h_480' })" :alt="data.name" class="max-w-[90%] max-h-[90%]">
                            </div>
                        </template>
                        <template #bottom="{ updateScrolLeftSlader, indexActiveButton }" v-if="data.image.length > 1">
                            <MoleculesSladerControlItem
                            class="overflow-hidden"
                            :data="data.image.length"
                            :index-active-button="indexActiveButton"
                            :update-scrol-left-slader="updateScrolLeftSlader"
                            :container-class="'gap-x-4 pt-2'"
                            :item-class="'aspect-square h-14 w-14 justify-center'"
                                ><template #default="{ item }">
                                    <div >
                                        <div class="border-2 rounded-lg transition p-0.5 aspect-square flex justify-center items-center"
                                            :class="[(item-1) === indexActiveButton ? 'border-yellow-500 ' : 'border-blue-300']">
                                            <img :src="changeValueImageSize(data.image[(item-1)].link, { 'heigth': 'h_48' })" :alt="data.name"
                                                class="rounded-md">
                                        </div>
                                    </div>
                                </template>
                            </MoleculesSladerControlItem>
                        </template>
                    </MoleculesSladerBase>
                </div>
                <AtomProductStatus
                :news="checkDate(data.createAt as unknown as string)"
                :discount="data.discount > 0" class="left-0 top-24 lg:text-sm lg:py-0.5" />
            </div>
            <div class="w-1/2 bg-gray-100 p-12 xl:p-8 xl:w-7/12">
                <div class="relative">
                    <div class="absolute z-20 -right-1 top-1 sm:scale-75 sm:top-1.5 sm:right-1.5">
                        <ClientOnly>
                            <AtomButtonStandart class="group p-1" @click="storeFavorite.toggleItem(data.id)">
                                <CreateIcon name="like_28_31"
                                :att="{ class: [ storeFavorite.findItem(data.id).value ? 'fill-red-500 stroke-none' : 'fill-none stroke-gray-500 stroke-[1.5px]'] }"/>
                            </AtomButtonStandart>
                        </ClientOnly>
                    </div>

                    <h3 class="text-4xl pr-12 text-black-500 mb-6 xl:text-3xl lg:mb-5 lg:text-xl">{{ data.name }}
                        <span class="text-gray-300">{{ data.art }}</span>
                    </h3>
                    <div class="decor-line"></div>
                    <div class="flex py-6 justify-between lg:py-5 items-center">
                        <AtomFormRating :quantity-star="getAverageValue()" class="grow justify-between lg:scale-90" :name="'star_25_25'"/>
                        <p class="ml-4 grow text-gray-500 lg:text-sm">Отзывы ({{ data.reviews.length }})</p>
                        <AtomButtonShare @click="onClick" class="p-0 " >
                        <template #default>
                            <CreateIcon name="share_25_25" :att="{ class: 'fill-blue-500' }" class="lg:scale-75"/>
                        </template>
                        </AtomButtonShare>
                    </div>
                    <div class="decor-line"></div>
                    <div class="flex py-6 lg:py-5">
                        <p class="mr-5"><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemArt }}</p>
                        <p><span class="text-gray-500 pr-3">Артикул:</span>{{ data.itemMod }}</p>
                    </div>
                    <div class="decor-line"></div>
                    <div class="py-6 flex justify-between lg:py-5">
                        <AtomProductPrice :price="data.price" :discount="data.discount"
                            class="text-4xl xl:text-3xl lg:text-2xl" />
                        <AtomOtherSelectionQuantity :data-quantity="data.quantity"
                            @number-of-products="(e: number) => numberOfProduct = e" class="lg:py-1.5 lg:px-3" />
                    </div>
                    <div class="decor-line"></div>
                    <div class="pt-6 flex items-center justify-between lg:pt-5">
                        <AtomButtonStandart
                        @click="storeBasket.addItem({
                            data: { ...props.data, characteristic: [], reviews: [] },
                            quantity: numberOfProduct
                        })"
                        class="flex bg-blue-500  justify-center items-center px-16 lg:px-10"
                        :disabled="data.quantity === 0">
                            <CreateIcon name="basket_25_25" :att="{ class: 'fill-white' }"/>
                            <p class="text-white ml-2">В корзину</p>
                        </AtomButtonStandart>
                        <p class="text-lg font-medium" :class="[data.quantity === 0 ? 'text-red-500' : 'text-yellow-500 ']">
                            {{ data.quantity > 0 ? 'В наличии' : 'Нет в наличии' }}</p>
                    </div>
                </div>
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
const storeAlert = _alert()
const _content = useState<Content | null>('CONTENT_APP')
const numberOfProduct = ref<number>(1)

onMounted(() => {
    test(navigator)
})
function getAverageValue(): number {
   return props.data.reviews.reduce((s,_) => s + (_.ranting || 0),0)
}

function onClick() {
    copyLink()
    storeAlert.create({ text: _content.value?.ALERT_COPE_LINK_INFO_TEXT || null, state: 'info' })
}
</script>