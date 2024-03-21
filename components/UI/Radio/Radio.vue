<template>
    <label
        :class="rootClass"
        ref="label"
        :disabled="disabled"
        @click="onClick"
        @keydown.prevent.enter="label.click()"
        tabindex="-1">
        <input
            type="radio"
            ref="input"
            @click.stop
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="value"
            hidden
            v-bind="{ ...$attrs }">
        <span :class="className['check']" />
        <span :class="className['control-label']">
            <slot>{{ text }}</slot>
        </span>
    </label>
</template>

<script setup lang="ts">
// элемент radio 
// размер radio можно изменить при помощи свойтсва font-size
// просто укажите его элементу 
// например: <Radio :name="'gender'" :mode="'primary'" :text="'Man'" :style="{ 'font-size': '1.5rem' }"/>

interface Props {
    disabled?: boolean,
    name?: string,
    value?: string|number|boolean,
    required?: boolean,
    mode?: 'primary'|'secondary',
    text?: string
}
const props = defineProps<Props>()

const label = ref<HTMLLabelElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const className = useCssModule()

const rootClass = computed(() => {
    return [
    className['radio'],
        props.mode ? className['radio-' + props.mode] : className['radio-primary'],
        props.disabled ? className['radio--disabled'] : '',
    ]
})

function onClick({ target }: MouseEvent) {
    if (input.value && input.value instanceof HTMLInputElement) {
        input.value.click()
    }
}
</script>

<style lang="css" module>
/* purgecss ignore */
.radio {
    display: flex;
    gap: 0 0.25rem;
    font-size: 1rem;
}
.radio .check {
    border-radius: var(--rounded-full);
    display: flex;
    cursor: pointer;
    width: 1em;
    height: 1em;
    position: relative;
}
.radio .check::before {
    content: none;
}

.radio > input:checked + .check:before {
    content: ''
}
.radio .control-label {
    font-size: 0.875em;
}

.radio--disabled .check {
    cursor: no-drop;
}

/* стили для primary radio */
.radio-primary .check {
    border: 1px solid var(--gray-300);
}

.radio-primary .check:before {  
    position: absolute;
    width: 55%;
    aspect-ratio: 1/1 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--blue-500);
    border-radius: var(--rounded-full);
}
</style>