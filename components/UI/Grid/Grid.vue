<template>
    <component :is="tag" :class="rootClass" ref="grid" :data-grid="instanse?.uid" :data-uid="instanse?.uid"><slot></slot></component> 
</template>

<script setup lang="ts">
import type { NumericRange } from "@/type/intex";
export interface Props {
    tag?: string,
    col?: NumericRange<1, 24>,
    row?: NumericRange<1, 24>,
    justify?: 'center' | 'start' | 'end' | 'stretch',
    align?: 'normal'|'center'|'start'|'end'|'between'|'around'|'evenly'|'baseline'|'stretch'
}

const props = withDefaults(defineProps<Props>(), { 'tag': 'div', align: 'center' })
const grid = ref<HTMLElement | null>(null)
const instanse = getCurrentInstance()
const className = useCssModule()

const rootClass = computed(() => {
    return {
        ['grid']: true,
        [`content-${props.align}`]: props.align,
        [`justify-items-${props.justify}`]: props.justify,
        [className['grid-col']]: props.col,
        [className['grid-row']]: props.row,
    }
})

</script>

<style lang="css" module>
    .grid-col {
        grid-template-columns: repeat(v-bind('$props.col'), minmax(0, 1fr));
    }
    .grid-row {
        grid-template-rows: repeat(v-bind('$props.row'), minmax(0, 1fr));
    }
</style>