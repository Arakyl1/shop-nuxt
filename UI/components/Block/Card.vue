<template>
    <Container ref="card" :class="rootClass" :container="container" :tag="tag" data-card>
        <slot/>
    </Container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { Props as ContainerProps } from './Container.vue';
import type { CardMode, CSS_BORDER_RADIUS } from "../../type/index";
import Container from "./Container.vue";

export interface Props extends Pick<ContainerProps, 'container' | 'tag'> {
    mode?: CardMode;
    rounded?: CSS_BORDER_RADIUS;
}

const props = defineProps<Props>();
const card = ref<HTMLElement | null>(null);

const rootClass = computed(() => {
    return {
        [`Ca_${props.mode}`]: props.mode,
        [`rounded-${props.rounded}`]: props.rounded
    };
});

defineExpose({ card })
</script>
