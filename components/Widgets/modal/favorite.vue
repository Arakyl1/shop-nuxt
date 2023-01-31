<template>
    <EntitiesModalFavoriteProduct>
        <template #default="{ item }">
            <EntitiesItemProductCard :id="item" class="group is-pos-info-for-stock">
                <template #bt-favorite>
                    <FeaturesAddFavorite :id="item">
                        <template #default="{ addProducFavorite, checkIdInFavorites }">
                            <ClientOnly>
                                <UIStandart class="group p-1" @click="addProducFavorite"
                                    :class="[checkIdInFavorites ? 'icon-red' : 'icon-black']">
                                    <UIIconLike class="h-7" />
                                </UIStandart>
                            </ClientOnly>
                        </template>
                    </FeaturesAddFavorite>
                </template>
                <template #bt-basket>
                    <FeaturesAddBasket :id="item">
                        <template #default="{ addBasketProduct }">
                            <UIStandart @click="addBasketProduct" class="flex bg-blue-500  justify-center items-center">
                                <UIIconBasketSmall class="group icon-white" />
                                <p class="text-white ml-2">В корзину</p>
                            </UIStandart>
                        </template>
                    </FeaturesAddBasket>
                </template>
            </EntitiesItemProductCard>
        </template>
    </EntitiesModalFavoriteProduct>
</template>