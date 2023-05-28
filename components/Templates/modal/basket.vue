<template>
    <MoleculesModalBasketProduct >
        <template #default="{ item, index, basketData }">
            <MoleculesItemBasketCard :item="item" :index="index" :basket-data="basketData"/>
        </template>
    </MoleculesModalBasketProduct>
</template>