<template>
    <MoleculesModalBasketProduct >
        <template #default="{  index, basketData, resData }">
            <MoleculesItemBasketCard :res-data="resData" :index="index" :basket-data="basketData"/>
        </template>
    </MoleculesModalBasketProduct>
</template>