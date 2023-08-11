<template>
    <MoleculesModalBasketProduct >
        <template #default="{ index, basketData, resData }">
            <MoleculesCardBasket :data="resData" :index="index" :basket-data="basketData"/>
        </template>
    </MoleculesModalBasketProduct>
</template>