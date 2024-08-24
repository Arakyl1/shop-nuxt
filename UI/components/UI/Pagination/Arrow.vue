<template>
    <UIVButton :icon-left="{ icon: 'Arrow-Right' }" :square="true" :mode="'btM-pagination'" :rounded="'md'" class="justify-center" />
</template>

<script setup lang="ts">
import type { Props as ButtonProps } from '../VButton.vue';

export interface Props extends Pick<ButtonProps, 'text' | 'active' | 'type' | 'height' | 'disabled'> {}
</script>
