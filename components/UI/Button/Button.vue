<template>
    <component :is="isTag" :type="isType"
        :class="rootClass"
        :data-button-id="instanse?.uid"
        :tabindex="disabled || $attrs?.disabled ? -1 : 1">

        <template v-if="iconLeft">
            <Transition v-if="iconTransition" :name="iconTransition" mode="out-in">
                <CreateIcon :name="`${iconLeft.key}_${iconLeft.size}`" aria-hidden="true"/>
                <!-- <component :is="iconLeft"  /> -->
            </Transition>
            <CreateIcon v-else :name="`${iconLeft.key}_${iconLeft.size}`" aria-hidden="true" />
            
        </template>

        <span v-if="text">{{ text }}</span>
        <span v-else-if="$slots.default">
            <slot />
        </span>
        <template v-if="iconRight">
            <Transition v-if="iconTransition" :name="iconTransition" mode="out-in">
                <CreateIcon :name="`${iconRight.key}_${iconRight.size}`" aria-hidden="true"/>
                <!-- <component :is="iconLeft"  /> -->
            </Transition>
            <CreateIcon v-else :name="`${iconRight.key}_${iconRight.size}`" aria-hidden="true" />
            
        </template>

    </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { default as CreateIcon, type Props as CreateIconProps, NameIcon } from "@/content/icons/create.ts";

// элемент кнопка, через пропс можно передать текс, установить иконки справа или слева от текста
// задать различный стили кнопки, если будет недостаточно просов для текста
// контент можно передать через слот

export interface Props {
    // размер падинга кнопки, передаеться одно из ниже приведенных мофихикатора,
    // значение каждого из модификатора можно посмотреть в variables.scss переменая $ButtonBasicPadding
    // некоторые значения пусты, эт сделана на будущее, потом они заполняться
    // менять значения можно, только где указано "0", так же этот размер не должен быть разовым
    size?: '2xs'|'xs'|'sm'|'base'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'none',
    text?: string | number, // текс кнопки
    iconLeft?: { key: NameIcon, size: `${number}_${number}` },
    iconRight?: { key: NameIcon, size: `${number}_${number}` },
    iconTransition?: string,
    square?: boolean,
    rounded?: 'none'|'xs'|'sm'|'base'|'lg'|'xl'|'full',
    mode?: 'primary'|'secondary'|'outline'|'link'|'none',
    appearance?: 'white'|'black'|'gray'|'red'|'blue'|'green'|'yellow'|
    'black-icon'|'gray-icon'|'red-icon'|'blue-icon'|'green-icon'|'yellow-icon',
    tag?: 'button'|'a'|'input'|'nuxt-link',
    type?: 'button'|'reset'|'submit',
    focus?: boolean,
    active?: boolean,
    disabled?: boolean,
    checkHoverParent?: boolean,
    iconNon?: boolean
}


// const props = defineProps({
//     // // размер падинга кнопки, передаеться одно из ниже приведенных мофихикатора,
//     // // значение каждого из модификатора можно посмотреть в variables.scss переменая $ButtonBasicPadding
//     // // некоторые значения пусты, эт сделана на будущее, потом они заполнться
//     // // менять значения можно, только где указан "0", так же этот размер не должен быть разовым
//     // size: { 
//     //     type: String,
//     //     validator(value) {
//     //         return ['2xs','xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'].includes(value)
//     //     }
//     // },
//     // текс кнопки
//     text: { type: [String, Number] },
//     // иконка слева от текста, передаеться компонент иконка из библеотеки "@element-plus/icons-vue";
//     iconLeft: { type: Object },
//     // иконка справа от текста, передаеться компонент иконка из библеотеки "@element-plus/icons-vue";
//     iconRight: { type: Object },
//     // размер иконки число
//     iconSize: {
//         type: Number,
//         default: 16
//     },
//     iconTransition: {
//         type: String,
//     },
//     // сделать кнопку квадратной
//     square: { type: Boolean },
//     // указать скругление кнопки, передаеться один из модификаторов
//     // значение каждого из модификатора можно посмотреть в variables.scss переменая $borderRadius
//     rounded: {
//         type: String,
//         validator(value) {
//             return ['none', 'xs', 'sm', 'base', 'lg', 'xl', 'full'].includes(value)
//         }
//     },
//     // стиль кнопки, на данный момент есть только "outline"
//     mode: {
//         type: String,
//         validator(value) {
//             return ['primary', 'secondary', 'outline', 'outline-2', 'link', 'none'].includes(value)
//         }
//     },
//     // внешний вид кнопки, задний фон, цвет текста для обычного состояние, с классом ".active", :hover, :focus
//     // на данный момент, есть только 'white', 'black', 'grey', буду доделывать по мере необходимости или когда будет UI Kit
//     appearance: {
//         type: String,
//         validator(value) {
//             return ['white', 'black', 'dark', 'grey', 'grey-2', 'rose', 'rose-2'].includes(value)
//         }
//     },
//     // tag элемента, ниже примедены возможные варианты
//     tag: {
//         type: String,
//         default: 'button',
//         validator(value) {
//             return ['button', 'a', 'input', 'nuxt-link'].includes(value)
//         }
//     },
//     // если tag элемнта "button", можно указать тип кнопки
//     type: {
//         type: String,
//         validator(value) {
//             return ['button', 'rest', 'submit'].includes(value)
//         }
//     },
//     // установить стили для элемента в фокусе
//     focus: {
//         type: Boolean, default: false
//     },
//     // активна ли кнопка
//     active: {
//       type: Boolean,
//       default: false  
//     },
//     // состояние отключенего элменета 
//     disabled: {
//         type: Boolean,
//         default: false
//     },
//     // при включеном параметре состояние :hover будет срабатывать при наведениие на родителя
//     checkHoverParent: { 
//         type: Boolean,
//         default: false
//     },
//     iconNon: {
//         type: Boolean,
//         default: false
//     }
// })


