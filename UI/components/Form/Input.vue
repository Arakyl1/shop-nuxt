<template>
    <div ref="element" :class="rootClass" :data-elem-status="status">
        <input
            v-bind="{ ...configInput, ...inputAttr, placeholder, autocomplete, name }"
            ref="elem"
            :value="value"
            :type="isType"
            :data-value="value || false"
            :readonly="props.readonly"
            :tabindex="props.readonly ? -1 : 0"
            :required="required"
            @blur="onBlur"
            @focus="onFocus"
            @input="onInput"
            @change="onInput"
        />

        <i v-if="icon?.icon" :class="[iconClickable ? 'pointer' : '', $style.icon]" @click="onIconClick">
            <Icon v-bind="icon" aria-hidden="true" />
        </i>
        <Paragraph
            v-if="span && !icon && ['number', 'text'].includes(type)"
            :class="$style.icon"
            :text="span"
            :color="'black-500'"
            :size="'sm'"
        />
    </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import Paragraph from "../Paragraph/Text.vue";
import Icon from "../Icon/Icon.client.vue";

import { computed, nextTick, onBeforeUnmount, onMounted, ref, useCssModule, useForm, watch } from '#imports';

import type { InputProps } from '../../type/index';

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    mode: 'primary',
    iconSize: '16_16',
    readonly: false,
    iconClickable: false
});
const emit = defineEmits(['update:modelValue', 'icon-click']);

const confInput: { [k: string]: InputHTMLAttributes } = {
    email: {
        // eslint-disable-next-line no-useless-escape
        pattern: '^([^ ]+@[^ ]+\.[a-z]{2,6}|)$'
    }
};

const value = ref(props.modelValue);
const status = ref<'empty' | 'invalid' | 'valid'>('empty');
const elem = ref<HTMLInputElement | null>(null);
const focus = ref<boolean>(false);
const className = useCssModule();
const { addToWatchEventRestore } = useForm();
const observer = ref<MutationObserver | null>(null);

const configInput = computed(() => {
    return Object.prototype.hasOwnProperty.call(confInput, props.type) ? confInput[props.type] : {};
});

const rootClass = computed(() => {
    return {
        [className['input']]: true,
        [`InpM_${props.mode}`]: props.mode,
        [className['icon']]: props.icon,
        [className['readonly']]: props.readonly,
        [className['focus']]: focus.value
    };
});

const isType = computed(() => (['text', 'number', 'email', 'password', 'search', 'tel'].includes(props.type) ? props.type : 'text'));

onMounted(() => {
    if (elem.value) {
        observer.value = new MutationObserver((mutationList) => {
            const _elem = mutationList[0].target as HTMLInputElement;
            status.value = _elem.value.length > 0 ? (_elem.validity.valid ? 'valid' : 'invalid') : 'empty';
        });
        observer.value.observe(elem.value, { attributes: true });
    }
});

addToWatchEventRestore(() => {
    value.value = '';
    emit('update:modelValue', value.value);
});
onBeforeUnmount(() => {
    if (elem.value && observer.value) {
        observer.value.disconnect();
    }
});

watch(
    () => props.modelValue,
    () => {
        value.value = props.modelValue;
        if (elem.value) {
            nextTick(() => {
                elem.value!.dispatchEvent(new Event('input', { bubbles: true }));
            });
        }
    }
);

watch(
    () => props.valid,
    (newV) => {
        if (!newV) return;
        status.value = newV;
        nextTick(() => {
            const event = new Event('invalid', { bubbles: true });
            elem.value.dispatchEvent(event);
        });
    }
);

function onInput({ target }: Event) {
    if (target instanceof HTMLInputElement) {
        value.value = isType.value === 'number' ? target.valueAsNumber : target.value;
        emit('update:modelValue', value.value);
        target.setCustomValidity('');
    }
}

function onFocus() {
    focus.value = true;
}

function onBlur(e) {
    focus.value = false;
    onInput(e);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onIconClick(event: PointerEvent) {
    if (!props.iconClickable) return;
    emit('icon-click', event);
}
</script>

<style lang="css" module>
/* Список всех доступных переменых для цветовой настройки input 
--bg-color - задний фон в обычном состояние
--padding - величина полей
--border - стиль обводки
--border-rounded - величина скругления обводки
--padding-with-icon - величина отступа справа при установленой иконке
--padding-input - величина полей для input
--color - цвет текста в обычном состояние
--color-placeholder - цвет текста (placeholder)
--stroke-color - цвет обводки иконки в обычном состояние
--border-hover - цвет обводки в hover состояние
--transition - настройка transition input и иконки
--color-readonly - цвет текста при статусе readonly
--bg-color-readonly - цвет заднего фона при статусе readonly
--stroke-readonly - цвет иконки при статусе readonly
--border-readonly - цвет обводки при статусе readonly
--focus-border - цвет обводки при статусе focus
*/

.input {
    position: relative;
    display: flex;
    align-items: center;
    max-height: 50px;
    padding: var(--padding);
    border-radius: var(--border-rounded, 4px);
    border: var(--border);
    background-color: var(--bg-color);
    transition: var(--transitions-sm);

    --base-color: none;
    --base-color-readonly: none;
    --base-color-error: none;
    --base-color-success: none;
}

.input input {
    width: 100%;
    padding: var(--padding-input, 0);
    border: none;
    vertical-align: baseline;
    font-size: inherit;
    line-height: inherit;
    color: var(--color);
}

.input input:not([type='number']) {
    min-width: 85px;
}

.input input:-internal-autofill-selected {
    background: transparent;
}

.input > input::placeholder {
    font-size: inherit;
    line-height: inherit;
    color: var(--color-placeholder, var(--base-color));
}

.input > input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 50px var(--bg-color) inset;
}

.input:not(.readonly) svg {
    --icon-color: var(--stroke-color, var(--base-color));
    transition: var(--transition, var(--transitions-sm));
}

.input.icon {
    padding-right: var(--padding-with-icon, 2rem);
}

i.icon {
    display: flex;
    align-items: center;
    height: 26px;
    padding: 2px;
}

/* .icon > svg {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
} */

/* HOVER STATE */
.input:hover:not(.readonly) {
    border-color: var(--border-hover);
}

.input:hover:not(.readonly) input {
    color: var(--color-hover, var(--color, var(--base-color)));
}

.input:hover:not(.readonly) svg {
    --icon-color: var(--stroke-hover, var(--base-color));
}

/* REQUIRED STATE */
.required {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.5rem;
    font-weight: 500;
    color: var(--error, var(--base-color-error));
    transform: translate(125%, -50%);
}

/* READONLY STATE */
.input.readonly {
    border: var(--border-readonly, 1px solid transparent);
    background-color: var(--bg-color-readonly, var(--base-color-readonly));
    pointer-events: none;
}

.input.readonly input {
    color: var(--color-readonly, #fff);
}

/* .input.readonly svg {
    stroke: var(--stroke-readonly, var(--gray-300));
} */

/* VALID STATE */
.input[data-elem-status='invalid']:not(.readonly) {
    border-color: var(--error, var(--base-color-error));
}

/* .input[data-elem-status='valid']:not(.readonly) {
    border-color: var(--valid);
} */

/* FOCUS STATE */
.input.focus:not(:is(.readonly, [data-custom-invalid='true'])) {
    border-color: var(--focus-border, var(--base-color-success));
    box-shadow: var(--box-shadow-primary);
}

.input.focus:not(.readonly) svg {
    --icon-color: var(--focus-stroke, var(--base-color-success));
}
</style>
