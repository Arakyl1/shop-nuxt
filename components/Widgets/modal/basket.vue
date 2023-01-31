<template>
    <EntitiesModalBasketProduct>
        <template #default="{ item, index }">
            <EntitiesItemBasketCard :item="item" :index="index" />
        </template>
    </EntitiesModalBasketProduct>
</template>