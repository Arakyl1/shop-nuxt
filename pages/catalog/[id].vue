<template>
    <Panel :mode="'primary'">
        <template v-if="data">
            <Main :data="data" />
            <!-- <TemplatesPageProductMainMobaile :data="data" class="mb-12 hidden md:block" /> -->
            <section class="gap-8" :class="className['content']">
                <Characteristic :data="data.characteristic" />
                <Description :data="data"/>
                <Reviews :data="data" :refresh="refresh"/>
            </section>
        </template>
        <Carousel
        :params="{ 'createAt': `gte:${new Date(Date.now() - 11604800000).getTime()}`, limit: 24  }"
        :title="common.CAROUSEL_TITLE"/>
    </Panel>
</template>

<script setup lang="ts">
import { ProductCardFull } from '~~/type/intex'
import Carousel from '@/components/Templates/Carousel/Product.vue';
import Main from '@/components/Templates/page__product/Main.vue';
import Description from '@/components/Templates/page__product/Description.vue';
import Characteristic from '@/components/Templates/page__product/Characteristic.vue';
import Reviews from '@/components/Templates/page__product/Reviews.vue';
import Panel from "@/components/UI/Panel/Panel.vue"
import { PAGE_CATALOG_ID as common, PAGE_META as META } from "@/common/C";

definePageMeta({
    title: META.CATALOG_ID.TITLE,
    keepalive: true
})

const className = useCssModule()
const route = useRoute()
const id = route.params.id
const { data, refresh } = useAsyncData(() => $fetch('/api/product/get', {
    method: 'GET',
    params: { id: id, fullinfo: true, unique: true }
}), {
    transform: (context) => {
        if (context.data && !Array.isArray(context.data)) {
            return context.data as ProductCardFull
        } else { return null }
    },
    lazy: true
})



// onMounted(() => {
//     setHeaderTitle(data.value ? data.value.name : 'Каталог товаров')
// })
// onActivated(() => setHeaderTitle(data.value ? data.value.name : 'Каталог товаров'))

</script>

<style lang="css" module>
.content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
}
.content > *:first-child {
    grid-column: span 2 / span 2;
}
.item {
    width: 50%;
}
</style>

    