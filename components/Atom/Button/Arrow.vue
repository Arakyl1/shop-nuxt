<template>
    <UITButton
    :square="true"
    :icon-left="{ icon: 'arrow-bold', size: '36_36' }"
    class="justify-center /md:h-12"
    v-bind="{ ...props }"/>
</template>
<script setup lang="ts">
import { UITButton } from "#components";
import { type Props as ButtonProps  } from "@/UI/components/Button/Button.vue";
interface Props extends Omit<ButtonProps, 'square'|'iconLeft'> { }
const props = withDefaults(defineProps<Props>(), { mode: 'blue', height: 'h-10' })
</script>
