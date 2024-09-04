<template>
    <Flex ref="group" :direction="'column'" v-bind="{ ...props }">
        <slot></slot>
    </Flex>
</template>

<script setup lang="ts">
import { ref } from '#imports';

import { default as Flex, type Props as FlexProps } from './Flex.vue';

type Props = Partial<Omit<FlexProps, 'direction'>> & {};

const props = withDefaults(defineProps<Props>(), { align: 'flex-start', widthFull: true });
const group = ref();

defineExpose({ group });
</script>
