<template>
    <MoleculesModalFavoriteProduct>
        <template #default="{ item }">
            <MoleculesItemProductCard :id="item" :data="null" class="group is-pos-info-for-stock">
                <template #bt-favorite>

                    <ClientOnly>
                        <AtomButtonStandart class="group p-1" @click="addFatoriteItem(item)"
                            :class="[checkIdInFavorites(item).value ? 'icon-red' : 'icon-black']">
                            <IconLike class="h-7" />
                        </AtomButtonStandart>
                    </ClientOnly>

                </template>
                <template #bt-basket="{ content }">
                    <AtomButtonStandart class="flex bg-blue-500  justify-center items-center" @click="addBasket({
                        id: item,
                        quantity: 1,
                        price: content.sale ? Math.floor(content.price * 0.9) : content.price
                    })"
                    :disabled="!checkProductAvailability(content)">
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