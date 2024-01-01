<template>
    <component :is="tag" :class="{ [className['line']]: props.line }">
      <slot v-if="!text"></slot>
      {{ text }}
    </component>
</template>

<script setup lang="ts">
export interface Props {
    tag?: 'p' | 'span' | 'label',
    text?: number | string,
    line?: number
}
const props = withDefaults(defineProps<Props>(),{ tag: 'p' })

const className = useCssModule()
</script>

<style lang="css" module>
.line {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: v-bind('props.line');
}
</style>
