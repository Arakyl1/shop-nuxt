<template>
    <div :class="rootClass" ref="element" :data-elem-status="status">
        <input v-bind="{ ...confingInput, step, min, max, placeholder, autocomplete, ...ariaAttr }"
        ref="elem"
        :type="isType"
        :value="value"
        :data-value="value || false"
        :readonly="props.readonly && Boolean(value)"  
        @blur="onBlur"
        @focus="onFocus"
        @input="onInput"
        :tabindex="props.readonly || Boolean(value) ? -1 : 1">
        <span v-if="span && !placeholder"
        :class="[value ? className['active'] : '']"
        @click="() => elem ? elem.focus() : null">{{ span }}
            <span v-if="required" :class="[ className['required']]">&#10035;</span>
        </span>

        <i :class="[ className['icon']]" v-if="icon">
            <CreateIcon 
            v-bind="{ ...icon }"
            aria-hidden="true"
            @click="(e) => iconClickable ? onIconClick(e) : null"/>
        </i>
    </div>
</template>

<script setup lang="ts">
import { default as CreateIcon, Props as IconProps } from "@/utils/icon/index.vue";

// родитель может отлавливать событие клика по иконке через @icon-click=""
// при условие что установлена иконка и включена функция клика по иконке

export interface Props {
    // тип input
    type?: 'text'|'number'|'email'|'password'|'search'|'tel', 
    // стили оформления input
    mode?: 'primary'|'secondary'|'outline'|'none', 
    // имя input
    name?: string,
    step?: number,
    min?: number,
    max?: number,
    autocomplete?: string,
    // анимерованный placeholder вместо базового
    // если было передано значение для базового placeholder (эт пропс placeholder)
    // то приоритет отдается базовому 
    span?: string,
    // регулярное выражение для проверки валидности текста в импуте
    pattern?: string,
    modelValue?: number | string,
    // базовый placeholder
    placeholder?: string,
    // сделать инпут обязательным
    required?: boolean,
    // сделать доступным только для чтения
    readonly?: boolean,
    // сделать неактивным
    disabled?: boolean,
    icon?: IconProps,
    iconClickable?: boolean

}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    mode: 'outline',
    readonly: false,
    iconClickable: false
})
const emit = defineEmits(['update:modelValue', 'icon-click'])


const confInput = {
    email: {
        pattern: '^([^ ]+@[^ ]+\.[a-z]{2,6}|)$'
    },
    tel: {
        pattern: '[+7|8]([- ]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2})'
    },
    text: {}
}
const listPropDoNotCheck: Array<keyof Props> = ['mode', 'icon', 'modelValue', 'type', 'ariaRequired']

const value = ref(props.modelValue)
const status = ref<'empty'|'invalid'|'valid'>('empty')
const elem = ref<HTMLInputElement | null>(null)
const focus = ref<boolean>(false)
const className = useCssModule()
const attr = useAttrs()
const observer = ref<MutationObserver | null>(null)


const ariaAttr = computed(() => Object.fromEntries(Object.entries(attr).filter(_ => _[0].startsWith('aria-'))))
const confingInput = computed(() => {
    const propsConfig = Object.fromEntries(Object.entries(props).filter(_ => !listPropDoNotCheck.includes(_[0]) && _[1]))
    return Object.assign({ ...confInput[props.type] }, propsConfig)
})

const rootClass = computed(() => {
    return {
        [className['input']]: true,
        [className[props.mode]]: props.mode,
        [className['span-active']]: props.span && !props.placeholder,
        [className['icon']]: props.icon,
        [className['readonly']]: props.readonly && Boolean(value.value),
        [className['focus']]: focus.value 
    }
})

const isType = computed(() => ['text', 'number', 'email', 'password', 'search', 'tel'].includes(props.type) ? props.type : 'text')

onMounted(() =>{
    if (elem.value) {
        observer.value = new MutationObserver((mutationList, observer) => {
            const _elem = mutationList[0].target as HTMLInputElement
            status.value = _elem.value.length > 0 ? (_elem.validity.valid  ? 'valid' : 'invalid') : 'empty' 
        })
        observer.value.observe(elem.value, { attributes: true })
    }
})

onBeforeUnmount(() => {
    if (elem.value && observer.value) {
        observer.value.disconnect()
    }
})


watch(() => props.modelValue, () => {
    value.value = props.modelValue
    if (elem.value) {
        nextTick(() => {
            elem.value!.dispatchEvent(new Event('input', { bubbles: true }));
        })
    }
})


function onInput({ target }) {
    if (target instanceof HTMLInputElement) {
        value.value = props.type === 'number' ? target.valueAsNumber : target.value
        emit('update:modelValue', target.value)
    }
}

function onFocus() {
    focus.value = true
}

function onBlur() {
    focus.value = false
}

function onIconClick(event) {
    emit('icon-click', event)
}
</script>

