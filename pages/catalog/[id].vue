<template>
    <div>
        <template v-if="data">
            <TemplatesPageProductMain :data="data" class="mb-8 xl:mb-6 block md:hidden" />
             <TemplatesPageProductMainMobaile :data="data" class="mb-12 hidden md:block" />
            <TemplatesPageProductCharacteristic :data="data.characteristic" class="mb-8 xl:mb-6" />
            <TemplatesPageProductDescription :data="data" :refresh="refresh" class="mb-12" />
        </template>
         <TemplatesPageMainCarusel :params="{ 'createAt.gte': new Date(Date.now() - 604800000 ), limit: 24  }">
            <template #title>
                Новинки
            </template>
        </TemplatesPageMainCarusel>
    </div>
</template>

<script setup lang="ts">
import { ProductCardFull } from '~~/type/intex'

definePageMeta({
    title: 'Информация о товаре',
    keepalive: true
})

const route = useRoute()
const id = route.params.id
const { error, data, pending, refresh } = useAsyncData(() => $fetch('/api/product/get', {
    method: 'GET',
    params: { id: id, fullinfo: true, unique: true }
}), { 'lazy': true, transform: (context) => {
    if (context && !Array.isArray(context)) {
        return context as ProductCardFull
    } else { return null }
} })


onMounted(() => {
    useHead({
        titleTemplate: () => data.value ? data.value.name : ''
    })
})
</script>