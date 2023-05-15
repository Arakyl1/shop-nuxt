<template>
    <div>
        <template v-if="data">
            <TemplatesPageProductMain :data="data" class="mb-8 xl:mb-6 block md:hidden" />
            <TemplatesPageProductMainMobaile :data="data" class="mb-12 hidden md:block" />
            <TemplatesPageProductCharacteristic :data="data.characteristic" class="mb-8 xl:mb-6" />
            <TemplatesPageProductDescription :id="data.id" :name="data.name" :art="data.art" :description="data.description"
                :reviews="data.reviews" :refresh="refresh" class="mb-12" />
        </template>
        <TemplatesPageMainCarusel :searchCategor="{ 'news': true }">
            <template #title>
                Новинки
            </template>
        </TemplatesPageMainCarusel>
    </div>
</template>

<script setup lang="ts">
import { productCardBaseParamsSelectFull, type _ProductCardFull } from '~~/type/intex';

definePageMeta({
    title: 'Информация о товаре',
})

const route = useRoute()
const { getInfo: getInfoProduct } = useProduct()
const id = route.params.id
const option = { where: { id: +id }, ...productCardBaseParamsSelectFull }

const { data, refresh, error } = await getInfoProduct<_ProductCardFull>(option,{}, { key: 'data_full' + id })

onMounted(() => {
    useHead({
        titleTemplate: () => data.value ? data.value.name : ''
    })
})
</script>