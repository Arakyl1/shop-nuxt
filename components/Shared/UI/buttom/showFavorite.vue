<template>
    <slot v-bind="{ showModalFavorite, favorite }">
        <UIStandart @click="showModalFavorite" class="group p-0 px-1"
            :class="[favorite.size ? 'icon-red' : 'icon-black']">
            <UIIconLike class="w-6" />
        </UIStandart>
    </slot>
</template>
<script setup lang="ts">
const { favorite: _favoriteStore } = useStore()
const { favorite } = _favoriteStore()

function showModalFavorite() {
    window.dispatchEvent(new CustomEvent('showModalFavoriteProduct'))
}
</script>