<template>
    <component :is="tag" :class="{ [`text-${size}`]: size, [`text-${weight}`]: weight, [`color-${color}`]: color }"
        ><slot v-if="!text"></slot>{{ text }}</component
    >
</template>

<script setup lang="ts">
export interface Props {
    tag?: 'p' | 'span' | 'label';
    size?: 'lg' | 'md' | 'sm' | 'xs' | '2xs';
    text?: number | string;
    weight?: 'bold' | 'medium';
    color?: `text-0${1 | 2 | 3 | 4}` | 'base-01';
}
withDefaults(defineProps<Props>(), { tag: 'p', color: 'text-01', size: 'sm' });
</script>
