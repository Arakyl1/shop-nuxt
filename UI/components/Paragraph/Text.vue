<template>
    <component :is="tag" :class="{ [`text-${size}`]: size, [`font-${weight}`]: weight, [`text-${color}`]: color }"
        ><slot v-if="!text"/>{{ text }}</component
    >
</template>

<script setup lang="ts">
import type { CSS_FONT_SIZE, CSS_FONT_WEIGHT, CSS_COLOR } from "../../type/index";
export interface Props {
    tag?: 'p' | 'span' | 'label';
    size?: CSS_FONT_SIZE;
    text?: number | string;
    weight?: CSS_FONT_WEIGHT;
    color?: CSS_COLOR;
}
withDefaults(defineProps<Props>(), { tag: 'p', color: 'black-500', size: '' });
</script>
