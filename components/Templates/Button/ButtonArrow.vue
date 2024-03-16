<template>
    <Button v-bind="{ ...props }" :appearance="'blue'" :square="true" :icon-left="{ icon: 'arrow-bold', size: '18_18' }"
        class="justify-center" />
</template>
<script setup lang="ts">
import { default as Button, type Props as ButtonProps } from "@/components/UI/Button/Button.vue";

interface Props extends ButtonProps { }
const props = defineProps<Props>()
</script>