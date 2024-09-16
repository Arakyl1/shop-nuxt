<template>
    <Flex ref="group" :direction="'col'" v-bind="{ ...props }">
        <slot/>
    </Flex>
</template>

<script setup lang="ts">
import { ref } from '#imports';

import Flex from './Flex.vue';
import type { Props as FlexProps } from './Flex.vue';

type Props = Partial<Omit<FlexProps, 'direction'>> & {};

const props = withDefaults(defineProps<Props>(), { align: 'start', widthFull: true });
const group = ref();

defineExpose({ group });
</script>
