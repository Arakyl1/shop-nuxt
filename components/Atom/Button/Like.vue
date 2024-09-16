<template>
    <UITButton v-bind="{ ...props }"
    :mode="'gray-icon'"
    :icon-left="{ icon: 'like', size: '28_28' }"
    :class="rootClass" />
</template>
<script setup lang="ts">
import { UITButton } from "#components";
import { type Props as ButtonProps  } from "@/UI/components/Button/Button.vue";

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
    transition: 0; 
}

.button use {
    fill: none;
    stroke-width: 1.5px;
    transition: 0s;
} 

*:hover>.button use,
.button:hover use {
    fill: var(--red-300);
}

.button.active use {
    --icon-color: var(--red-500);
    fill: var(--red-500);
}</style>