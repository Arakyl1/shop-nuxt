<template>
    <Button v-bind="{ ...props }"
    :appearance="'blue'"
    :square="true"
    :icon-left="{ icon: 'arrow-bold', size: '18_18' }"
    class="justify-center button-control-basic"/>
</template>
<script setup lang="ts">
import { default as Button, type Props as ButtonProps } from "@/components/UI/Button/Button.vue";

interface Props extends ButtonProps { }
const props = defineProps<Props>()

</script>

<style lang="css">
@media (max-width: 620px) {
    .button-control-basic {
        height: 2.25rem !important;
    } 
}
</style>