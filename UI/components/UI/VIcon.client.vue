<template>
    <svg :class="[customClass]" :height="size.split('_')[0]!" :width="size.split('_')[1]!">
        <use :href="`/icons/sprite.svg#${icon}`" />
    </svg>
    <!-- <svg-icon :name="icon" :class="[customClass]" :height="size.split('_')[0]!" :width="size.split('_')[1]!" /> -->
</template>

<script setup lang="ts">
import type { IconName } from '@/type/index';

export interface Props {
    icon: IconName;
    size?: `${number}_${number}`;
    customClass?: string;
}

withDefaults(defineProps<Props>(), {
    size: '20_20'
});
</script>