const props = withDefaults(defineProps<Props>(), {
    tag: 'button',
    focus: false,
    active: false,
    checkHoverParent: false,
    disabled: false,
    iconNon: false,
    rounded: 'lg'
 })


const className = useCssModule()
const instanse = getCurrentInstance()

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
            [`rounded-${props.rounded}-imp`]: props.rounded,
            [className['padding-' + props.size]]: props.size,
            [className[props.appearance!]]: props.appearance,
            [className['focus']]: props.focus,
            [className['active']]: props.active,
            [className['hover']]: props.checkHoverParent,
            [className['disabled']]: props.disabled,
            [className['icon-none']]: props.iconNon,
            [className['icon--disabled']]: props.disabled &&
                !props.appearance &&
                !props.mode &&
                (props.iconLeft || props.iconRight)
        }
    ]
})

</script>

<style lang="scss" module>
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
    gap: 0 0.375rem;
    flex-wrap: nowrap;
    outline: none;
    background-color: var(--bg-color);
    color: var(--color, var(--white));
    transition: var(--transition, var(--bt-transition--sm));
    --base-outline: 1px var(--button-border-focus-visible) var(--gray-500) !important;
}
.button span {
    color: inherit;
}
.button:not(.icon-none) g[data-type-icon=monocolor] {
    fill: var(--fill-color, var(--white));
    transition: var(--transition, var(--bt-transition--sm));
}

.button:not(.icon-none) g[data-type-icon=outline] {
    stroke: var(--fill-color, var(--white));
    transition: var(--transition, var(--bt-transition--sm));
}

.button:hover:not(.disabled):not(.active)   {
    background-color: var(--bg-color--hover);
    color: var(--color--hover, var(--color, var(--white)));
}
.button:hover:not(.disabled):not(.active):not(.icon-none) g[data-type-icon=monocolor] {
    fill: var(--fill-hover, var(--fill-color, var(--white)));
}
.button:hover:not(.disabled):not(.active):not(.icon-none) g[data-type-icon=outline] {
    stroke: var(--fill-hover, var(--fill-color, var(--white)));
}

*:hover > .button.hover:not(.disabled):not(.active) {
    background-color: var(--bg-color--hover);
    color: var(--color--hover, var(--color, var(--white)));
}
*:hover > .button.hover:not(.disabled):not(.active):not(.icon-none) g[data-type-icon=monocolor] {
    fill: var(--fill-hover, var(--fill-color, var(--white)));
}
*:hover > .button.hover:not(.disabled):not(.active):not(.icon-none) g[data-type-icon=outline] {
    stroke: var(--fill-hover, var(--fill-color, var(--white)));
}


.button.active {
    background-color: var(--bg-color-active, var(--bg-color--hover, var(--bg-color)));
    color: var(--color-active, var(--color--hover, var(--color, var(--black-700))));
    --fill-active-base: var(--fill-active, var(--fill-hover, var(--fill-color, var(--white))));
}
.button.active g[data-type-icon=monocolor]{
    fill: var(--fill-active-base);
}
.button.active g[data-type-icon=outline]{
    stroke: var(--fill-active-base);
}

.button.disabled {
    cursor: no-drop !important;
    background-color: var(--bg-color-disabled, var(--gray-300)) !important;
    color: var(--color-disabled, var(--white)) !important;
}

.button.disabled:not(.icon-none) g[data-type-icon=monocolor] {
    fill: var(--fill-disabled, var(--white)) !important;
}
.button.disabled:not(.icon-none) g[data-type-icon=outline] {
    stroke: var(--fill-disabled, var(--white)) !important;
}

.button.icon--disabled {
    background-color: var(--icon-bg-color-disabled, var(--white)) !important;
}

.button.icon--disabled:not(.icon-none) g[data-type-icon=monocolor] {
    fill: var(--icon-fill-disabled, var(--gray-300)) !important;
}
.button.icon--disabled:not(.icon-none) g[data-type-icon=outline] {
    stroke: var(--icon-fill-disabled, var(--gray-300)) !important;
}
  

.button:focus-visible {
    outline: var(--outline, var(--base-outline));
}



// button link 
.link {
    color: var(--black-500);
    position: relative;
    transition: var(--bt-transition);

    --bg-color: none;
    --color: var(--black-300);
    --fill-color: var(--black-300);
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
    --fill-color: var(--gray-700);
}

// button primary
.primary {
    box-shadow: 0px 0px 15px -2px var(--grey-500);
    --bg-color: var(--white);
    --color: var(--dark-600);
    --fill-color: var(--dark-600);

    --bg-color--hover: var(--grey-200);
    --color--hover: var(--dark-500);
    --fill-hover: var(--dark-500);

    --bg-color-active: var(--dark-500);

    --outline: none;
}

.black {
    --bg-color: var(--black-700);
    --bg-color--hover: var(--black-100);
}
.white {
    --bg-color: var(--white);
    --color: var(--black-700);
    --transition: var(--bt-transition--xs);
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

.black-icon {
    --fill-color: var(--black-300);
    --fill-hover: var(--blue-500);
}

.gray-icon {
    --fill-color: var(--gray-300);
    --fill-hover: var(--red-300);
    --fill-active: var(--red-500)
}

.blue-icon {
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
    --fill-hover: var(--green-700);
}

$padding: '2xs', 'xs', 'sm', 'base','lg','xl','2xl','3xl','4xl';
@each $name in $padding {
  .padding-#{$name} {
    padding: var(--button-base-padding-#{$name}) ;
  } 
}

</style>
