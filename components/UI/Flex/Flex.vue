<template>
    <component :is="tag" :class="rootClass" ref="flex" :data-flex="instanse?.uid" :data-uid="instanse?.uid"><slot></slot></component> 
</template>

<script setup lang="ts">
import { CSS_FLEX_DIRECTION, CSS_JUSTIFY_CONTENT, CSS_ALIGN_ITEMS } from "@/type/intex";

export interface Props {
    tag?: string,
    direction?: CSS_FLEX_DIRECTION,
    justify?: CSS_JUSTIFY_CONTENT,
    align?: CSS_ALIGN_ITEMS,
}

const props = withDefaults(defineProps<Props>(), { 'tag': 'div', align: 'center' })
const flex = ref<HTMLElement | null>(null)
const instanse = ref()

const rootClass = computed(() => {
    return {
        ['flex']: true,
        [`flex-${props.direction}`]: props.direction,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
    }
})

defineExpose({ flex })

onMounted(() => {
    instanse.value = getCurrentInstance()
})
</script>

