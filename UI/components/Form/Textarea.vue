<template>
    <textarea
        ref="textarea"
        autocapitalize="sentences"
        class="w-full"
        :class="rootClass"
        :readonly="props.readonly && Boolean(value)"
        :tabindex="props.readonly || Boolean(value) ? -1 : 0"
        :value="value"
        v-bind="{ placeholder, required, name, autocomplete, disabled }"
        @input="onInput"
        @change="onInput"
    />
</template>

<script setup lang="ts">
import { computed, ref, useCssModule } from '#imports';

import type { FormElementsBaseParams } from '../../type/index';

export interface Props extends FormElementsBaseParams {
    modelValue?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'outline',
    readonly: false
});

const textarea = ref<HTMLTextAreaElement | null>(null);
const className = useCssModule();
const value = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

const rootClass = computed(() => {
    return {
        [className['textarea']]: true,
        [className[props.mode]]: props.mode,
        [className['readonly']]: props.readonly && Boolean(value.value)
    };
});

defineExpose({ textarea });

function onInput({ target }) {
    if (target instanceof HTMLTextAreaElement) {
        value.value = target.value;
        emit('update:modelValue', target.value);
    }
}
</script>

<style lang="css" module>
/* 
--bg-color - задний фон в обычном состояние
--border - стиль обводки
--border-rounded - величина скругления обводки
--color - цвет текста в обычном состояние
--color-placeholder - цвет текста (placeholder)
--border-hover - цвет обводки в hover состояние
--transition - настройка transition input и иконки
--color-readonly - цвет текста при статусе readonly
--bg-color-readonly - цвет заднего фона при статусе readonly
--border-readonly - цвет обводки при статусе readonly
--focus-border - цвет обводки при статусе focus
--focus-shadow - значение тени для статусе focus
*/
.textarea {
    padding: var(--padding);
    border-radius: var(--border-rounded, 12px);
    border: var(--border);
    background-color: var(--bg-color);
    color: var(--color);
    resize: none;
}

.textarea::placeholder {
    color: var(--color-placeholder, var(--text-03));
}

/* HOVER STATE */
.textarea:not(.readonly):hover {
    border-color: var(--border-hover);
}

/* READONLY STATE */

/* .textarea.readonly {
    color: var(--color-readonly, var(--gray-300));
    border-color: var(--color-readonly, var(--gray-300));
    background-color: var(--bg-color-readonly, var(--gray-100));
} */

/* FOCUS STATE */

.textarea:focus-visible:not(.readonly) {
    border-color: var(--focus-border, var(--green-500));
    outline: none;
    box-shadow: var(--focus-shadow, 0 0 0 2px var(--green-100));
}

.outline {
    --bg-color: var(--transparent);
    --padding: 15px 11px 8px 15px;
    --border: 1px solid var(--base-04);
    --color: var(--text-01);
    --stroke-color: var(--text-04);
    --border-hover: var(--base-05);
}

.secondary {
    --bg-color: var(--white);
    --border: 1.2px solid var(--gray-700);
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}
</style>
