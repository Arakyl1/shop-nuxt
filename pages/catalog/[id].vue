<template>
    <Panel :mode="'primary'">
        <template v-if="data?.data">
            <Main :data="data?.data" class="none /md:block" />
            <MainMobile :data="data?.data" class="/md:hidden" />
            <section class="gap-8" :class="className['content']">
                <Characteristic :data="data?.data.characteristic" />
                <Description :data="data?.data"/>
                <Reviews :data="data?.data" :refresh="refresh"/>
            </section>
            <Carousel
            :params="{ 'discount': 'gte:1', limit: 24  }"
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
const { data, pending, refresh } = await useAsyncData(() => $fetch('/api/product/get', {
    params: { id: id, fullinfo: true, unique: true },
}), {
    'server': true,
    default: () => null
})



useHead({
    titleTemplate: () => data.value?.data ? `${data.value.data?.name} ${data.value.data?.art}` : META.CATALOG_ID.TITLE
})

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

    