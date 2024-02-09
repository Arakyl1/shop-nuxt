<template>
    <div class="w-3/4 lg:w-2/3 md:w-full">
        <div class="grid grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-y-10 gap-x-8 xl:gap-x-6 sm:gap-x-4 px-4 xl:px-3 sm:px-2"
            v-show="pending || data.length">
            <template v-for="(el,i) in lengthArr" :key="el">
                <Card :data="data[i] ? data[i] : null"/>
            </template>
        </div>
        <Transition name="gallery">
        <div v-show="!pending && data && !data.length">
            <p class="text-2xl text-gray-500 p-8 lg:text-xl sm:text-lg sm:p-4"
            >{{ _content?.TEXT_BASKET_EMPRY || 'nothing found'  }}</p>
        </div>
    </Transition>
    </div>
</template>
<!--  -->
<script setup lang="ts">
import type { Content, ProductCardBase } from "@/type/intex";
import Card from '@/components/Templates/Card/Product.vue'

const props = defineProps<{ data: ProductCardBase[], pending: boolean }>()
const route = useRoute()
const _content = useState<Content | null>('CONTENT_APP')

const lengthArr = computed(() => props.pending ? Number(route.query.limit) : props.data.length)
</script>

<style lang="css">


</style>