<template>
    <Flex :tag="'article'" class="h-full">
        <Flex :direction="'column'" class="w-full h-full gap-4">
            <div class="w-full aspect-ratio rounded-xl relative animate-loader-data "
                :class="[!content ? 'liner__gradient-loader' : 'bg-gray-100']"
                :style="{ '--lin-grad-loader--deg': '90deg' }">
                <template v-if="content">
                    <Status :status="getStatus(content)" :class="className['status']" data-left />
                    <div :class="className['button-like']">
                        <slot name="bt-favorite" v-bind="{ content }">
                            <ClientOnly>
                                <ButtonLike v-if="content && !isNumber(content)"
                                :active="storeFavorite.findItem(content.id).value"
                                @click="storeFavorite.toggleItem(content.id)"/>
                            </ClientOnly>
                        </slot>
                    </div>
                    <div :class="className['image']">
                        <Flex :tag="'picture'" class="h-full w-full" :justify="'center'">
                            <img :src="content.image.length ?
                                changeValueImageSize(content.image[0].link, {
                                    'heigth': 'h_320',
                                    'bgrem': 'co_white,e_make_transparent:1'
                                }) :''"
                                :alt="content.name">
                        </Flex>
                    </div>

                </template>
            </div>
            <Flex :direction="'column'" class="grow gap-y-2 w-full">
                <div v-if="content" class="grow w-full">
                    <Button :tag="'nuxt-link'"
                    :to="`/catalog/${content.id}`"
                    :mode="'link'"
                    :class="className['button-link']">
                        <span class="color-inherit">{{ content.name }}</span>
                        <span class="text-gray-300 px-2">{{ content.art }}</span>
                    </Button>
                </div>
                 <Flex v-else :class="className['skeleton-elem']" :direction="'column'" class="gap-y-2 w-full">
                    <Skeleton tag="p" :loader="!Boolean(content)" />
                    <Skeleton tag="p" :loader="!Boolean(content)" />
                 </Flex>

                <Flex :justify="'between'" class="w-full gap-x-4">
                    <Skeleton v-if="!content"
                        :class="className['skeleton-elem-secondary']" 
                        tag="p" :animated="true"
                        :loader="!Boolean(content)" />
                    <ProductPrice v-else
                        :price="content.price"
                        :class="className['price']" 
                        :discount="content.discount > 0" />
                    <Button
                    :appearance="'gray-icon'"
                    :icon-left="{ key: 'static', size: '24_24' }"/>
                </Flex>
            </Flex>
            <slot name="bt-basket" v-bind="{ content, add }">
                <Button v-if="content && !isNumber(content)"
                :icon-left="{ key: 'basket', size: viewport.isGreaterOrEquals('lg') ? '25_25' : '20_20' }"
                :text="common.BASKET_ADD|| 'add basket'"
                :appearance="'blue'"
                :disabled="content.quantity === 0"
                @click.stop="add({ 'card_id': content.id, count: 1 })"
                :class="className['button-basket']"
                class="h-12"/>
            </slot> 
        </Flex>
    </Flex>
</template>
<script setup lang="ts">
import { Content, ProductCardBase } from "~~/type/intex";
import { basket as _basket } from "@/stores/basket";
import { alert as _alert } from "@/stores/alert";
import { favorite as _favorite } from "@/stores/favorite";
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import ProductPrice from "@/components/Templates/Product/Price.vue";
import Skeleton from "@/components/UI/Skeleton/Skeleton.vue";
import { default as Status } from "@/components/UI/Status/Status.vue";
import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
import { getStatus } from '#imports';
import { BASE_BUTTON as common } from "@/common/C";

const viewport = useViewport()

const props = withDefaults(defineProps<{
    data: ProductCardBase | null
}>(), { data: null })



const storeFavorite = _favorite()
const className = useCssModule()
const { add } = useBasket()

const content = computed<ProductCardBase | null>(() => props.data)

</script>

<style lang="css" module>
.status {
    top: 1rem;
}
.button-like {
    position: absolute;
    z-index: 30;
    right: 0.5rem;
    top: 0.5rem;
}
.image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
}
.image img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
}
.button-link {
    font-size: var(--text-md);
}
.button-link > p {
    text-wrap: wrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
}
.button-basket {
    width: 100%;
    justify-content: center;
    font-size: var(--text-base);
}

.price {
    font-size: var(--text-lg);
}
.skeleton-elem {
    font-size: var(--text-base);
}
.skeleton-elem-secondary {
    font-size: var(--text-lg);
}

@media screen and (max-width: 1024px) {
    .skeleton-elem {
        font-size: var(--text-sm);
    }
    .price {
        font-size: var(--text-lg);
    }
}

@media screen and (max-width: 768px) {
    .button-basket {
        padding: 0.5rem;
    }
    .skeleton-elem-secondary {
        font-size: var(--text-base);
    }
    .price {
        font-size: var(--text-base);
    }
}

@media screen and (max-width: 600px) {
    .status {
        padding: 0rem 0.5rem;
    }
    .button-like {
        transform: scale(0.75);
        top: 0.25rem;
        right: 0.25rem;
    }
    .button-link {
        font-size: var(--text-base);
    }
    .button-basket {
        font-size: var(--text-sm);
    }
}
</style>