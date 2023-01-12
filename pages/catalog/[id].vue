<template>
    <div v-if="data">
        <ProductDetailedMain
        v-if="isDesktopOrTablet"
        :data="data"
        class="mb-8 xl:mb-6" />
        <ProductDetailedMainMobaile v-else :data="data" class="mb-12"/>
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
definePageMeta({
    title: 'Информация о товаре',
})


const route = useRoute()
const { isDesktopOrTablet } = useDevice()

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

onMounted(() => {
    useHead({
        title: data ? data.value.name : ''
    })
})
</script>