<template>
  <div>
    <SharedUIModalTransition :active="stage" class="model-style">
        <SharedUIModalContent :title="'Ваши избранный'" :text-default="'Ваши избраны пусты'" :hude-window="updateStage">
            <div class="grid grid-cols-3 md:grid-cols-2 -mx-4 sm:-mx-2" v-if="favorite.size">
                <div v-for="item in favorite" :key="item"
                class="mb-4 slader__item"><slot v-bind="{item}"></slot></div>
            </div>
        </SharedUIModalContent>
    </SharedUIModalTransition>
  </div>
</template>
<script setup lang="ts">
import ShowContent from "~~/utils/ShowContent";

const { stage, updateStage } = ShowContent();
const { favorite} = useFavorite()

onBeforeMount(() => {
  window.addEventListener('showModalFavoriteProduct', updateStage)
})
</script>
