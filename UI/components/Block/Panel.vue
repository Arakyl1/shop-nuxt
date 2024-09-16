<template>
    <div :class="[`Pa_${props.mode}`, $style.panel]">
        <slot/>
        <div v-if="mode === 'view'"/>
    </div>
</template>

<script setup lang="ts">
import type { PanelMode } from "../../type/index";
interface Props {
    mode: PanelMode;
};

const props = withDefaults(defineProps<Props>(), { mode: 'primary' });
</script>

<style lang="css" module>
.panel {
    min-height: 70vh;
}
.panel:empty {
    height: 70vh;
}
</style>