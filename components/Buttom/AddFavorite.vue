<template>
    <ButtomStandart @click="store.updateFavorite(id)">
        <slot name="bt-data" v-bind="{ favorite }">
            <ClientOnly>
                <IconLike class="h-6"
                :updateStyle="favorite.list.has(id)"/>
            </ClientOnly>
        </slot>
    </ButtomStandart>
</template>

<script setup lang="ts">
import { favoriteProduct } from "@/pinia/store";
import { storeToRefs } from "pinia";

const props = defineProps<{ id: number }>()

const store = favoriteProduct()
const { favorite } = storeToRefs(store)

// const checkingAvailabilityFavorite = computed(() => favorite.value.list.has(props.id))
</script>