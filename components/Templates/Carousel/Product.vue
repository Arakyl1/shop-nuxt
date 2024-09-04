<template>
    <div v-if="!pending && data">
        <UITBlockGridScroll :data="data">
            <template #header="{ prev, next, listValueScroll }">
                <UITBlockFlex :direction="'column'" :class="className['header']">
                    <UITBlockFlex :justify="'between'" class="w-full">
                        <UITParagraphTitle>
                            <slot v-if="$slots.title" name="title"></slot>
                            <template v-else-if="title">{{ title }}</template>
                        </UITParagraphTitle>
                        <!-- <UITParagraphTitle  :text=""/> -->
                        <UITBlockFlex class="gap-2 /lg:gap-3 /xl:gap-4" :width-full="false">
                            <AtomButtonArrow class="-scale-100"
                            :disabled="listValueScroll ? listValueScroll.current === 0 : false"
                            @click="prev"/>
                            <AtomButtonArrow 
                            :disabled="listValueScroll ? listValueScroll.max <= listValueScroll.current : false"
                            @click="next"/>
                        </UITBlockFlex>
                    </UITBlockFlex>
                    <div class="decor-line"></div>
                </UITBlockFlex>
            </template>
            <template #default="{ elem }">
                <ProductCard :data="elem"/>
            </template>
        </UITBlockGridScroll>
    </div>
</template>
<script setup lang="ts">
import { UITBlockGridScroll, UITBlockFlex, UITBlockCard, UITParagraphTitle } from '#components';
import AtomButtonArrow from "@/components/Atom/Button/Arrow.vue";
import ProductCard from "@/components/Molecules/Card/Product.vue";
import { isServer } from "@/utils/other";
import { ProductCardFull } from '@/type/intex';


const props = defineProps<{
    params: { [key: string]: any },
    title?: string
}>()
const className = useCssModule()


const data = ref<null | ProductCardFull>()
const pending = ref<boolean>(false)


onBeforeMount(async() => {
    await useFetch('/api/product/get', {
        params: { ...props.params },
        server: true,
        retry: 2,
        default: () => null,
        onRequest({ response }) {
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

<style lang="css" module>
.header {
    gap: 1.5rem;
    margin-bottom: 2rem;
}

@media screen and (max-width: 1024px) {
    .header {
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
}
</style>