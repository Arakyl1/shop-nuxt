<template>
  <div>
  <button class="relative"
  @click="updateStage($event)">
  <ClientOnly>

    <IconLike class="h-6"
    :updateStyle="!!favorite.list.size"
    />
    <OtherProductLengthArray :quanity="favorite.list.size"/>

  </ClientOnly>
  </button>
    <OtherModalTransition :active="stage" class="model-style">
        <OtherModalContent :title="'Ваши избранный'" :text-default="'Ваши избраны пусты'" :hude-window="updateStage">
            <div class="grid grid-cols-3 md:grid-cols-2 -mx-4 sm:-mx-2" v-if="favorite.list.size">
              <ProductCard v-for="item in favorite.list" :key="item" :id="item" class="mb-4 slader__item"/>
            </div>
        </OtherModalContent>
    </OtherModalTransition>
  </div>
</template>
<script setup lang="ts">
import { favoriteProduct } from "@/pinia/store";
import { storeToRefs } from "pinia";
import ShowContent from "~~/utils/ShowContent";

const { stage, updateStage } = ShowContent();
const favoriteProd = favoriteProduct()
const { favorite } = storeToRefs(favoriteProd)

</script>
