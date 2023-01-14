<template>
<Slader :data="data" :containerClass="style.container" :defaultTitle="title" class="mb-16 xl:mb-12">
    <template #item="{ elem }">
        <ProductCard :data="elem" class="slader__item group is-pos-info-for-stock"/>
    </template>
    <template #bottom>
        <div></div>
    </template>
</Slader>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
    searchCategor: string,
    title: string
}>(), { title: 'Базовый заголовок'})

const { getProductForCategor } = useProduct()
const data = ref<any>(null)

data.value = await getProductForCategor({ where: { [props.searchCategor]: true }, ...selectForCard()})

const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)]'
}
</script>