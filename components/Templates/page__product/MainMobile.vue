<template>
    <section>
        <Group class="w-full gap-y-4">
            <Title :tag="'h2'"
            :text="data.name "
            :before-content="data.art"
            :before-content-class="'text-gray-300'"
            :class="className['name']"/>
            <div class="decor-line"></div>
            <Flex :justify="'start'" class="gap-x-4 w-full">
                <Rating :readonly="true"
                :value="middleRating"
                :width="26"
                class="gap-x-8"/>
                <p class="grow text-gray-500">{{ `${common.TEXT_REVIEWS} (${data.reviews.length})` }}</p>
            </Flex>
            <div class="decor-line"></div>
            <Flex class="gap-x-5">
                <p :class="className['attr']" @click="copyArticle(data.itemArt)">
                    <span class="text-gray-300">{{common.TEXT_ARTICLE  }} :</span>{{ data.itemArt }}
                </p>
                <p :class="className['attr']">
                    <span class="text-gray-300">{{ common.TEXT_MODEL }} :</span>{{ data.itemMod }}
                </p>
            </Flex>
            <div class="relative" :class="className['photo']">
                <Flex :justify="'center'" class="">
                    <CardGridScroll :data="data.image" :container="'xs'">
                        <template #default="{ elem }">
                            <Flex class="w-full" :justify="'center'">
                                <Flex :justify="'center'"  :class="className['picture']">
                                    <img :src="changeValueImageSize(elem.link, { 'crop': 'c_fill', 'obj': 'g_auto:subject', heigth: 'h_480' })"
                                    :alt="data.name">
                                </Flex>
                            </Flex>
                        </template>
                        <template #footer="{ updateScrolLeft, indexActiveButton }" v-if="data?.image?.length > 1">
                            <ControlItem
                            class="hidden gap-x-4"
                            :data="data.image.length"
                            :index-active-button="indexActiveButton"
                            :update-scroll="updateScrolLeft"
                            :item-class="'aspect-ratio h-14 w-14 justify-center'">
                                <template #default="{ item }">
                                    <Flex :justify="'center'"
                                        :class="className['control-item']"
                                        :data-border-color="(item-1) === indexActiveButton ? 'yellow' : 'blue'">
                                        <img :src="changeValueImageSize(data.image[(item-1)].link, { 'heigth': 'h_48' })" :alt="data.name"
                                            >
                                    </Flex>
                                </template>
                            </ControlItem>
                        </template>
                    </CardGridScroll>
                </Flex>
                <Status :status="getStatus(data)" data-left :class="className['status']"  />
            </div>
            <p class="text-md font-medium" :class="[data.quantity === 0 ? 'text-red-500' : 'text-yellow-500 ']">
                {{ data.quantity > 0 ? `${common.AVAILABLE}: ${data.quantity}` : common.NOT_AVAILABLE }}</p>
            <Flex :justify="'between'" class="w-full ">
                <ProductPrice :price="data.price" :discount="data.discount"
                    class="text-xl " />
                <Counter :max-value="data.quantity" class="py-2 px-3"
                    @update:value="(e: number) => numberOfProduct = e"/>
            </Flex>
            <Flex class="w-full gap-4">
                <Button
                class="text-base grow h-12 justify-center"
                :text="common.BUTTON_BASKET_ADD"
                :appearance="'blue'"
                :icon-left="{ key: 'basket', size: '25_25' }"
                :disabled="data.quantity === 0"
                @click="addBasket({
                    data: { ...props.data, characteristic: [], reviews: [] },
                    quantity: numberOfProduct
                })"/>
                <ClientOnly>
                    <Button
                    class="h-12 justify-center"
                    :appearance="'blue'"
                    :square="true"
                    :active="true"
                    :icon-left="{ key: 'like', size: '25_25' }"
                    :style="{ '--bg-color-active': 'var(--blue-500)', '--fill-active': 'var(--red-500)'}"/>
                </ClientOnly>
                <Button
                class="h-12 justify-center"
                :appearance="'blue'"
                :square="true"
                :icon-left="{ key: 'share', size: '25_25' }"
                @click="onClick"/>
            </Flex>
        </Group>
    </section>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import { basket as _basket } from "@/stores/basket";
