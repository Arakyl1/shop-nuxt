<template>
    <component
        :is="isTag"
        ref="button"
        :type="isType"
        :class="rootClass"
        :data-button-id="instanse?.uid"
        :data-uid="instanse?.uid"
        :tabindex="disabled || $attrs?.disabled ? -1 : 0"
        :disabled="disabled"
    >
        <template v-if="iconLeft">
            <Transition v-if="iconTransition" :name="iconTransition" mode="out-in">
                <UIVIcon v-bind="{ ...iconLeft }" aria-hidden="true" />
            </Transition>
            <UIVIcon v-else v-bind="{ ...iconLeft }" aria-hidden="true" />
        </template>

        <p v-if="text" button-text>{{ text }}</p>
        <slot v-else-if="$slots.default" />

        <template v-if="iconRight">
            <Transition v-if="iconTransition" :name="iconTransition" mode="out-in">
                <UIVIcon v-bind="{ ...iconRight }" aria-hidden="true" />
            </Transition>
            <UIVIcon v-else v-bind="{ ...iconRight }" aria-hidden="true" />
        </template>
    </component>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, useCssModule } from 'vue';

import { NuxtLink } from '#components';

import type { ButtonMode, CSS_BORDER_RADIUS } from '../../type/index';
import { default as UIVIcon, type Props as IconProps } from './VIcon.client.vue';

// элемент кнопка, через пропс можно передать текс, установить иконки справа или слева от текста
// задать различный стили кнопки, если будет недостаточно просов для текста
// контент можно передать через слот

export interface Props {
    text?: string | number;
    iconLeft?: IconProps;
    iconRight?: IconProps;
    iconTransition?: string;
    square?: boolean;
    rounded?: CSS_BORDER_RADIUS;
    mode?: ButtonMode;
    appearance?: 'green' | 'gray' | 'gray-icon' | 'gray-primary-icon' | 'dark' | 'error' | 'error-lite';
    tag?: 'button' | 'a' | 'input' | 'nuxt-link';
    type?: 'button' | 'reset' | 'submit';
    focus?: boolean;
    active?: boolean;
    disabled?: boolean;
    checkHoverParent?: boolean;
    iconNon?: boolean;
    height?: `h-${number}`;
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'button',
    type: 'button',
    focus: false,
    active: false,
    checkHoverParent: false,
    disabled: false,
    iconNon: false,
    rounded: 'lg',
    height: 'h-8'
});

const className = useCssModule();
const instanse = ref();
const button = ref<HTMLElement | null>(null);

const isType = computed(() =>
    ['button', 'input'].includes(props.tag) ? (['button', 'reset', 'submit'].includes(props.type) ? props.type : 'button') : undefined
);

const isTag = computed(() => (props.tag === 'nuxt-link' ? NuxtLink : props.tag));

const rootClass = computed(() => {
    return [
        className['button'],
        {
            ['aspect-ratio']: props.square,
            [props.mode!]: props.mode,
            [`rounded-${props.rounded}`]: props.rounded,
            [className[props.appearance!]]: props.appearance,
            [className['focus']]: props.focus,
            [className['active']]: props.active,
            [className['hover']]: props.checkHoverParent,
            [className['disabled']]: props.disabled,
            [props.height]: props.height,
            [className['icon-none']]: props.iconNon,
            [className['icon--disabled']]: props.disabled && !props.appearance && !props.mode && (props.iconLeft || props.iconRight)
        }
    ];
});

onMounted(() => {
    instanse.value = getCurrentInstance();
});

defineExpose({ button });
</script>

