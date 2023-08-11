<template>
    <MoleculesModalFavoriteProduct>
        <template #default="{ item }">
            <MoleculesCardProduct :data="item" class="group is-pos-info-for-stock"/>
        </template>
    </MoleculesModalFavoriteProduct>
</template>
