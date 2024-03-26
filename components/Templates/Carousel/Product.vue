<template>
    <div v-if="data?.data">
        <CardGridScroll :data="data?.data">
            <template #header="{ prev, next, listValueScroll }">
                <Flex :direction="'column'" :class="className['header']">
                    <Flex :justify="'between'" class="w-full">
                        <Title v-if="$slots.title"><slot name="title"></slot></Title>
                        <Title v-else-if="title" :text="title"/>
                        <Flex class="gap-2 /lg:gap-3 /xl:gap-4">
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

const props = defineProps<{
    params: { [key: string]: any },
    title?: string
}>()
const className = useCssModule()

const { data } = await useFetch('/api/product/get', {
    method: "GET",
    server: true,
    params: { ...props.params, },
    retry: 2,
    key: generateKey(props.params),
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