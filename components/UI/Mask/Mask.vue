<template>
    <div :class="rootClass" @click="fun(false)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

export interface Props {
    // при включеном параметре состояние :hover будет срабатывать при наведениие на родителя
    parentHover?: boolean,
    appearance?: 'white' | 'dark' | 'gray' | 'red',
    active?: boolean,
    position?: 'fixed' | 'relative',
    animation?: 'scale',
    animationMobile?: string,
    hideScroll?: boolean,
    openDelay?: number,
    closeDelay?: number,
    fun?: (...arg: any[]) => any
}

const props = withDefaults(defineProps<Props>(), {
    parentHover: false,
    appearance: 'dark',
    position: 'fixed',
    animation: 'scale',
    hideScroll: true,
    openDelay: 0,
    closeDelay: 300,
    fun: () => false
})
const className = useCssModule()
const { isDesktop, isFirefox, isAndroid, isIos } = useDevice();


const rootClass = computed(() => {
    return {
        [className[props.appearance]]: props.appearance,
        [className['active']]: props.active,
        [className['hover']]: props.parentHover,
        [className[props.position]]: props.position,
        [className['anim-' + props.animation]]: props.animation,
        [className['mask']]: true
    }
})

function checkScreenSizeMoreScrollSize() {
    if (!document && window) return false
    return document.body.clientHeight > window.innerHeight
}

function checkDevice() {
    return isDesktop && !isFirefox && !isAndroid && !isIos && checkScreenSizeMoreScrollSize()
}

function addClassForBody(type:boolean) {
    setTimeout(() => {
        document.body.style.overflow = type ? 'hidden' : 'auto'
        if (checkDevice()) {
            document.body.style.paddingRight = type ? '16px' : '0px'
        }
    }, type ? props.openDelay : props.closeDelay)
}

watch(() => props.active, (nV) => {
    if (!props.hideScroll) return
    addClassForBody(nV)
})
</script>

<style lang="css" module>
/* purgecss ignore */
.mask::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: var(--opacity-transition-for-mask--base);
    z-index: -1;
}
 

.fixed {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 9999;
}

.relative {
    position: relative;
    height: 100vh;
    z-index: -1;
}

.anim-scale {
    transform-origin: top;
    transform: scaleY(0);
    opacity: 0;
    transition-delay: 360ms;
}
.anim-scale.active  {
    transform: scaleY(1);
    opacity: 1;
    transition-delay: 0ms;
}

.anim-scale::after {
    opacity: 0.8;
    
}

.dark::after {
    background-color: var(--black-900);
}



/* OLD STYLE */
/* .fixed {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    transition-delay: 200ms;
    
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


.red:not(.relative), .red::after {
    background-color: var(--red-500);
}

.gray:not(.relative), .gray::after {
    background-color: var(--gray-300);
}

*:hover> .hover::after {
    display: block;} */
</style>