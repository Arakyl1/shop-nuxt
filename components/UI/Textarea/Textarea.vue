<template>
    <textarea
    autocapitalize="sentences"
    ref="textarea"
    class="p-6 w-full"
    :class="rootClass"
    :readonly="props.readonly && Boolean(value)"
    :tabindex="props.readonly || Boolean(value) ? -1 : 0"
    :value="value"
    @input="onInput"
    @change="onInput"
    v-bind="{ placeholder, required, name, autocomplete, disabled  }">
    </textarea>
</template>

<script setup lang="ts">
import { FormElementsBaseParams } from "@/type/intex";

export interface Props extends FormElementsBaseParams {
    modelValue?: number | string,
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'primary',
  readonly: false,
})

const textarea = ref<HTMLTextAreaElement | null>(null)
const className = useCssModule()
const value = ref(props.modelValue)
const emit = defineEmits(['update:modelValue'])

const rootClass = computed(() => {
    return {
        [className['textarea']]: true,
        [className[props.mode]]: props.mode,
        [className['readonly']]: props.readonly && Boolean(value.value)
    }
})

defineExpose({ textarea })

function onInput({ target }) {
    if (target instanceof HTMLTextAreaElement) {
        value.value = target.value
        emit('update:modelValue', target.value)
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
  border: var(--border);
  border-radius: var(--border-rounded, var(--rounded-xl));
  background-color: var(--bg-color);
  resize: vertical;
  color: var(--color);
  font-size: var(--text-md);
}

.textarea::placeholder {
    color: var(--color-placeholder, var(--gray-300));
}

/* HOVER STATE */
.textarea:hover:not(.readonly) {
    border-color: var(--border-hover);
}

/* READONLY STATE */
.textarea.readonly {
    color: var(--color-readonly, var(--gray-300));
    border-color: var(--color-readonly, var(--gray-300));
    background-color: var(--bg-color-readonly, var(--gray-100));
}
/* FOCUS STATE */
.textarea:focus-visible {
  outline: none;
  border-color: var(--focus-border, var(--blue-500));
  box-shadow: var(--focus-shadow, var(--box-shadow-for-state-focus--base));
  caret-color: var(--focus-border, var(--blue-500));
}



.secondary {
    --bg-color: var(--white);
    --border: 1.2px solid var(--gray-700);
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}

.primary {
    --bg-color: var(--gray-100);
    --border: 1px solid #e6e6e6;
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}

.outline {
    --bg-color: var(--transparent);
    --border: 1px solid var(--gray-500);
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}
</style>