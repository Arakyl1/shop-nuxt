<template>
    <component :is="isTag" :type="isType"
        :class="rootClass"
        :data-button-id="instanse?.uid"
        :data-uid="instanse?.uid"
        :tabindex="disabled || $attrs?.disabled ? -1 : 1"
        :disabled="disabled"
        ref="button">

        <template v-if="iconLeft">
            <Transition v-if="iconTransition" :name="iconTransition" mode="out-in">
                <CreateIcon v-bind="{ ...iconLeft }" aria-hidden="true"/>
                <!-- <component :is="iconLeft"  /> -->
            </Transition>
            <CreateIcon v-else v-bind="{ ...iconLeft }" aria-hidden="true" />
            
        </template>

        <p v-if="text">{{ text }}</p>

        <p v-else-if="$slots.default">
            <slot />
        </p>
        <template v-if="iconRight">
            <Transition v-if="iconTransition" :name="iconTransition" mode="out-in">
                <CreateIcon v-bind="{ ...iconRight }" aria-hidden="true"/>
                <!-- <component :is="iconLeft"  /> -->
            </Transition>
            <CreateIcon v-else v-bind="{ ...iconRight }" aria-hidden="true" />
            
        </template>

    </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { CSS_BORDER_RADIUS } from "@/type/intex";
import { default as CreateIcon, Props as IconProps } from "@/utils/icon/index.vue";

// элемент кнопка, через пропс можно передать текс, установить иконки справа или слева от текста
// задать различный стили кнопки, если будет недостаточно просов для текста
// контент можно передать через слот

export interface Props {
    text?: string | number, // текс кнопки
    iconLeft?: IconProps,
    iconRight?: IconProps,
    iconTransition?: string,
    square?: boolean,
    rounded?: CSS_BORDER_RADIUS,
    mode?: 'primary'|'secondary'|'outline'|'link'|'none'|'empty',
    appearance?: 'black'|'white'|'gray'|'red'|'blue'|'green'|'yellow'|
    'white-icon'|'black-icon'|'gray-icon'|'red-icon'|'blue-icon'|'green-icon'|'yellow-icon',
    tag?: 'button'|'a'|'input'|'nuxt-link',
    type?: 'button'|'reset'|'submit',
    focus?: boolean,
    active?: boolean,
    disabled?: boolean,
    checkHoverParent?: boolean,
    iconNon?: boolean,
    height?: `h-${number}`,
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
    height: 'h-10'
 })


const className = useCssModule()
const instanse = ref()
const button = ref<HTMLElement | null>(null)

const isType = computed(() => props.tag === ('button' || 'input') ?
    (['button', 'reset', 'submit'].includes(props.type) ? props.type : 'button') :
    undefined
)

const isTag = computed(() => props.tag === 'nuxt-link' ? NuxtLink : props.tag)

const rootClass = computed(() => {
    return [
        className['button'],
        {
            ['aspect-ratio--imp']: props.square,
            [className[props.mode!]]: props.mode,
            [`rounded-${props.rounded}`]: props.rounded && getTypeButton(),
            [className[props.appearance!]]: props.appearance,
            [className['focus']]: props.focus,
            [className['active']]: props.active,
            [className['hover']]: props.checkHoverParent,
            [className['disabled']]: props.disabled,
            [props.height]: props.height && getTypeButton(),
            [className['icon-none']]: props.iconNon,
            [className['icon--disabled']]: props.disabled &&
                !props.appearance &&
                !props.mode &&
                (props.iconLeft || props.iconRight)
        }
    ]
})

onMounted(() => {
    instanse.value = getCurrentInstance()
})

defineExpose({ button })


function getTypeButton() {
    return (props.appearance && !props.appearance?.endsWith('-icon')) ||
        (props.mode && !['none','link'].includes(props.mode))

}
</script>

<style lang="scss" module>
/* purgecss ignore */
// Список всех доступных переменых для цветовой настройки кнопки
// --bg-color - задний фон в обычном состояние
// --color - цвет текста в обычном состояние
// --fill-color - цвет заливки или обводки иконки в обычном состояние
// --bg-color--hover - задний фон в hover состояние
// --color--hover - цвет текста в hover состояние
// --fill-hover - цвет заливки или обводки иконки в hover состояние
// --bg-color-active - задний фон в active состояние
// --color-active - цвет текста в active состояние
// --fill-active - цвет заливки или обводки иконки в active состояние
// --bg-color-disabled - задний фон в disabled состояние
// --color-disabled - цвет текста в disabled состояние
// --fill-disabled - цвет заливки или обводки иконки в disabled состояние
// --icon-bg-color-disabled - задний фон в disabled состояние(эт если в кнопке есть только иконка)
// --icon-fill-disabled - цвет заливки или обводки иконки в disabled состояние(эт если в кнопке есть только иконка)
// --outline - настройка outline кнопки в состояние :focus-visible
// --transition - настройка transition кнопки и иконки
.button {
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    text-decoration: none;
    border: 0;
    margin: 0;
    padding: 0;
    user-select: none;
    text-wrap: nowrap;
    display: flex;
    align-items: center;
    gap: 0 0.25rem;
    font-size: 1rem;
    flex-wrap: nowrap;
    outline: none;
    background-color: var(--bg-color);
    color: var(--color, var(--white));
    transition: var(--transition, var(--transitions--sm));
    --base-outline: 1px var(--button-border-focus-visible) var(--gray-500) !important;
}
.button p {
    color: inherit;
    font-size: inherit;
}
.button:not(.icon-none) use[type-icon=monocolor] {
    fill: var(--fill-color, var(--white));
    transition: var(--transition, var(--transitions--sm));
}

