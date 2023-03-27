<template>
    <EntitiesOtherSladerBase :data="data" :containerClass="style.container" class="mb-16 xl:mb-12">
        <template #header="{ prevItem, nextItem }">
            <EntitiesOtherSladerControl :prevItem="prevItem" :nextItem="nextItem">
                <slot name="title">Slader title</slot>
            </EntitiesOtherSladerControl>
        </template>
        <template #item="{ elem }">
            <EntitiesItemProductCard v-if="elem" :data="elem" class="group is-pos-info-for-stock">
                <template #bt-favorite>
                    <ClientOnly>
                        <UIStandart class="group p-1" @click="addFatoriteItem(elem.id)"
                            :class="[checkIdInFavorites(elem.id).value ? 'icon-red' : 'icon-black']">
                            <UIIconLike class="h-7" />
                        </UIStandart>
                    </ClientOnly>
                </template>
                <template #bt-basket>
                    <UIStandart class="flex bg-blue-500  justify-center items-center" @click="addBasket({
                        id: elem.id,
                        quantity: 1,
                        price: elem.sale ? Math.floor(elem.price * 0.9) : elem.price
                    })">
                        <UIIconBasketSmall class="group icon-white" />
                        <p class="text-white ml-2">В корзину</p>
                    </UIStandart>
                </template>
            </EntitiesItemProductCard>
            <EntitiesItemBase v-else />
        </template>
    </EntitiesOtherSladerBase>
</template>
<script setup lang="ts">
import { _ProductCardBase, selectOptionBase } from '~~/type/intex';

const props = defineProps<{ searchCategor: object }>()
const data = ref<_ProductCardBase[] | null>(null)
const { getInfo: getInfoProduct } = useProduct()
const { addBasket } = useBasket()
const { checkIdInFavorites, addFatoriteItem } = useFavorite()

async function getDataByCategor() {
    const res = await getInfoProduct<_ProductCardBase[]>({ where: props.searchCategor, ...selectOptionBase }, 'many=true')
    if (res) data.value = res
}

getDataByCategor()

const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)]'
}
</script>