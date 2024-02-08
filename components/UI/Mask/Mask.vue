<template>
    <div :class="rootClass" @click="fun(false)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

interface Props {
    // при включеном параметре состояние :hover будет срабатывать при наведениие на родителя
    parentHover?: boolean,
    appearance?: 'white' | 'dark' | 'gray' | 'red',
    opacity?: number,
    active?: boolean,
    fullScreen?: boolean,
    fun?: (...arg: any[]) => any
}

const props = withDefaults(defineProps<Props>(), {
    parentHover: false,
    appearance: 'dark',
    opacity: 0.8,
    fullScreen: true,
    fun: () => false
})
const className = useCssModule()
const { isDesktop, isFirefox } = useDevice();


const rootClass = computed(() => {
    return {
        [className[props.appearance]]: props.appearance,
        [className['active']]: props.active,
        [className['hover']]: props.parentHover,
        [className['relative']]: !props.fullScreen,
        [className['fixed']]: props.fullScreen,
        [className['mask']]: true
    }
})

watch(() => props.active, (newV) => {
    if (!props.fullScreen) return

    if (newV) {
        document.body.style.overflow = 'hidden'
        if (isDesktop && !isFirefox) {
            document.body.style.paddingRight = '16px'
        }
    } else {
        setTimeout(() => {
            document.body.style.overflow = 'auto'
            if (isDesktop && !isFirefox) {
                document.body.style.paddingRight = '0'
            }
        }, 300)
    }
})
</script>

<style lang="css" module>
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    transition-delay: 200ms;
    z-index: 9999;
    transform-origin: top;
    transform: scaleY(0);
    opacity: 0;
}
.fixed.active {
    transform: scaleY(1);
    opacity: v-bind('props.opacity');
    transition-delay: 0ms;
}
.relative {
    position: relative;
}

.relative:not(.fixed)::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: v-bind('props.opacity');
    transition: var(--opacity-transition-for-mask--base);
    display: none;
}

.relative:not(.active):not(.fixed):hover::after {
    display: block;
}

.relative.active:not(.fixed)::after {
    display: block;
}

.white:not(.relative), .white::after {
    background-color: var(--white);
}

.dark:not(.relative), .dark::after {
    background-color: var(--black-900);
}

.red:not(.relative), .red::after {
    background-color: var(--red-500);
}

.gray:not(.relative), .gray::after {
    background-color: var(--gray-300);
}

*:hover> .hover::after {
    display: block;
}</style>