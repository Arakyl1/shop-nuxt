<template>
    <Group class="gap-6" :class="className['body']">
        <Title :tag="'h3'" :text="common.TITLE"/>
        <div class="decor-line"></div>
        <Group v-if="basketLength" class="gap-3 grow  w-full">
            <Group class="grow w-full">
                <article class="py-4 w-full" v-for="item in basket!.item" :key="item.cardId">
                    <Flex class="gap-6">
                         <Image alt="image product" class="h-12" :square="true"
                        :src="changeValueImageSize(item.card.image[0].link,
                            { 'heigth': 'h_56', 'bgrem': 'co_white,e_make_transparent:1' })"/>
                    
                        <div class="grow" :class="className['product-name']">
                            <Button
                            :tag="'nuxt-link'"
                            :to="`/catalog/${item.cardId}`"
                            :text="item.card.name"
                            :mode="'link'"
                            target="_blank"
                            class="text-md"/>
                            <p class="text-gray-500 text-md ">{{ item.card.art }}</p>
                        </div>

                        <div class="none /md:block">
                            <ProductPrice
                            class="text-base"
                            :price="item.card.price"
                            :discount="item.card.discount > 0" />
                        </div>
                        <div class="none /md:block">
                            <Counte
                            :value="item.count"
                            :max-value="item.card.quantity"
                            :class="className['counter']"/>
                        </div>
                        <Button
                        :appearance="'gray-icon'"
                        :icon-left="{ icon: 'close', 'size': '16_16' }"
                        @click.stop="remove({ 'item_id': item.id })"/>
                    </Flex>
                </article>
            </Group>
            <div class="decor-line"></div>
            <p class="text-md font-medium text-blue-500"
            >{{ common.TOTAL_SUM + transformPrice('ru', { currency: 'BYN', style: 'currency' }, totalOrderAmount) }}</p>
        </Group>
        <p v-else class="text-lg text-gray-700">{{ common.EMPTY_CONTENT }}</p>
    </Group>
</template>

<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Image from "@/components/UI/Image/Image.vue";
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import ProductPrice from "@/components/Templates/Product/Price.vue";
import Counter from "@/components/UI/Counter/Counter.vue";
import { user as _user } from "@/stores/user";
import { MODAL_BASKET as common } from "@/common/C";


const storeUser = _user()
const { basket, basketLength } = storeToRefs(storeUser)
const { remove } = useBasket()
const className = useCssModule()


const totalOrderAmount = computed(() => basket.value ? basket.value.item.reduce((s, i) => s + ((i.card.price * ((100 - i.card.discount) / 100)) * i.count), 0) : 0)


function transformPrice(reg:string, option: object, price:number):string {
    return new Intl.NumberFormat(reg, { minimumFractionDigits: 0, ...option }).format(price)
}

</script>


<style lang="css" module>
/* purgecss ignore */
.body {
    /* max-width: 900px; */
    width: 940px;
    aspect-ratio: 5/3;
    /* min-width: 100%; */
}


@media (max-width: 768px) {
    .body {
        width: 100%;
        aspect-ratio: auto;
        height: 100%;
    }

    .product-name > * {
        text-align: start;
        font-size: var(--text-sm) !important;
    }
    .product-name > button> p {
        white-space: wrap;
    }
}
</style>