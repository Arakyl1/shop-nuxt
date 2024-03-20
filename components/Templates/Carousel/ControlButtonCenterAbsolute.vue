<template>
    <template v-if="listValueScroll.max > 0">
        <ButtonArrow
        :class="className['control-button--left']"
        :disabled="listValueScroll.current === 0"
        @click="prev"
        class="h-11"/>
        <ButtonArrow
        :class="className['control-button--right']"
        :disabled="listValueScroll.current >= listValueScroll.max"
        @click="next"
        class="h-11"/>
    </template>
</template>
<script setup lang="ts">
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'

interface Props {
    prev: () => any,
    next: () => any,
    listValueScroll: {
        current: number;
        max: number;
    }
}

defineProps<Props>()
const className = useCssModule()
</script>

<style lang="css" module>
/* purgecss ignore */
.control-button--left {
    position: absolute;
    transform: translate(-50%, -50%) scale(-1);
    top: 50%;
    left: 0rem;
}
.control-button--right {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 100%;
}
</style>