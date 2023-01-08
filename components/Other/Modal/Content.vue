<template>
    <div class="h-full bg-gray-100 p-8 overflow-hidden rounded-md sm:p-4">
        <div class="flex w-full">
            <slot name="title"><h2 class="text-2xl grow text-blue-700 sm:text-xl">{{ title }}</h2></slot>
            <XMarkIcon  @click="hudeWindow" class="float-right h-6 w-6 cursor-pointer"/>
        </div>
        <div v-if="decorLine" class="decor-line mt-5 mb-4 sm:mt-3"></div>
        <div class="h-5/6 overflow-y-scroll ot2__container">
            <slot><p class="text-2xl text-gray-700 p-5 md:text-xl sm:text-lg">{{ textDefault }}</p></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";

interface Props {
    title?: string,
    textDefault?: string,
    decorLine?: boolean,
    hudeWindow: Function
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Categor',
    textDefault: 'Text',
    decorLine: true,
    hudeWindow: () => false
})
</script>

<style lang="css">
.ot2__container{
    scrollbar-width: none;
}
.ot2__container::-webkit-scrollbar{
    width: 0;
    height: 0;
}
</style>