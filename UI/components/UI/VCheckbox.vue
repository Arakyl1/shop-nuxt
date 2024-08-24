<template>
    <div :class="[$style.root, $style[mode], $style[`flex-direction-${direction}`]]" data-checkbox>
        <input ref="checkbox" type="checkbox" :checked="Boolean(checked)" :class="$style.input" v-bind="{ ...inputAttr }" hidden />
        <div :class="rootClass" :tabindex="inputAttr?.disabled ? -1 : 1" @click.stop="onClick" @keyup.stop.enter="checkbox?.click()">
            <UIVIcon v-bind="{ ...icon }" :class="$style.svg" />
        </div>
        <UIVParagraph v-if="text" :for="inputAttr?.id" :tag="'label'" :text="text" :class="$style.text" class="pointer grow" />
    </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import { computed, ref, useCssModule } from 'vue';

import type { Props as IconProps } from './VIcon.client.vue';

export interface Props {
    mode?: 'primary' | 'secondary';
    icon?: IconProps;
    text?: string | number;
    checked?: boolean;
    direction?: 'left' | 'right';
    inputAttr?: InputHTMLAttributes;
}

const props = withDefaults(defineProps<Props>(), {
    icon: () => ({ icon: 'Check-Primary', size: '12_12' }),
    direction: 'left',
    checked: false,
    mode: 'primary'
});
const checkbox = ref<HTMLInputElement | null>(null);
const className = useCssModule();

const rootClass = computed(() => {
    return [[className['checkbox']], { [className['checkbox-' + props.mode]]: props.mode }];
});

function onClick() {
    if (checkbox.value instanceof HTMLInputElement) {
        checkbox.value.click();
    }
}
</script>

<style lang="css" module>
.root {
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
}

.checkbox {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    aspect-ratio: 1;
    border-radius: var(--checkbox-rounded, 4px);
    border: 1px solid var(--checkbox-border-color);
}

.flex-direction-left {
    flex-direction: row;
}

.flex-direction-right {
    flex-direction: row-reverse;
    justify-content: space-between;
}

.checkbox:hover {
    border-color: var(--checkbox-border-color-hover);
}

/* .checkbox:hover svg {
    stroke: var(--checkbox-border-color-hover);
} */

.input:checked ~ .checkbox {
    border-color: var(--checkbox-border-color-active);
    background-color: var(--checkbox-background-color-active);
}

.input:checked ~ .checkbox svg {
    stroke: var(--checkbox-stroke-color-active);
}

.primary {
    --checkbox-border-color: var(--base-05);
    --checkbox-border-color-hover: var(--green-500);
    --checkbox-border-color-active: var(--green-500);
    --checkbox-background-color-active: var(--green-500);
    --checkbox-stroke-color-active: var(--base-01);
}

.secondary {
    --checkbox-border-color: var(--base-05);
    --checkbox-border-color-hover: var(--base-05);
    --checkbox-border-color-active: var(--green-500);
    --checkbox-background-color-active: var(--green-500);
    --checkbox-stroke-color-active: var(--base-01);
}

*:hover > .secondary input:not(:checked) ~ .checkbox,
.secondary input:not(:checked) ~ .checkbox {
    background-color: var(--base-01);
}
</style>
