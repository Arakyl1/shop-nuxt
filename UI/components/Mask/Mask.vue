<template>
    <div :class="rootClass" @click.stop="fun(false)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, useCssModule, watch } from 'vue';
import type { MaskMode } from '../../type/index';

export interface Props {
    // при включеном параметре состояние :hover будет срабатывать при наведениие на родителя
    parentHover?: boolean;
    appearance?: MaskMode;
    active?: boolean;
    position?: 'fixed' | 'relative';
    animation?: 'scale';
    hideScroll?: boolean;
    openDelay?: number;
    closeDelay?: number;
    fun?: (...arg: any[]) => any;
}

const props = withDefaults(defineProps<Props>(), {
    parentHover: false,
    appearance: 'dark',
    position: 'fixed',
    animation: 'scale',
    hideScroll: true,
    openDelay: 0,
    closeDelay: 300,
    fun: () => false
});
const className = useCssModule();

const rootClass = computed(() => {
    return {
        [className[props.appearance]]: props.appearance,
        [className['active']]: props.active,
        [className['hover']]: props.parentHover,
        [className[props.position]]: props.position,
        [className['anim-' + props.animation]]: props.animation,
        [className['mask']]: true
    };
});

function addClassForBody(type: boolean) {
    setTimeout(
        () => {
            const elem = document.querySelector(['data-scroll-body']);
            if (!elem) return;
            elem.style.overflowY = type ? 'hidden' : 'auto';
        },
        type ? props.openDelay : props.closeDelay
    );
}

watch(
    () => props.active,
    (nV) => {
        if (!props.hideScroll) return;
        addClassForBody(nV);
    }
);
</script>

<style lang="css" module>
/* 
--bg-color-mask - цвет заднего фона маски
*/

.mask:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    transition: var(--transition-base);
}

.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
}

.relative {
    position: relative;
    z-index: -1;
    height: 100vh;
}

.anim-scale {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition-delay: 250ms;
}

.anim-scale.active {
    opacity: 1;
    transform: scaleY(1);
    transition-delay: 0ms;
}

.anim-scale:after {
    background-color: var(--bg-color-mask, var(--transparent));
}
</style>
