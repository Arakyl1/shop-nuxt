<template>
    <component :is="tag" ref="flex" :class="rootClass" class="flex"><slot/></component>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { CSS_ALIGN_ITEMS, CSS_FLEX_DIRECTION, CSS_JUSTIFY_CONTENT } from '../../type/index';

export interface Props {
    tag?: string;
    direction?: CSS_FLEX_DIRECTION;
    justify?: CSS_JUSTIFY_CONTENT;
    align?: CSS_ALIGN_ITEMS;
    widthFull?: boolean;
}

const props = withDefaults(defineProps<Props>(), { tag: 'div', align: 'center', widthFull: true, direction: undefined, justify: undefined });
const flex = ref<HTMLElement | null>(null);

const rootClass = computed(() => {
    return {
        [`flex-${props.direction}` as CSS_FLEX_DIRECTION]: props.direction,
        [`items-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        ['w-full']: props.widthFull
    };
});

defineExpose({ flex });
</script>
