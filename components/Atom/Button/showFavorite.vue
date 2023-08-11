<template>
    <slot v-bind="{ showModalFavorite, favoriteData }">
        <AtomButtonStandart @click="showModalFavorite" class="p-0 px-1 ">
            <CreateIcon :name="'like_28_26'" :att="{ class: favoriteData.size ? 'fill-red-500 stroke-none' : 'fill-none stroke-gray-500 stroke-[1.5px]' }" class="w-6"/>
        </AtomButtonStandart>
    </slot>
</template>
<script setup lang="ts">
import { favorite as _favorite } from "@/stores/favorite";
import CreateIcon from "@/content/icons/create";

const storeFavorite = _favorite()
const { data: favoriteData } = storeToRefs(storeFavorite)

function showModalFavorite() {
    window.dispatchEvent(new CustomEvent('show-modal-favorite'))
}
</script>