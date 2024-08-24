<template>
    <UIVFlex ref="group" :direction="'column'" v-bind="{ ...props }">
        <slot></slot>
    </UIVFlex>
</template>

<script setup lang="ts">
import { ref } from '#imports';

import { default as UIVFlex, type Props as FlexProps } from './VFlex.vue';

type Props = Partial<Omit<FlexProps, 'direction'>> & {};

const props = withDefaults(defineProps<Props>(), { align: 'flex-start', widthFull: true });
const group = ref();

defineExpose({ group });
</script>
