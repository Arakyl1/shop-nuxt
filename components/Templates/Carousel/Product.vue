<template>
    <div v-if="!pending && data">
        <UITBlockGridScroll :data="data">
            <template #header="{ prev, next, listValueScroll }">
                <UITBlockFlex :direction="'col'" class="gap-4 mb-6 lg:gap-6 lg:mb-8">
                    <UITBlockFlex :justify="'between'" class="w-full">
                        <UITParagraphTitle>
                            <slot v-if="$slots.title" name="title"/>
                            <template v-else-if="title">{{ title }}</template>
                        </UITParagraphTitle>
                        <!-- <UITParagraphTitle  :text=""/> -->
                        <UITBlockFlex class="gap-2 lg:gap-3 xl:gap-4" :width-full="false">
                            <AtomButtonArrow
class="-scale-100"
                            :disabled="listValueScroll ? listValueScroll.current === 0 : false"
                            @click="prev"/>
                            <AtomButtonArrow 
                            :disabled="listValueScroll ? listValueScroll.max <= listValueScroll.current : false"
                            @click="next"/>
                        </UITBlockFlex>
                    </UITBlockFlex>
                    <div class="decor-line"/>
                </UITBlockFlex>
            </template>
            <template #default="{ elem }">
                <ProductCard :data="elem"/>
            </template>
        </UITBlockGridScroll>
    </div>
</template>
<script setup lang="ts">
import { UITBlockGridScroll, UITBlockFlex, UITParagraphTitle } from '#components';
import AtomButtonArrow from "@/components/Atom/Button/Arrow.vue";
import ProductCard from "@/components/Molecules/Card/Product.vue";
import type { ProductCardFull } from '@/type/intex';


const props = defineProps<{
    params: { [key: string]: unknown },
    title?: string
}>()

const data = ref<null | ProductCardFull>()
const pending = ref<boolean>(false)


onBeforeMount(async() => {
    await useFetch('/api/product/get', {
        params: { ...props.params },
        server: true,
        retry: 2,
        default: () => null,
        onRequest() {
            pending.value = true
        },
        onResponse({ response }) {
            if (response.status < 400  && response._data) {
                data.value = response._data?.data
            }
            pending.value = false
        },
    })
})

</script>