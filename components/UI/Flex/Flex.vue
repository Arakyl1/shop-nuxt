<template>
    <component :is="tag" :class="rootClass" ref="flex" :data-flex="instanse?.uid" :data-uid="instanse?.uid"><slot></slot></component> 
</template>

<script setup lang="ts">

export interface Props {
    tag?: string,
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    justify?: 'center' | 'start' | 'end' | 'left' | 'right' | 'evenly' | 'between' | 'around' | 'baseline' ,
    align?: 'center' | 'flex-start' | 'flex-end',
}

const props = withDefaults(defineProps<Props>(), { 'tag': 'div', align: 'center' })
const flex = ref<HTMLElement | null>(null)
const instanse = getCurrentInstance()

const rootClass = computed(() => {
    return {
        ['flex']: true,
        [`flex-${props.direction}`]: props.direction,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
    }
})

defineExpose({
    flex: flex
})
</script>

