<template>
    <component :is="tag"
    :class="rootClass"
    ref="grid"
    :data-grid="instanse?.uid"
    :data-uid="instanse?.uid">
        <slot></slot>
    </component> 
</template>

<script setup lang="ts">
import { CSS_JUSTIFY_ITEMS, CSS_ALIGN_CONTENT } from "@/type/intex";

export interface Props {
    tag?: string,
    // col?: NumericRange<1, 24>,
    // row?: NumericRange<1, 24>,
    justify?: CSS_JUSTIFY_ITEMS,
    align?: CSS_ALIGN_CONTENT,
    container?: 'xs'|'sm'|'md'|'lg'|'xl'
}

const props = withDefaults(defineProps<Props>(), { 'tag': 'div', align: 'center', container: 'md' })
const grid = ref<HTMLElement | null>(null)
const instanse = ref()
const className = useCssModule()

const rootClass = computed(() => {
    return {
        ['grid']: true,
        [`content-${props.align}`]: props.align,
        [`justify-items-${props.justify}`]: props.justify,
        [className[props.container]]: props.container,
    }
})
onMounted(() => {
    instanse.value = getCurrentInstance()
})

</script>

<style lang="css" module>
/* purgecss ignore */
    .xs {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 768px) {
        /* .md {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        } */
        .xs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (min-width: 1024px) {
        .sm {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .md {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
</style>