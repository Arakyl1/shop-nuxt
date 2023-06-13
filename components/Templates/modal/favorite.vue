<template>
    <MoleculesModalFavoriteProduct>
        <template #default="{ item }">
            <MoleculesItemProductCard :data="item" class="group is-pos-info-for-stock">
                <template #bt-favorite="{ content }">
                    <ClientOnly>
                        <AtomButtonStandart class="group p-1" @click="addFatoriteItem(content.id)"
                            :class="[checkIdInFavorites(content.id).value ? 'icon-red' : 'icon-black']">
                            <IconLike class="h-7" />
                        </AtomButtonStandart>
                    </ClientOnly>

                </template>
                <template #bt-basket="{ content }">
                    <AtomButtonStandart
                    v-if="content && !isNumber(content)"
                    class="flex bg-blue-500  justify-center items-center"
                    @click="addBasket({
                        id: content.id,
                        quantity: 1,
                        price: content.sale ? Math.floor(content.price * 0.9) : content.price
                    })"
                    :disabled="!checkAvailability(content)">
                        <IconBasketSmall class="group icon-white" />
                        <p class="text-white ml-2">В корзину</p>
                    </AtomButtonStandart>
                </template>
            </MoleculesItemProductCard>
        </template>
    </MoleculesModalFavoriteProduct>
</template>

<script setup lang="ts">

const { addBasket } = useBasket()
const { checkIdInFavorites, addFatoriteItem } = useFavorite()
</script>