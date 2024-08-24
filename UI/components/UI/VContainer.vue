<template>
    <component :is="tag" ref="content" :class="[mode ? $style[mode] : '', container ? $style[container] : '']"><slot></slot></component>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
    tag?: string;
    mode?: 'scroll' | 'scroll-miss';
    container?: 'xs' | 'sm' | 'lg';
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

.xs {
    padding: 9px 8px;
}

.sm {
    padding: 1.125rem;
}

.lg {
    padding: 1.5rem;
}
</style>
