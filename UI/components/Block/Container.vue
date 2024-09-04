<template>
    <component :is="tag" ref="content" :class="{ [$style[mode]]: mode, [`Co_${container}`]: container }"><slot></slot></component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ContainerSize } from "../../type/index";

export interface Props {
    tag?: string;
    mode?: 'scroll' | 'scroll-miss';
    container?: ContainerSize;
}

withDefaults(defineProps<Props>(), { tag: 'div' });

const content = ref<HTMLElement | null>(null);

defineExpose({ content });
</script>

<style lang="css" module>
.scroll {
    padding: 8px 3px 8px 8px;
}

.scroll-miss {
    padding: 8px 13px 8px 8px;
}
</style>
