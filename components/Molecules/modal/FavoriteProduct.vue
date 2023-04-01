<template>
  <div>
    <AtomModalTransition :active="stage" class="model-style">
        <AtomModalContent :title="'Ваши избранный'" :text-default="'Ваши избраны пусты'" :hude-window="updateStage">
            <div class="grid grid-cols-3 md:grid-cols-2 -mx-4 sm:-mx-2" v-if="favorite.size">
                <div v-for="item in favorite" :key="item"
                class="mb-4 slader__item"><slot v-bind="{item}"></slot></div>
            </div>
        </AtomModalContent>
    </AtomModalTransition>
  </div>
</template>
<script setup lang="ts">
import { showContent } from "~~/utils/ShowContent";

const { stage, updateStage } = showContent();
const { favorite: _favoriteStore } = useStore()
const { favorite } = _favoriteStore()

onBeforeMount(() => {
  window.addEventListener('showModalFavoriteProduct', updateStage)
})
</script>