.button:not(.icon-none) use[type-icon=outline] {
    stroke: var(--fill-color, var(--white));
    transition: var(--transition, var(--transitions--sm));
}

.button:hover:not(.disabled):not(.active)   {
    background-color: var(--bg-color--hover);
    color: var(--color--hover, var(--color, var(--white)));
}
.button:hover:not(.disabled):not(.active):not(.icon-none) use[type-icon=monocolor] {
    fill: var(--fill-hover, var(--fill-color, var(--white)));
}
.button:hover:not(.disabled):not(.active):not(.icon-none) use[type-icon=outline] {
    stroke: var(--fill-hover, var(--fill-color, var(--white)));
}

*:hover > .button.hover:not(.disabled):not(.active) {
    background-color: var(--bg-color--hover);
    color: var(--color--hover, var(--color, var(--white)));
}
*:hover > .button.hover:not(.disabled):not(.active):not(.icon-none) use[type-icon=monocolor] {
    fill: var(--fill-hover, var(--fill-color, var(--white)));
}
*:hover > .button.hover:not(.disabled):not(.active):not(.icon-none) use[type-icon=outline] {
    stroke: var(--fill-hover, var(--fill-color, var(--white)));
}


.button.active {
    background-color: var(--bg-color-active, var(--bg-color--hover, var(--bg-color)));
    color: var(--color-active, var(--color--hover, var(--color, var(--black-700))));
    --fill-active-base: var(--fill-active, var(--fill-hover, var(--fill-color, var(--white))));
}
.button.active use[type-icon=monocolor]{
    fill: var(--fill-active-base);
}
.button.active use[type-icon=outline]{
    stroke: var(--fill-active-base);
}

.button.disabled {
    cursor: no-drop !important;
    background-color: var(--bg-color-disabled, var(--gray-300)) !important;
    color: var(--color-disabled, var(--white)) !important;
}

.button.disabled:not(.icon-none) use[type-icon=monocolor] {
    fill: var(--fill-disabled, var(--white)) !important;
}
.button.disabled:not(.icon-none) use[type-icon=outline] {
    stroke: var(--fill-disabled, var(--white)) !important;
}

.button.icon--disabled {
    background-color: var(--icon-bg-color-disabled, var(--white)) !important;
}

.button.icon--disabled:not(.icon-none) use[type-icon=monocolor] {
    fill: var(--icon-fill-disabled, var(--gray-300)) !important;
}
.button.icon--disabled:not(.icon-none) use[type-icon=outline] {
    stroke: var(--icon-fill-disabled, var(--gray-300)) !important;
}
  

.button:focus-visible {
    outline: var(--outline, var(--base-outline));
}


.button > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}



// button link 
.link {
    --bg-color: none;
    --color: var(--black-500);
    --fill-color: var(--black-500);
    --bg-color--hover: none;
    --color--hover: var(--blue-500)
}

// button none
.none {
    --bg-color: none;
    --color: var(--black-700);
    --fill-color: var(--black-700);

    --bg-color--hover: none;
    --outline: none
}

// кнопка с обводкой
.outline {
    border: 1px solid var(--gray-500);
    border-radius: var(--rounded-sm);
    --color: var(--black-500);
    --fill-color: var(--gray-700);
}

// button primary
.primary {
    box-shadow: 0px 0px 15px -2px var(--gray-500);
    --bg-color: var(--white);
    --color: var(--gray-700);
    --fill-color: var(--gray-700);
    --color--hover: var(--gray-500);
    --fill-hover: var(--gray-500);
    --bg-color-active: var(--blue-500);
    --outline: none;
}

.black {
    --bg-color: var(--black-700);
    --bg-color--hover: var(--black-100);
}
.white {
    --bg-color: var(--white);
    --color: var(--black-700);
    --transition: var(--transition--xs);
    --fill-color: var(--black-700);
    --bg-color--hover: var(--gray-100);
}

.gray {
    --bg-color: var(--gray-200);
    --color: var(--black-700);
    --fill-color: var(--black-700);
    --bg-color--hover: var(--black-100);
}
.blue {
    --bg-color: var(--blue-500);
    --bg-color--hover: var(--blue-300);
    --bg-color-active: var(--yellow-500);
}

.red {
    --bg-color: var(--red-500);
    --bg-color--hover: var(--red-300);
}

.yellow {
    --bg-color: var(--yellow-500);
    --bg-color--hover: var(--yellow-300);
}

.green {
    --bg-color: var(--green-500);
    --bg-color--hover: var(--green-300);
}

.white-icon {
    --fill-color: var(--white);
    --fill-hover: var(--yellow-100);
}

.black-icon {
    --fill-color: var(--black-300);
    --fill-hover: var(--blue-500);
}

.gray-icon {
    --color: var(--gray-700);
    --fill-color: var(--gray-300);
    --fill-hover: var(--red-300);
    --fill-active: var(--red-500)
}

.blue-icon {
    --color: var(--blue-500);
    --fill-color: var(--blue-500);
    --fill-hover: var(--blue-300);
}
.red-icon {
    --fill-color: var(--red-500);
    --fill-hover: var(--red-300);
    --fill-active: var(--red-500);
}
.yellow-icon {
    --fill-color: var(--yellow-500);
    --fill-hover: var(--blue-300);
}

.green-icon {
    --fill-color: var(--green-500);
    --fill-hover: var(--green-300);
}

</style>
