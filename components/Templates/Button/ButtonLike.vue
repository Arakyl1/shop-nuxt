<template>
    <Button v-bind="{ ...props }" :appearance="'red-icon'" :icon-left="{ key: 'like', size: '28_28' }" :class="rootClass" />
</template>
<script setup lang="ts">
import { default as Button, type Props as ButtonProps } from "@/components/UI/Button/Button.vue";

interface Props extends ButtonProps { }

const props = defineProps<Props>()
const className = useCssModule()

const rootClass = computed(() => {
    return {
        [className['button']]: true,
        [className['active']]: props.active
    }
})
</script>

<style lang="css" module>
.button {
    --fill-color: var(--transparent);
}

.button g {
    stroke: var(--gray-300);
    stroke-width: 1.5px;
}

*:hover>.button g,
.button:hover g {
    stroke: var(--red-300);
}

.button.active g {
    stroke: var(--red-500);
}</style>