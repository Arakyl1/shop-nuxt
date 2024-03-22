<template>
    <Flex v-if="listValueScroll.max > 0" :class="className['body']" :justify="'between'">
        <ButtonArrow
        :class="className['control-button--left']"
        :disabled="listValueScroll.current === 0"
        @click="prev"/>
        <ButtonArrow
        :class="className['control-button--right']"
        :disabled="listValueScroll.current >= listValueScroll.max"
        @click="next"/>
    </Flex>
</template>
<script setup lang="ts">
import Flex from '@/components/UI/Flex/Flex.vue';
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