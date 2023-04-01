<template>
    <div>
        <template v-if="data">
            <TemplatesPageProductMain v-if="isDesktopOrTablet" :data="data" class="mb-8 xl:mb-6" />
            <TemplatesPageProductMainMobaile v-else :data="data" class="mb-12" />
            <TemplatesPageProductCharacteristic :data="data.characteristic" class="mb-8 xl:mb-6" />
            <TemplatesPageProductDescription :id="data.id" :name="data.name" :art="data.art" :description="data.description"
                :reviews="data.reviews" :refresh="refresh" class="mb-12" />
        </template>
    </div>
</template>

<script setup lang="ts">
import { productCardBaseParamsSelectFull, type _ProductCardFull } from '~~/type/intex';

definePageMeta({
    title: 'Информация о товаре',
})

const route = useRoute()
const { isDesktopOrTablet } = useDevice()
const { getInfo: getInfoProduct } = useProduct()
const option = { where: { id: +route.params.id }, ...productCardBaseParamsSelectFull }

const { data, refresh, error } = await useAsyncData(
    `data_full_info_${Date.now()}`,
    () => getInfoProduct<_ProductCardFull>(option)
)

onMounted(() => {
    useHead({
        titleTemplate: () => data.value ? data.value.name : ''
    })
})
</script>