<template>
    <Button v-bind="{ ...props }"
    :appearance="'blue'"
    :square="true"
    :icon-left="{ key: 'arrow-bold', size: '8_15' }"
    class="justify-center"/>
</template>
<script setup lang="ts">
import { default as Button, type Props as ButtonProps} from "@/components/UI/Button/Button.vue";

interface Props extends ButtonProps {}

const props = defineProps<Props>()
// const className = useCssModule()

// const rootClass = computed(() => {
//     return {
//         [className['button']]: true,
//         [className['active']]: props.active
//     }
// })
</script>