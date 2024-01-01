<template>
    <div ref="tooltip" :data-tooltip="instanse.uid" :class="className['tooltip']" @blur.capture="close"
        @mouseleave="close">
        <transition :name="props.animated">
            <div v-show="active && (isActive || always)" :class="rootClass">
                <template v-if="label">{{ label }}</template>
                <template v-else-if="$slots.content">
                    <slot name="content" />
                </template>
            </div>
        </transition>
        <div :class="className['trigger']"
        tabindex="1"
        @click="onClick"
        @mouseenter.capture="onHover"
        @focus.capture="onFocus">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    rounded?: 'none' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'full',
    active?: boolean,
    // Тип подсказки
    type?: 'primary' | 'secondary' | 'info' | 'success' | 'error' | 'disabled' | 'dark',
    position?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center-right' |
    'bottom-left' | 'bottom-center' | 'bottom-right',
    label?: string,
    // подсказка будет активна всегда
    always?: boolean,
    // подсказка будет многострочной
    multiline?: boolean,
    padding?: 'xs' | 'sm',
    contentClass?: string,
    // подсказка будет иметь анимацию
    // по умолчанию затухания
    animated?: string,
    // закрывать подсказку когда активен другая подсказка
    autoClose?: boolean,
    triggers?: Array<'click' | 'hover' | 'focus' | 'contextmenu'>,
    delay?: number,
    closeDelay?: number,
}

const props = withDefaults(defineProps<Props>(), {
    rounded: 'base',
    active: true,
    type: 'primary',
    animated: 'fade',
    delay: 0,
    closeDelay: 100,
    position: 'bottom-center',
    triggers: () => ['hover', 'click', 'focus'],
    autoClose: false,
    padding: 'xs'
})


const emit = defineEmits(['open', 'close'])

const tooltip = ref(null)
const className = useCssModule()
const instanse = getCurrentInstance()
const _watchEvent = watchEvent('data-tooltip', instanse, () => { isActive.value = false })
const { isActive, close, onClick, onHover, onFocus } = useShow(props, _watchEvent)


const rootClass = computed(() => {
    return {
        [className['body']]: true,
        [props.contentClass ? props.contentClass : '']: props.contentClass,
        [className['type--' + props.type]]: props.type,
        [className['size--' + props.padding]]: props.padding,
        [className[props.position]]: props.position,
        [`rounded-${props.rounded}-imp`]: props.rounded,
    }
})


watch(() => isActive.value, (newV) => {
    emit(newV ? 'open' : 'close')
})

</script>

<style lang="css" module>
.tooltip {
    display: inline-flex;
    position: relative;
    font-size: var(--text-sm);
}

.body {
    position: absolute;
    z-index: 20;
    background-color: var(--bg-color, var(--yellow-300));
    color: var(--color, var(--white));
}
.body * {
    color: inherit;
}

.trigger {
    z-index: 10;
    border-radius: var(--trigger-rounded);
}

.trigger:focus-visible {
    outline: var(--trigger-outline);
}

/* оформления подсказки */
.type--primary {
    /* --bg-color: var(--white);
    border: 1px solid var(--gray-700); */
}
.type--info {
    --bg-color: var(--yellow-500);
}
.type--success {
    --bg-color: var(--green-500);
}
.type--disabled {
    --bg-color: var(--gray-300);
}
.type--dark {
    --bg-color: var(--black-500);
}


/* стили padding для подсказки */
.size--xs {
    padding: 0.25rem 0.5rem;
}
.size--sm {
    padding: 0.625rem 0.875rem;
}


/* стили позиционирования  подсказки */
.top-left {
    top: 0rem;
    left: 0;
    transform: translateY(-100%);
}
.top-center {
    top: 0;
    left: 50%;
    transform: translate(-50%, -100%);
}
.top-right {
    top: 0;
    right: 0;
    transform: translateY(-100%);
}
.center-left {
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
}
.center-right {
    top: 50%;
    right: 0;
    transform: translate(100%, -50%);
}
.bottom-left {
    bottom: 0;
    left: 0;
    transform: translate(0, 100%);
}
.bottom-center {
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
}
.bottom-right {
    bottom: 0;
    right: 0;
    transform: translate(0, 100%);
}</style>
