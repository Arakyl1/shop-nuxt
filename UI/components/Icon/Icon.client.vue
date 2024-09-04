<template>
    <SvgIcon :name="icon" v-bind="{ stroke: type === 'outline' ? 'var(--icon-color)': undefined, fill: type === 'monocolor' ? 'var(--icon-color)': undefined  }" :class="[customClass]" :height="size.split('_')[0]!" :width="size.split('_')[1]!" />
</template>

<script setup lang="ts">
import { SvgIcon } from "#components";
import type { IconName } from '../../type/index';

export interface Props {
    icon?: IconName;
    size?: `${number}_${number}`;
    customClass?: string;
    type?: 'outline' | 'monocolor'
}

withDefaults(defineProps<Props>(), {
    size: '20_20',
    type: 'outline'
});
</script>
