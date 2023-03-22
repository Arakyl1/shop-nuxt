<template>
<section>
    <div class="w-2/3 bg-gray-100 rounded p-8
    xl:w-9/12 xl:p-6 lg:w-10/12
    md:w-full sm:p-4">
        <h3 class="text-2xl text-black-100 mb-4
        xl:text-xl xl:mb-3 sm:text-lg sm:mb-2">Характеристики</h3>
        <div class="decor-line mb-3 xl:mb-2 sm:mb-1"></div>
        <div>
            <div v-for="item in data"
            class="mb-4 last:mb-0 sm:mb-2 sm:last:mb-0">
                <h4 class="text-xl text-black-100 xl:text-lg sm:text-base
                ">{{ item.title }}</h4>
                <ul>
                    <li v-for="elem in item.content"
                    class="flex justify-between py-1.5 xl:py-1">
                    <p class="text-gray-500
                    sm:text-sm">{{ elem.name }}</p>
                    <p class="text-black-100
                    sm:text-sm">{{ elem.value }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
import { ProductCardFull } from '~~/type/intex';

defineProps<{ data: ProductCardFull['characteristic'] }>()
</script>