<template>
    <section>
        <Flex class="w-full">
            <div class="relative w-1/2" :class="className['photo']">
                <Flex :justify="'center'" class="px-16 xl:px-12">
                    <CardGridScroll :data="data.image" :container="'xs'">
                        <template #default="{ elem }">
                            <Flex :justify="'center'" :class="className['picture']">
                                <img :src="changeValueImageSize(elem.link, { 'crop': 'c_fill', 'obj': 'g_auto:subject', heigth: 'h_480' })"
                                :alt="data.name">
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
            <Card :appearance="'gray'" :container="'xl'" class="h-full w-1/2">
                <Flex class="relative gap-y-6" :direction="'column'" :align="'flex-start'">
                    <div :class="className['button-like']">
                        <ClientOnly>
                            <ButtonLike :active="checkAvailabilityItemInFavorites(data.id)"
                            @click="toggle({ card_id: data.id })"/>
                        </ClientOnly>
                    </div>
                    <Title :tag="'h2'"
                    :text="data.name "
                    :before-content="data.art"
                    :before-content-class="'text-gray-300'"
                    :class="className['name']"/>
                    <div class="decor-line"></div>
                    <Flex :justify="'between'" class="gap-x-4 w-full">
                        <Rating :readonly="true"
                        :value="middleRating"
                        :width="26"
                        class="gap-x-8"/>
                        <p class="grow text-gray-500">{{ `${common.TEXT_REVIEWS} (${data.reviews.length})` }}</p>
                        <Button
                        :icon-left="{ key: 'share', size: '25_25' }"
                        :appearance="'blue-icon'"
                        @click="onClick"/>
                        
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
                    <div class="decor-line"></div>
                    <Flex :justify="'between'" class="w-full">
                        <ProductPrice :price="data.price" :discount="data.discount"
                            class="text-xl " />
                        <Counter :max-value="data.quantity"
                            @update:value="(e: number) => numberOfProduct = e" class="lg:py-1.5 lg:px-3" />
                    </Flex>
                    <div class="decor-line"></div>
                    <Flex :justify="'between'" class="w-full">
                        <Button
                        class="text-base px-16 h-12 lg:px-10"
                        :text="common.BUTTON_BASKET_ADD"
                        :appearance="'blue'"
                        :icon-left="{ key: 'basket', size: '25_25' }"
                        :disabled="data.quantity === 0"
                        @click="add({ card_id: data.id, count: numberOfProduct })"/>

                        <p class="text-md font-medium" :class="[data.quantity === 0 ? 'text-red-500' : 'text-yellow-500 ']">
                            {{ data.quantity > 0 ? `${common.AVAILABLE}: ${data.quantity}` : common.NOT_AVAILABLE }}</p>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    </section>
</template>
<script setup lang="ts">
import type { ProductCardFull } from '~~/type/intex';
import { alert as _alert } from "@/stores/alert";
import { getStatus } from '#imports';
import { PAGE_CATALOG_ID as common } from "@/common/C";
import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
import ControlItem from "@/components/Templates/ControlElements/Item.vue";
import Button from "@/components/UI/Button/Button.vue";
import Rating from "@/components/UI/Rating/Rating.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import Card from "@/components/UI/Card/Card.vue";
import Counter from "@/components/UI/Counter/Counter.vue";
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import ProductPrice from "@/components/Templates/Product/Price.vue";
import { default as Status, type Props as StatusProps } from "@/components/UI/Status/Status.vue";


const props = defineProps<{ data: ProductCardFull }>()
const { copy } = useShare()
const storeAlert = _alert()
const { add } = useBasket()
const { toggle, checkAvailabilityItemInFavorites } = useFavorite()
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