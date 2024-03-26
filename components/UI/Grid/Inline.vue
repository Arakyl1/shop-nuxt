<template>
    <div
    :is="tag || 'div'"
    :class="rootClass"
    ref="grid"
    :data-grid="instanse?.uid"
    :data-uid="instanse?.uid">
        <slot></slot>
    </div> 
</template>

<script setup lang="ts">
import { CSS_JUSTIFY_CONTENT, CSS_ALIGN_CONTENT } from "@/type/intex";

export interface Props {
    tag?: string,
    // col?: NumericRange<1, 24>,
    // row?: NumericRange<1, 24>,
    justify?: CSS_JUSTIFY_CONTENT,
    align?: CSS_ALIGN_CONTENT,
    mainClass?: string,
    size?: '/20ch' | '/30ch',
}

const props = withDefaults(defineProps<Props>(), { align: 'center', size: '/30ch' })
const grid = ref<HTMLElement | null>(null)
const instanse = ref()
const className = useCssModule()

const rootClass = computed(() => {
    return {
        [className['container']]: true,
        [`content-${props.align}`]: props.align,
        [`justify-items-${props.justify}`]: props.justify,
        [props.mainClass as PropertyKey]: props.mainClass,
        [props.size]: props.size,
    }
})
onMounted(() => {
    instanse.value = getCurrentInstance()
})
</script>

<style lang="css" module>

.container {
    display: grid;
}


</style>