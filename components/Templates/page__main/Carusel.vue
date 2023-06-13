<template>
    <MoleculesSladerBase :data="data" :containerClass="style.container" class="mb-16 xl:mb-12">
        <template #header="{ prevItem, nextItem, sladerValueScroll }">
            <MoleculesSladerControl :prevItem="prevItem" :nextItem="nextItem" :slader-value-scroll="sladerValueScroll">
                <slot name="title">Slader title</slot>
            </MoleculesSladerControl>
        </template>
        <template #item="{ elem }">
            <MoleculesItemProductCard  :data="elem" class="group is-pos-info-for-stock">
                <template #bt-favorite="{ content }">
                    <ClientOnly>
                        <AtomButtonStandart
                        v-if="content && !isNumber(content)"
                        class="group p-1" @click="addFatoriteItem(content.id)"
                            :class="[checkIdInFavorites(content.id).value ? 'icon-red' : 'icon-black']">
                            <IconLike class="h-7" />
                        </AtomButtonStandart>
                    </ClientOnly>
                </template>
                <template #bt-basket="{ content }">
                    <AtomButtonStandart
                    v-if="content && !isNumber(content)"
                    class="flex bg-blue-500  justify-center items-center md:py-2 sm:text-sm"
                    @click="addBasket({
                        id: content.id,
                        quantity: 1,
                        price: content.sale ? Math.floor(content.price * 0.9) : content.price
                    })"
                    :disabled="!checkAvailability(content)">
                        <IconBasketSmall class="group icon-white sm:w-5" />
                        <p class="text-white ml-2">В корзину</p>
                    </AtomButtonStandart>
                </template>
            </MoleculesItemProductCard>
        </template>
    </MoleculesSladerBase>
</template>
<script setup lang="ts">
import { Prisma } from '@prisma/client';
import { type _ProductCardBase, productCardBaseParamsSelect } from '~~/type/intex';

const props = defineProps<{ searchCategor: Prisma.ProductCardWhereInput }>()
const { getInfo: getInfoProduct } = useProduct()
const { addBasket } = useBasket()
const { checkIdInFavorites, addFatoriteItem } = useFavorite()


const { data } = await getInfoProduct<_ProductCardBase[]>(
    { where: props.searchCategor, ...productCardBaseParamsSelect, orderBy: { 'availability': 'desc' } },
    { many: true },
    { key: Object.keys(props.searchCategor).join(',') })

const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)]'
}
</script>