<style lang="scss" module>
// Список всех доступных переменых для цветовой настройки кнопки
// --bg-color - задний фон в обычном состояние
// --color - цвет текста в обычном состояние
// --stroke-color - цвет заливки или обводки иконки в обычном состояние
// --bg-color-hover - задний фон в hover состояние
// --color-hover - цвет текста в hover состояние
// --stroke-hover - цвет заливки или обводки иконки в hover состояние
// --bg-color-active - задний фон в active состояние
// --color-active - цвет текста в active состояние
// --stroke-active - цвет заливки или обводки иконки в active состояние
// --bg-color-disabled - задний фон в disabled состояние
// --color-disabled - цвет текста в disabled состояние
// --stroke-disabled - цвет заливки или обводки иконки в disabled состояние
// --icon-bg-color-disabled - задний фон в disabled состояние(эт если в кнопке есть только иконка)
// --icon-stroke-disabled - цвет заливки или обводки иконки в disabled состояние(эт если в кнопке есть только иконка)
// --outline - настройка outline кнопки в состояние :focus-visible
// --transition - настройка transition кнопки и иконки
.button {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    margin: 0;
    border: var(--border, none);
    background-color: var(--bg-color);
    outline: none;
    text-decoration: none;
    color: var(--color, var(--text-01));
    text-wrap: nowrap;
    gap: 0 0.75rem;
    transition: var(--transition, var(--transitions-sm));
    cursor: pointer;

    --base-outline: 2px solid var(--green-100);
}

.button > p[button-text] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
}

.button:not(.icon-none) svg {
    stroke: var(--stroke-color, var(--text-01));
    transition: var(--transition, var(--transitions-sm));
}

// HOVER STATE
*:hover > .button.hover:not(:is(.disabled, .active)),
.button:hover:not(:is(.disabled, .active)) {
    border: var(--border-hover, var(--border, none));
    background-color: var(--bg-color-hover);
    color: var(--color-hover, var(--color, var(--text-01)));
}

*:hover > .button.hover:not(:is(.disabled, .active, .icon-none)) svg,
.button:hover:not(:is(.disabled, .active, .icon-none)) svg {
    stroke: var(--stroke-hover, var(--stroke-color, var(--text-01)));
}

// ACTIVE STATE
.button.active {
    border: var(--border-active, var(--border-hover, var(--border, none)));
    background-color: var(--bg-color-active, var(--bg-color-hover, var(--bg-color)));
    color: var(--color-active, var(--color-hover, var(--color, var(--green-500))));
}

.button.active svg {
    stroke: var(--stroke-active, var(--stroke-hover, var(--stroke-color, var(--green-500))));
}

// DISABLED STATE
.button.disabled {
    border: var(--border-disabled);
    background-color: var(--bg-color-disabled, var(--base-02));
    color: var(--color-disabled, var(--text-03));
    cursor: no-drop;
}

.button.disabled:not(.icon-none) svg {
    stroke: var(--stroke-disabled, var(--text-03));
}

// DISABLED STATE (when there is only an icon in the button)
.button.icon--disabled {
    background-color: var(--icon-bg-color-disabled, var(--base-02));
}

.button.icon--disabled:not(.icon-none) svg {
    stroke: var(--icon-stroke-disabled, var(--text-03));
}

// FOCUS STATE
.button:focus-visible {
    outline: var(--outline, var(--base-outline));
}

.green {
    --bg-color: var(--green-500);
    --color: var(--base-01);
    --stroke-color: var(--base-01);
    --bg-color-hover: var(--green-300);
}

.error {
    --bg-color: var(--error-500);
    --color: var(--base-01);
    --stroke-color: var(--base-01);
    --bg-color-hover: var(--error-300);
}

.error-lite {
    --color: var(--error-500);
    --stroke-color: var(--error-500);
    --bg-color: var(--error-100);
    --bg-color-hover: var(--error-100);
}

.gray {
    --color: var(--text-03);
    --color-hover: var(--text-04);
    --stroke-color: var(--text-03);
}

.gray-icon {
    --color: var(--text-04);
    --stroke-color: var(--text-04);
    --stroke-hover: var(--text-03);
}

.gray-primary-icon {
    --color: var(--text-04);
    --stroke-color: var(--text-04);
    --stroke-hover: var(--green-500);
}

.dark {
    --bg-color: var(--black-100);
    --color: var(--base-01);
    --stroke-color: var(--base-01);
    --bg-color-hover: var(--black-100);
    --bg-color-disabled: var(--black-100);
    --icon-bg-color-disabled: var(--black-100);
    --color-disabled: var(--base-01);
    --icon-stroke-disabled: var(--base-01);
    --stroke-disabled: var(--base-01);
}
</style>
