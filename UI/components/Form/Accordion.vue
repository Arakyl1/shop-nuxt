<template>
    <div ref="accordion" data-accordion class="relative">
        <div ref="trigger" class="w-full">
            <slot name="trigger" v-bind="{ isActive, close, onClick, open, onHover, onContextMenu, onFocus }">
                <UButton
                    :mode="'outline'"
                    class="text-sm text-medium"
                    :class="$style.Dropdown_Botton"
                    :active="active || isActive"
                    v-bind="{ iconLeft }"
                    @click="isActive ? close() : onClick()"
                >
                    <Paragraph :size="'xs'" :text="text" />
                </UButton>
            </slot>
        </div>
        <Transition :name="animation || ''">
            <!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
            <div
                ref="body"
                :class="$style.body"
                :style="[isActive ? { height: size && animation ? size.h : 'auto' } : {}]"
                accordion-body
            >
                <slot v-bind="{ isActive, close, onClick, open, onHover, onContextMenu, onFocus }"/>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, ref, unref, watch } from 'vue';

import type { Props as ButtonProps } from '../Button/Button.vue';
import type { Props as CardProps } from '../Block/Card.vue';
import UButton from '../Button/Button.vue';
// import Card from '../Container/Card.vue';
import Paragraph from '../Paragraph/Text.vue';
import useShow from '../../composables/useShow';
import useHeight from '../../composables/useHeight';
import type { useShowProps } from '../../type/index';

export interface Props extends useShowProps, Pick<ButtonProps, 'active' | 'iconLeft' | 'text'>, Partial<Pick<CardProps, 'rounded'>> {
    mode?: 'accordion-mode' | 'primary';
    animation?: 'dropdown' | null;
}

const props = withDefaults(defineProps<Props>(), { mode: 'primary', autoClose: true, triggers: () => ['click'], animation: 'dropdown', rounded: 'lg', iconLeft: () => ({ icon: 'add-plus', size: '24_24' }) });

const accordion = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const body = ref<HTMLElement | null>();
let size: ReturnType<typeof useHeight> | undefined

if (props.animation) {
   size = useHeight(body)
}

const { isActive, close, onClick, open, onHover, onContextMenu, onFocus } = useShow(props, undefined, accordion);

defineExpose({
    trigger,
    close,
    open,
    onClick,
    onHover,
    onContextMenu,
    onFocus
});

</script>

<style lang="css" module>
/* .list {
    z-index: 50;
    width: auto;
} */

.body {
    height: 0;
    overflow: hidden;
    width: inherit;
    transition: var(--transitions--sm);
}
</style>
