<template>
    <EntitiesModalFavoriteProduct>
        <template #default="{ item }">
            <EntitiesItemProductCard :id="item" class="group is-pos-info-for-stock">
                <template #bt-favorite>

                    <ClientOnly>
                        <UIStandart class="group p-1" @click="addFatoriteItem(item)"
                            :class="[checkIdInFavorites(item).value ? 'icon-red' : 'icon-black']">
                            <UIIconLike class="h-7" />
                        </UIStandart>
                    </ClientOnly>

                </template>
                <template #bt-basket="{ content }">
                    <UIStandart class="flex bg-blue-500  justify-center items-center" @click="addBasket({
                        id: item,
                        quantity: 1,
                        price: content.sale ? Math.floor(content.price * 0.9) : content.price
                    })">
                        <UIIconBasketSmall class="group icon-white" />
                        <p class="text-white ml-2">В корзину</p>
                    </UIStandart>
                </template>
            </EntitiesItemProductCard>
        </template>
    </EntitiesModalFavoriteProduct>
</template>

<script setup lang="ts">
const { addBasket } = useBasket()
const { checkIdInFavorites, addFatoriteItem } = useFavorite()
</script>