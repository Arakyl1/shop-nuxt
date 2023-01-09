<template>
    <div v-if="data">
        <LazyProductDetailedMain
        v-if="size.width ? size.width > 767 : null"
        :data="data"
        class="mb-8 xl:mb-6" />
        <LazyProductDetailedMainMobaile v-else-if="size.width" :data="data" class="mb-12"/>
        <ProductDetailedCharacteristic :data="data.characteristic"
        class="mb-8 xl:mb-6"/>
        <ProductDetailedDescription 
        :id="data.id"
        :name="data.name"
        :art="data.art"
        :description="data.description"
        :reviews="data.reviews"
        :refresh="refresh"
        class="mb-12"/>
    </div>
    
</template>

<script setup lang="ts">
import { containerSize } from "@/pinia/store";
import { storeToRefs } from "pinia";

definePageMeta({
    title: 'Информация о товаре',
    pageTransition: { name: 'page-transition' }
})


const route = useRoute()
const containerFunc = containerSize()
const { size } = storeToRefs(containerFunc)

const { getProduct } = useProduct()

const option = ref({
    where: {
        id: +route.params.id
    },
    include: {
        characteristic: {
            include: {
                content: true
            }
        },
        reviews: true
    }
})

const { data, refresh } = await getProduct(option.value, `data_full_info_${route.params.id}`)

</script>