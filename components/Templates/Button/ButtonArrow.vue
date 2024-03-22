<template>
    <Button 
    :appearance="'blue'"
    :square="true"
    :height="props.height ? props.height : 'h-10 /md:h-12'"
    :icon-left="{ icon: 'arrow-bold', size: '18_18' }"
    class="justify-center button-control-basic"
    v-bind="{ ...props }"/>
</template>
<script setup lang="ts">
import { default as Button, type Props as ButtonProps } from "@/components/UI/Button/Button.vue";

interface Props extends Omit<ButtonProps, 'appearance'|'square'|'iconLeft'|'height'> { }
const props = defineProps<Props>()

</script>
