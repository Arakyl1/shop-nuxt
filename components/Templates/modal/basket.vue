<template>
    <MoleculesModalBasketProduct>
        <template #default="{ item, index }">
            <MoleculesItemBasketCard :item="item" :index="index" />
        </template>
    </MoleculesModalBasketProduct>
</template>