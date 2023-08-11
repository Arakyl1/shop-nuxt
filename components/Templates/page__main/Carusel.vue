<template>
    <div>
        <MoleculesSladerBase :data="data" :containerClass="style.container" class="mb-16 xl:mb-12">
            <template #header="{ prevItem, nextItem, sladerValueScroll }">
                <MoleculesSladerControl :prevItem="prevItem" :nextItem="nextItem" :slader-value-scroll="sladerValueScroll">
                    <slot name="title">Slader title</slot>
                </MoleculesSladerControl>
            </template>
            <template #item="{ elem }">
                <MoleculesCardProduct :data="elem" class="group is-pos-info-for-stock"/>
            </template>

        </MoleculesSladerBase>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    params: { [key: string]: any }
}>()

const { data } = await useFetch('/api/product/get', {
    method: "GET",
    server: true,
    params: { ...props.params, },
    key: generateKey(props.params),
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        } else { return [] }
    }
})

const style = {
    container: '[grid-auto-columns:calc(100%/4)] lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)]'
}
</script>