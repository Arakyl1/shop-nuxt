<template>
    <div role="progressbar" :class="[$style.Progress]" :aria-valuenow="value" :aria-valuemin="min" :aria-valuemax="max">
        <div :class="[{ [$style[mode]]: mode }, $style.Progress_value]" :style="{ width: getWidthForProgress(value) + 'px' }"/>
    </div>
</template>

<script setup lang="ts">
import type { ProgressMode } from '../../type/index';

interface Props {
    mode?: ProgressMode;
    value: number;
    min?: number;
    max?: number;
}

const props = withDefaults(defineProps<Props>(), { min: 0, max: 100, value: 10, mode: 'black' });

function getWidthForProgress(value: number) {
    return value / ((props.max - props.min) / 100);
}
</script>

<style lang="css" module>
.Progress {
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 4px;
    border-radius: 999px;
    background-color: var(--base-03);
}

.Progress_value {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
}
</style>
