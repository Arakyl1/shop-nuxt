<template>
    <div>
        <CardGridScroll :data="data">
            <template #header="{ prev, next, listValueScroll }">
                <Flex :direction="'column'" :class="className['header']">
                    <Flex :justify="'between'" class="w-full">
                        <Title v-if="$slots.title"><slot name="title"></slot></Title>
                        <Title v-else-if="title" :text="title"/>
                        <Flex :class="className['control-button']">
                            <ButtonArrow class="-scale-100"
                            :disabled="listValueScroll ? listValueScroll.current === 0 : false"
                            @click="prev"/>
                            <ButtonArrow 
                            :disabled="listValueScroll ? listValueScroll.max <= listValueScroll.current : false"
                            @click="next"/>
                        </Flex>
                    </Flex>
                    <div class="decor-line"></div>
                </Flex>
            </template>
            <template #default="{ elem }">
                <Card :data="elem"/>
            </template>
        </CardGridScroll>
    </div>
</template>
<script setup lang="ts">
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import Card from '@/components/Templates/Card/Product.vue'
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import { ProductCard } from '@prisma/client';

const props = defineProps<{
    params: { [key: string]: any },
    title?: string
}>()
const className = useCssModule()
const data = ref<null | Array<ProductCard>>(null)

const { pending } = useFetch('/api/product/get', {
    method: "GET",
    server: true,
    lazy: true,
    params: { ...props.params, },
    onResponse({ response }) {
        const res = response._data
        console.log(res)
        if (res && 'data' in res && Array.isArray(res.data)) {
            data.value = res.data
        }
    },
})
</script>

<style lang="css" module>
/* purgecss ignore */
.header {
    gap: 1.5rem;
    margin-bottom: 2rem;
}
.control-button {
    gap: 1rem;
}

@media screen and (max-width: 1024px) {
    .control-button {
        gap: 0.75rem;
    }
    .header {
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
}
@media screen and (max-width: 600px) {
    .control-button {
        gap: 0.5rem;
    }
}
</style>