<style lang="css" module>
/* purgecss ignore */
/* Список всех доступных переменых для цветовой настройки input 
--bg-color - задний фон в обычном состояние
--padding - величина полей
--border - стиль обводки
--border-rounded - величина скругления обводки
--padding-span-active - величина полей при активном span
--padding-with-icon - величина отступа справа при установленой иконке
--padding-input - величина полей для input
--color - цвет текста в обычном состояние
--color-placeholder - цвет текста (placeholder)
--fill-color - цвет заливки или обводки иконки в обычном состояние
--border-hover - цвет обводки в hover состояние
--transition - настройка transition input и иконки
--color-readonly - цвет текста при статусе readonly
--bg-color-readonly - цвет заднего фона при статусе readonly
--fill-readonly - цвет иконки при статусе readonly
--border-readonly - цвет обводки при статусе readonly
--focus-border - цвет обводки при статусе focus

// ВНИМАНИЕ!!! ПЕРМЕННЫЕ КОТОРЫЕ НИЖЕ В СПИСКЕ НЕ ИСПОЛЬЗУЮТЬСЯ!!!!!!
--bg-color--hover - задний фон в hover состояние
--color--hover - цвет текста в hover состояние
--fill-hover - цвет заливки или обводки иконки в hover состояние
--bg-color-active - задний фон в active состояние
--color-active - цвет текста в active состояние
--fill-active - цвет заливки или обводки иконки в active состояние
*/
.input{
    position: relative;
    max-height: 50px;
    padding: var(--padding);
    background-color: var(--bg-color);
    border-radius: var(--border-rounded, var(--rounded-xl));
    border: var(--border);
    transition: var(--input-transition);
    display: flex;
    align-items: center;
}

.input input {
    border: none;
    width: 100%;
    padding: var(--padding-input, 0.25rem);
    color: var(--color);
    font-size: var(--text-sm);
    line-height: 1.1;
    vertical-align: baseline;
}
.input input:not([type=number]) {
    min-width: 100px;
}
.input input:-internal-autofill-selected{
    background: transparent !important;
}
.input > input::placeholder {
    color: var(--color-placeholder, var(--gray-300));
}
.input > input:-webkit-autofill{
    -webkit-box-shadow:0 0 0 50px  var(--bg-color) inset;
}
.input.span-active {
    padding: var(--padding-span-active); 
}
.input.span-active > span {
    display: block;
}
.input > span {
    position: absolute;
    display: none;
    top: 50%;
    left: calc(var(--input-secondary-padding-left) + 0.25rem);
    transform: translateY(-50%);
    font-size: var(--text-sm);
    line-height: 1.1;
    color: var(--gray-300);
    transition: var(--input-transitions-span--xs);
}
.input:not(.readonly) use[type-icon=monocolor] {
    fill: var(--fill-color, var(--gray-700));
    transition: var(--transition, var(--input-transitions--sm));
}
.input:not(.readonly) use[type-icon=outline] {
    stroke: var(--fill-color, var(--gray-700));
    transition: var(--transition, var(--input-transitions--sm));
}

.input.icon {
    padding-right: var(--padding-with-icon, 3.5rem) !important;
}
.icon > svg {
   position: absolute;
   top: 50%;
   right: 1rem;
   transform: translateY(-50%);
}

/* HOVER STATE */
.input:hover:not(.readonly) {
    border-color: var(--border-hover);
}

.input:hover:not(.readonly) use[type-icon=monocolor] {
    fill: var(--border-hover, var(--blue-500));
}
.input:hover:not(.readonly) use[type-icon=outline] {
    stroke: var(--border-hover, var(--blue-500));
}

/* REQUIRED STATE */
.required {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(125%, -50%);
    font-size: 0.5rem;
    color: var(--red-500);
    font-weight: 500;
}


/* READONLY STATE */
.input.readonly {
    border-color: var(--color-readonly, var(--gray-300));
    background-color: var(--bg-color-readonly, var(--gray-100));
}
.input.readonly input {
    color: var(--color-readonly, var(--gray-300));
}

.input.readonly use[type-icon=monocolor] {
    fill: var(--fill-readonly , var(--gray-300));
}
.input.readonly use[type-icon=outline] {
    stroke: var(--fill-readonly , var(--gray-300));
}

/* VALID STATE */
.input[data-elem-status='invalid']:not(.readonly) {
    border-color: var(--invalid);
}
.input[data-elem-status='valid']:not(.readonly) {
    border-color: var(--valid);
}

/* FOCUS STATE */
.input.focus > span, .input > span.active {
    font-size: 10px;
    top: 0.75rem;
}

.input.focus:not(.input.readonly) {
    border-color: var(--focus-border, var(--blue-500));
    box-shadow: var(--focus-shadow, 0 0 0 2px #e7f3ff);
    caret-color: var(--focus-border, var(--blue-500));
}

/* MEDIA STYLE */

@media screen and (min-width: 768px) {
    .input input:not([type=number]) {
        min-width: 200px;
    }
}

.secondary {
    --bg-color: var(--gray-100);
    --padding: 0.75rem 1rem 0.75rem 0.75rem;
    --border: 1.2px solid var(--gray-700);
    --padding-span-active: 1.25rem 1rem 0.75rem 0.75rem;
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}

.primary {
    --bg-color: var(--gray-100);
    --padding: 0.75rem 1rem 0.75rem 0.75rem;
    --border: 1px solid #e6e6e6;
    --padding-span-active: 1.25rem 1rem 0.75rem 0.75rem;
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}

.outline {
    --bg-color: var(--transparent);
    --padding: 0.625rem 1rem;
    --border: 1px solid var(--gray-500);
    --padding-span-active: 1rem 1rem 0.25rem 1rem;
    --color: var(--black-500);
    --border-hover: var(--blue-500);
}
</style>



  