<template>
    <Card
        :for="inputAttr?.id"
        :tag="'label'"
        :class="[$style.label, rootClass, `Rad${mode === 'primary'? 'Pr' : 'Sec'}M_${appearance}`]"
        class="flex align-center pointer text-sm"
        data-radio
        :tabindex="inputAttr?.disabled ? -1 : 0"
        v-bind="{ ...labelOpt }"
        @keyup.stop.enter="input?.click()"
    >
        <Paragraph v-if="text && direction === 'left'" :tag="'span'" :text="text" />
        <div :class="[$style[mode], $style[direction === 'left' ? 'ml-2' : 'mr-2']]">
            <input
                ref="input"
                type="radio"
                :checked="Boolean(checked)"
                :disabled="disabled"
                :class="$style.input"
                v-bind="{ ...inputAttr }"
                hidden
            >
            <div :class="$style.check">
                <Icon v-if="mode === 'secondary'" :icon="'Check-primary'" :size="'16_16'" class="stroke-1\5" />
            </div>
        </div>
        <Paragraph v-if="text && direction === 'right'" :tag="'span'" :text="text" />
    </Card>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

import Icon from '../Icon/Icon.client.vue';
import Paragraph from '../Paragraph/Text.vue';
import Card from '../Block/Card.vue';
import type { RadioAppearance } from "../../type/index";
import type { Props as CardProps } from '../Block/Card.vue';
import { computed, ref, useCssModule } from '#imports';

export interface Props {
    disabled?: boolean;
    mode?: 'primary' | 'secondary';
    appearance?: RadioAppearance;
    text?: string | number;
    direction?: 'left' | 'right';
    checked?: boolean;
    inputAttr?: InputHTMLAttributes;
    labelOpt?: CardProps;
}
const props = withDefaults(defineProps<Props>(), {
    direction: 'left',
    mode: 'primary',
    appearance: 'blue',
    checked: false,
    labelOpt: () => ({ mode: 'n' })
});

const input = ref<HTMLInputElement | null>(null);
const className = useCssModule();

const rootClass = computed(() => {
    return {
        [className[props.mode]]: className[props.mode],
        [className['disabled']]: props.disabled
    };
});
</script>

<style lang="css" module>
/* Список всех доступных переменых для цветовой настройки переключателя
--border - стиль обводки переключателя
--border-radius - размер скругления кнопки
--bg-color - цвет заднего фона переключателя
--bg-check-before - цвет заливки активного элемента переключателя
 */

.label:focus-visible {
    outline: none;
}

.primary .check {
    position: relative;
    display: flex;
    width: 16px;
    height: 16px;
    border-radius: var(--border-radius, var(--rounded-full));
    border: var(--border, var(--default-border));
    background-color: var(--bg-color, var(--transparent));
    cursor: pointer;
    transition: all ease-in-out 0.2s;
}

/* .primary .check:before {
    content: none;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 55%;
    aspect-ratio: 1/1;
    border-radius: var(--border-radius, var(--rounded-full));
    background-color: var(--bg-check-before, var(--green-500));
    transform: translate(-50%, -50%);
    transition: var(--transition, var(--transitions-sm));
} */

.primary:not(.disabled):focus .check {
    box-shadow: var(--check-focus-shodow);
}

.primary:not(.disabled) .check:hover {
    --border: var(--check-hover-border);
}

.primary:disabled .check {
    --border: var(--check-disabled-border);
    --bg-color: var(--check-disabled-bg);
}

.primary > input:checked + .check {
    --border: var(--check-checked-border);
}

.primary:not(.disabled) > input:checked + .check:hover {
    --border: var(--check-checked-hover-border);

    box-shadow: var(--check-checked-hover-shabow);
}

.primary.disabled > input:checked + .check {
    --border: var(--check-checked-disabled-border);
}

/* .primary > input:checked + .check:before {
    content: '';
} */

/* .primary label {
    font-size: 0.875em;
} */

.secondary > input + .check {
    display: flex;
    align-items: center;
}

.secondary > input + .check svg {
    --icon-color: var(--transparent);
    transition: all ease-in-out 0.3s;
}

.secondary > input:checked + .check svg {
    --icon-color: var(--svg-checked-stroke);
}

.disabled .check {
    cursor: no-drop;
}
</style>
