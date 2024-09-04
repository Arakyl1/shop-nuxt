 <!-- <Status :status="getStatus(content)"
                    :class="className['status']"
                    class=""
                    data-left /> -->
<template>
    <UITBlockFlex :tag="'article'" class="h-full">
        <UITBlockFlex :direction="'column'" class="w-full h-full gap-4">
            <div class="w-full aspect-ratio rounded-xl relative animate-loader-data "
                :class="[!content ? 'liner__gradient-loader' : 'bg-gray-100']"
                :style="{ '--lin-grad-loader--deg': '90deg' }">
                <template v-if="content">
                    <div :class="className['button-like']">
                        <slot name="bt-favorite" v-bind="{ content }">
                            <ClientOnly>
                                <ButtonLike
                                :active="checkAvailabilityItemInFavorites(content.id)"
                                @click="toggle({ 'card_id': content.id })"/>
                            </ClientOnly>
                        </slot>
                    </div>
                    <div :class="className['image']" class="p-6 /md:p-8">
                        <UITBlockFlex :tag="'picture'" class="h-full w-full" :justify="'center'">
                            <img :src="content.image.length ?
                                changeValueImageSize(content.image[0].link, {
                                    'heigth': 'h_240',
                                    'bgrem': 'co_white,e_make_transparent:1'
                                }) :''"
                                :alt="content.name">
                        </UITBlockFlex>
                    </div>

                </template>
            </div>
            <UITBlockFlex :direction="'column'" class="grow gap-2">
                <div v-if="content" class="grow w-full">
                    <UITButton :tag="'nuxt-link'"
                    :to="`/catalog/${content.id}`"
                    :mode="'link'"
                    :class="[$style['button-link'], 'line-clamp-1']"
                    class="/xl:text-md"
                    :target="!isProductCardPage($route) ? '_blank' : '_self'"
                    rel="noopener">
                        <UITParagraphText :tag="'span'" class="color-inherit">{{ content.name }}</UITParagraphText>
                        <UITParagraphText :tag="'span'" :color="'gray-300'">{{ content.art }}</UITParagraphText>
                    </UITButton>
                </div>
                 <UITBlockFlex v-else :class="className['skeleton-elem']" :direction="'column'" class="gap-2">
                    <UITSkeleton tag="p" :loader="!Boolean(content)" />
                    <UITSkeleton tag="p" :loader="!Boolean(content)" />
                 </UITBlockFlex>

                <UITBlockFlex :justify="'between'" class="gap-4">
                    <UITSkeleton v-if="!content"
                        :class="className['skeleton-elem-secondary']" 
                        tag="p" :animated="true"
                        :loader="!Boolean(content)" />
                    <!-- <ProductPrice v-else
                        :price="content.price"
                        class="/md:text-md /xl:text-lg" 
                        :discount="content.discount > 0" /> -->
                    <UITButton
                    :mode="'gray-icon'"
                    :icon-left="{ icon: 'static', size: '24_24' }"/>
                </UITBlockFlex>
            </UITBlockFlex>
            <slot name="bt-basket" v-bind="{ content, add }">
                <UITButton v-if="content && !isNumber(content)"
                :icon-left="{ icon: 'basket', size: viewport.isGreaterOrEquals('lg') ? '25_25' : '20_20', type: 'monocolor' }"
                :text="t('BASE_BUTTON.BASKET_ADD')"
                :mode="'blue'"
                :height="'h-10'"
                :disabled="content.quantity === 0"
                @click.stop="add({ 'card_id': content.id, count: 1 })"
                class="justify-center p-2 w-full  text-sm md:text-md md:h-12"/>
            </slot> 
        </UITBlockFlex>
    </UITBlockFlex>
</template>
<script setup lang="ts">
import { UITBlockFlex, UITBlockCard, UITButton, UITSkeleton, UITParagraphText } from '#components';
import { ProductCardBase } from "~~/type/intex";
import { t } from "#imports";
import ButtonLike from "@/components/Atom/Button/Like.vue";
// import Button from "components/UI/Button/index.vue";
// import Flex from "@/components/UI/Flex/Flex.vue";
import ProductPrice from "@/components/Templates/Product/Price.vue";
// import Skeleton from "@/components/UI/Skeleton/Skeleton.vue";
import { default as Status } from "@/components/UI/Status/Status.vue";
// import ButtonLike from "@/components/Templates/Button/ButtonLike.vue";
import { getStatus } from '@/utils/other';
import { isProductCardPage } from "@/utils/routerHelper";


const props = withDefaults(defineProps<{
    data: ProductCardBase | null
}>(), { data: null })

const viewport = useViewport()
const className = useCssModule()
const { add } = useBasket()
const { toggle, checkAvailabilityItemInFavorites } = useFavorite()

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
    width: 100%;
    height: 100%;
    z-index: 10;
}
.image img {
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
}
.button-link > p {
    text-wrap: wrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
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
    .skeleton-elem-secondary {
        font-size: var(--text-base);
    }
    .price {
        font-size: var(--text-base);
    }
}

@media screen and (max-width: 600px) {
    .button-like {
        transform: scale(0.75);
        top: 0.25rem;
        right: 0.25rem;
    }
}
</style>