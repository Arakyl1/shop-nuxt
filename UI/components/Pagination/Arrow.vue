<template>
    <UButton :icon-left="{ icon: 'arrow-right' }" :square="true" :mode="'blue'" class="justify-center" />
</template>

<script setup lang="ts">
import  { type Props as ButtonProps, default as UButton } from '../Button/Button.vue';

export interface Props extends Pick<ButtonProps, 'text' | 'active' | 'type' | 'height' | 'disabled'> {}
</script>
