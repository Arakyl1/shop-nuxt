<template>
    <UITBlockFlex v-if="listValueScroll.max > 0" :class="$style.body" :justify="'between'">
        <ButtonArrow
        :disabled="listValueScroll.current === 0"
        :height="'h-12'"
        @click="prev"/>
        <ButtonArrow
        :disabled="listValueScroll.current >= listValueScroll.max"
         :height="'h-12'"
        @click="next"/>
    </UITBlockFlex>
</template>
<script setup lang="ts">
import { UITBlockFlex } from "#components";
import ButtonArrow from '@/components/Atom/Button/Arrow.vue'

interface Props {
    prev: () => any,
    next: () => any,
    listValueScroll: {
        current: number;
        max: number;
    }
}

defineProps<Props>()
</script>

<style lang="css" module>
.body {
    position: absolute !important;
    transform: translateY(-50%);
    top: 50%;
    width: 100%;
    height: 0;
}
.body > *:nth-child(1) {
    transform: translateX(-50%) scale(-1);
}
.body > *:nth-child(2) {
    transform: translateX(50%);
}
</style>