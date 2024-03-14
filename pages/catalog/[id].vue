<template>
    <Panel :mode="'primary'">
        <template v-if="data">
            <Main :data="data" class="none --md:block" />
            <MainMobile :data="data" class="--md:hidden" />
            <section class="gap-8" :class="className['content']">
                <Characteristic :data="data.characteristic" />
                <Description :data="data"/>
                <Reviews :data="data" :refresh="refresh"/>
            </section>
            <Carousel
            :params="{ 'createAt': `gte:${new Date(Date.now() - 11604800000).getTime()}`, limit: 24  }"
            :title="common.CAROUSEL_TITLE"/>
        </template>
    </Panel>
</template>

<script setup lang="ts">
import { ProductCardFull } from '~~/type/intex'
import Carousel from '@/components/Templates/Carousel/Product.vue';
import Main from '@/components/Templates/page__product/Main.vue';
import MainMobile from '@/components/Templates/page__product/MainMobile.vue';
import Description from '@/components/Templates/page__product/Description.vue';
import Characteristic from '@/components/Templates/page__product/Characteristic.vue';
import Reviews from '@/components/Templates/page__product/Reviews.vue';
import Panel from "@/components/UI/Panel/Panel.vue"
import { PAGE_CATALOG_ID as common, PAGE_META as META } from "@/common/C";

const className = useCssModule()
const route = useRoute()
const id = route.params.id
const { data, refresh } = useAsyncData(GET_ASYNC_DATA_KEY('getFullInfoProduct'), () => $fetch('/api/product/get', {
    method: 'GET',
    params: { id: id, fullinfo: true, unique: true },
}), {
    'server': true,
    lazy: true,
    transform: (context) => {
        if (context.data && !Array.isArray(context.data)) {
            return context.data as ProductCardFull
        } else { return null }
    }
})

definePageMeta({
    title: () => data.value ? `${data.value.name} ${data.value.art}` : META.CATALOG_ID.TITLE,
})

// onMounted(() => {
//     setHeaderTitle(data.value ? data.value.name : 'Каталог товаров')
// })
// onActivated(() => setHeaderTitle(data.value ? data.value.name : 'Каталог товаров'))

</script>

<style lang="css" module>
.content {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
}


@media screen and  (min-width: 768px) {
    .content {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .content > *:first-child {
        grid-column: span 2 / span 2;
    }
}
.item {
    width: 50%;
}
</style>

    