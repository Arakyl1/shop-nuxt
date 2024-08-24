<template>
    <UIVContainer ref="card" :class="rootClass" :container="container" :tag="tag">
        <slot></slot>
    </UIVContainer>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, useCssModule } from 'vue';

import type { Props as ContainerProps } from './VContainer.vue';
// import { type CSS_BORDER_RADIUS } from '@/type/index';

export type Padding = `${number}rem` | `${number}rem ${number}rem`;

export interface Props extends Pick<ContainerProps, 'container' | 'tag'> {
    mode?: 'primary' | 'secondary' | 'hover--gray' | 'hover--green' | 'outline' | 'input';
    appearance?: 'gray' | 'gradient' | 'white' | 'warning' | 'green-lite' | 'gray-dark';
    rounded?: '';
}

const props = defineProps<Props>();

const instanse = ref();
const className = useCssModule();
const card = ref<HTMLElement | null>(null);

const rootClass = computed(() => {
    return {
        [className[props.container!]]: props.container,
        [className[props.mode!]]: props.mode,
        [className[props.appearance!]]: props.appearance,
        [`rounded-${props.rounded}`]: props.rounded
    };
});
onMounted(() => {
    instanse.value = getCurrentInstance();
});

// defineExpose({ card })
</script>

<style lang="scss" module>
.gray {
    background: var(--base-02);
}

.gray-dark {
    background: var(--base-03);
}

.white {
    background: var(--base-01);
}

.primary {
    background: var(--base-01);
    box-shadow: var(--box-shadow-md);
}

.outline {
    border: 1px solid var(--base-03);
}

.secondary {
    border: 1px solid var(--base-04);
    transition: var(--transitions-sm);
}

.secondary:hover {
    border-color: var(--green-500);
}

.hover--gray {
    background-color: var(--base-01);
}

.hover--gray:hover {
    background-color: var(--base-02);
}

.hover--green {
    background-color: var(--base-01);
}

.hover--green:hover {
    background-color: var(--green-100);
}

.green-lite {
    background-color: var(--green-100);
}

.input {
    border: 1px solid var(--base-04);
}

.input:hover {
    border-color: var(--base-05);
}
</style>
