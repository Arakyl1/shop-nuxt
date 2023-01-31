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
                <FeaturesAddFavorite :id="elem.id">
                    <template #default="{ addProducFavorite, checkIdInFavorites }">
                        <ClientOnly>
                            <UIStandart class="group p-1" @click="addProducFavorite"
                            :class="[ checkIdInFavorites ? 'icon-red' : 'icon-black']">
                                <UIIconLike class="h-7"/>
                            </UIStandart>
                        </ClientOnly>
                    </template>
                </FeaturesAddFavorite>
            </template>
            <template #bt-basket>
                <FeaturesAddBasket :id="elem.id">
                    <template #default="{ addBasketProduct}">
                    <UIStandart @click="addBasketProduct"
                    class="flex bg-blue-500  justify-center items-center">
                        <UIIconBasketSmall class="group icon-white"/>
                        <p class="text-white ml-2">В корзину</p> 
                    </UIStandart>
                    </template>
                </FeaturesAddBasket>
            </template>
        </EntitiesItemProductCard>
        <EntitiesItemBase v-else/>
    </template>
</EntitiesOtherSladerBase>
</template>
<script setup lang="ts">
const props = defineProps<{searchCategor: string}>()
const data = ref<any>(null)

data.value = await getByCategorProduct({ where: { [props.searchCategor]: true }, ...selectForCard()})

const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)]'
}
</script>