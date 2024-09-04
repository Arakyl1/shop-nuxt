<template>
    <component :is="tag" ref="grid" :class="rootClass">
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
import { computed, ref, useCssModule } from 'vue';

import type { CSS_ALIGN_CONTENT, CSS_JUSTIFY_ITEMS, ContainerGrid } from '../../type/index';

export interface Props {
    tag?: string;
    justify?: CSS_JUSTIFY_ITEMS;
    align?: CSS_ALIGN_CONTENT;
    container?: ContainerGrid | 'n';
}

const props = withDefaults(defineProps<Props>(), { tag: 'div', align: 'center', container: 'lg' });
const grid = ref<HTMLElement | null>(null);
const className = useCssModule();

const rootClass = computed(() => {
    return {
        [className['grid']]: true,
        [className[`content-${props.align}`]]: props.align,
        [className[`justify-items-${props.justify}`]]: props.justify,
        [`CoG_${props.container}`]: props.container
    };
});

defineExpose({ grid });
</script>

<style lang="scss" module>
.grid {
    display: grid;
}

$justify-items: (
    'start': start,
    'end': end,
    'center': center
);
$align-content: (
    'center': center,
    'start': start,
    'end': end,
    'between': space-between,
    'around': space-around,
    'evenly': space-evenly
);

@each $name, $value in $justify-items {
    .justify-items-#{$name} {
        justify-items: $value;
    }
}

@each $name, $value in $align-content {
    .content-#{$name} {
        align-content: $value;
    }
}
</style>