import { favorite as _favorite } from "@/stores/favorite";
import { alert as _alert } from "@/stores/alert";
import { getStatus } from '#imports';
import { PAGE_CATALOG_ID as common } from "@/common/C";
import ControlItem from "@/components/Templates/ControlElements/Item.vue";
import Button from "@/components/UI/Button/Button.vue";
import Rating from "@/components/UI/Rating/Rating.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Counter from "@/components/UI/Counter/Counter.vue";
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import ProductPrice from "@/components/Templates/Product/Price.vue";
import { default as Status, type Props as StatusProps } from "@/components/UI/Status/Status.vue";


const props = defineProps<{ data: ProductCardFull }>()
const storeFavorite = _favorite()
const { copy } = useShare()
const storeAlert = _alert()
const numberOfProduct = ref<number>(1)
const className = useCssModule()


const middleRating = computed(() => props.data.reviews.reduce((s,_) => s + (_.ranting || 0),0) / props.data.reviews.length  || 0)

function onClick() {
    if (!window) return
    copy(window.location.href)
    storeAlert.create({ key: 'COPE_LINK', state: 'info' })
}

function copyArticle(key: string) {
    if (!key) return
    copy(key)
    storeAlert.create({ key: 'COPY_ARTICLE', state: 'info' })
}

function addBasket(item: any) {
    // if (storeBasket.findItem(item.data.id)) {
    //     storeAlert.create({ 'text': _content.value?.ALERT_BASKET_PRODUCT_IS_ALREADY_THERE || null, state: 'info'  })
    // } else {
    //     storeBasket.addItem({ quantity: item.quantity, data: item.data })
    //     storeAlert.create({ 'text':  _content.value?.ALERT_BASKET_ADD_ITEM || null , state: 'info'  })
    // }
}

// import type { Content, ProductCardFull } from '~~/type/intex';
// import CreateIcon from "@/content/icons/create";
// import { basket as _basket } from "@/stores/basket";
// import { favorite as _favorite } from "@/stores/favorite";
// import { alert as _alert } from "@/stores/alert";

// const props = defineProps<{ data: ProductCardFull }>()
// const storeBasket = _basket()
// const storeFavorite = _favorite()
// const { copyLink } = useShare()
// const numberOfProducts = ref<number>(1)
// const storeAlert = _alert()
// const _content = useState<Content | null>('CONTENT_APP')

// const middleRating = computed(() => props.data.reviews.reduce((s,_) => s + (_.ranting || 0),0) / props.data.reviews.length)

// function onClick() {
//     copyLink()
//     storeAlert.create({ text: _content.value?.ALERT_COPE_LINK_INFO_TEXT || null, state: 'info' })
// }

// function addBasket(item: Parameters<typeof storeBasket['addItem']>[0]) {
//     if (storeBasket.findItem(item.data.id)) {
//         storeAlert.create({ 'text': _content.value?.ALERT_BASKET_PRODUCT_IS_ALREADY_THERE || null, state: 'info'  })
//     } else {
//         storeBasket.addItem({ quantity: item.quantity, data: item.data })
//         storeAlert.create({ 'text':  _content.value?.ALERT_BASKET_ADD_ITEM || null , state: 'info'  })
//     }
// }
</script>


<style lang="css" module>

.photo [ data-card-grid-scroll] > ul {
    aspect-ratio: 9/8;
}
.picture {
    max-width: 80%;
    max-height: 80%;
    aspect-ratio: 1;
    object-fit: contain;
}
.picture > img {
    max-width: 90%;
    max-height: 90%;
}

.control-item {
    border-radius: var(--rounded-xl);
    overflow: hidden;
    border-width: 2px;
    border-style: solid;
    transition: all ease 0.23s;
    aspect-ratio: 1;
    padding: 0.125rem;
}
[data-border-color="yellow"] {
    border-color: var(--yellow-500);
}
[data-border-color="blue"] {
    border-color: var(--blue-500);
}

.status {
    top: 1.5rem;
    transform: translateX(-0.5rem);
}

.button-like {
    position: absolute;
    right: -0.25rem;
    top: 0.25rem;
    z-index: 20;
}
.name {
    padding-right: 2rem;
}
.name > span:first-child {
    margin-right: 0.5rem;
}
.attr >span {
    margin-right: 0.5rem;
}
/* class="absolute z-20 -right-1 top-1 sm:scale-75 sm:top-1.5 sm:right-1.5" */
</style>