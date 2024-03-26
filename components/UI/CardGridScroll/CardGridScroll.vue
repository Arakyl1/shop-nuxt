<template>
    <div :class="className['container']">
        <div v-if="$slots.header">
            <slot name="header" v-bind="{
                prev,
                next,
                indexActiveButton,
                updateScrolLeft,
                listValueScroll
            }"></slot>
        </div>
        <div :class="className['body']" data-card-grid-scroll>
            <ul ref="list"
            :class="[className['grid'], className[container]]" 
            @scroll.stop="onScroll"
            @pointerdown.stop.passive="onPointerDown"
            @pointerup.stop.passive="onPointerUp"
            @pointerleave.stop.passive="onPointerLeave"
            @dragstart.stop.prevent>
                <li v-for="elem, key in data"
                    :class="className['item']">
                    <slot v-bind="{
                        elem,
                        key,
                        prev,
                        next,
                        indexActiveButton,
                        updateScrolLeft,
                        listValueScroll
                    }"></slot>
                </li>
            </ul>
            <div v-if="$slots.center">
                <slot name="center" v-bind="{
                    prev,
                    next,
                    indexActiveButton,
                    updateScrolLeft,
                    listValueScroll
                }"></slot>
            </div>
        </div>
        <div v-if="$slots.footer" class="w-full">
            <slot name="footer" v-bind="{
                prev,
                next,
                indexActiveButton,
                updateScrolLeft,
                listValueScroll
            }"></slot>
        </div>

    </div>
</template>

<script setup lang="ts">

export interface Props {
    data: Array<{ [key: PropertyKey]: any }>,
    container?: 'xs'|'sm'|'md'|'lg'|'xl' 
    size?: number,
    '1024'?: number,
    '768'?: number,
    '600'?: number,
    padding?: string,
    padding1024?: string,
    padding768?: string,
    padding600?: string,
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    container: 'xl',
    size: 4,
    '1024': 4,
    '768': 3,
    '600': 2,
    padding: '1rem',
    padding1024: '1rem',
    padding768: '1rem',
    padding600: '1rem',
 })

const list = ref(null)
const indexActiveButton = ref(0)
const cordsScroll = ref(null)
const buttonActive = ref(false)
const isScrolling = ref()
const listValueScroll = ref({ current: 0, max: 0 })
const className = useCssModule()

// const data = computed(() => props.list ? ((useSlots()).default())[0].children : slots.default())


onMounted(() => {
    window.addEventListener('resize', getValueScroll, { passive: true })
    getValueScroll()
})

onBeforeUnmount(() => window.removeEventListener('resize', getValueScroll))

onActivated(() => {
    window.addEventListener('resize', getValueScroll, { passive: true })
    getValueScroll()
})

onDeactivated(() => window.removeEventListener('resize', getValueScroll))

onUpdated(() => getValueScroll())

const fixedNumber = (num, valFix = 0) => Number((num).toFixed(valFix))

function prev() {
    if (!list.value) return
    list.value.scrollBy({ left: -list.value.clientWidth })
}
function next() {
    if (!list.value) return
    list.value.scrollBy({ left: list.value.clientWidth })
}

function updateScrolLeft(index) {
    if (!list.value) return
    list.value.scrollLeft = Math.ceil(list.value.clientWidth * index)
}

function onScroll(e) {
    
    if (list.value && e.type === 'scroll') {
        let sc = fixedNumber(list.value.scrollLeft)
        let cl = fixedNumber(list.value.clientWidth)
        indexActiveButton.value = Math.round(sc / cl)
        listValueScroll.value.current = listValueScroll.value.max < sc ? listValueScroll.value.max : sc
        window.clearTimeout(isScrolling.value)
        isScrolling.value = setTimeout(() => {
            if (!buttonActive.value && Boolean(list.value)) {
                list.value.style.setProperty('scroll-snap-type', 'x mandatory')
            }
        }, 400)
    }
}

function onPointerDown(event) {
    const { clientX, type, pointerType } = event
    if (list.value && type === 'pointerdown' && pointerType === 'mouse') {
        cordsScroll.value = { startX: clientX, startSx: list.value.scrollLeft, difX: 0, active: true }
        list.value.style.setProperty('scroll-snap-type', 'none')
        list.value.style.setProperty('scroll-behavior', 'auto')
        document.body.style.setProperty('cursor', 'all-scroll')
        list.value.onpointermove = onPointerMove
        buttonActive.value = true
    }
}

function onPointerMove(event) {
    const { clientX, buttons, type, pointerId, pointerType } = event
    if (type === 'pointermove' && pointerType === 'mouse') {
        if (cordsScroll.value && cordsScroll.value.active && list.value && buttons !== 0) {
            let difX = cordsScroll.value.startX - clientX
            cordsScroll.value.startX = clientX
            list.value.scrollLeft += difX
        } else {
            resetScrollData(pointerId, list.value)
            cordsScroll.value = null
        }
    }
}

function onPointerUp(event) {
    const { type, pointerId, pointerType } = event
    if (type === 'pointerup' && pointerType === 'mouse') {
        resetScrollData(pointerId, list.value)
        cordsScroll.value = null
    }
}

function onPointerLeave(event) {
    const { type, pointerId, pointerType } = event
    if (type === 'pointerleave' && pointerType === 'mouse') {
        resetScrollData(pointerId, list.value)
        cordsScroll.value = null
    }
}

function resetScrollData(pointerId, elem) {
    if (elem) {
        elem.style.setProperty('scroll-behavior', 'smooth')
        let widthCols = window.getComputedStyle(elem).getPropertyValue('grid-auto-columns')
        let sL = elem.scrollLeft
        let value = elem.clientWidth / (100 / parseFloat(widthCols))
        let difSc = fixedNumber(sL / value, 2)

        if (!Number.isInteger(difSc)) {
            let resValue = (Math.round(difSc) * value) - sL
            elem.scrollBy({ left: resValue, behavior: 'smooth' })
        }
        elem.onpointermove = null
        document.body.style.setProperty('cursor', 'auto')
        buttonActive.value = false
    }
}

function valueScroll(elem) {
    if (elem) {
        let c = elem.clientWidth,
            o = elem.offsetWidth,
            s = elem.scrollWidth
        let scrollWidth = Math.max(c, o, s)
        return scrollWidth - c
    }
}
function getValueScroll() {
    listValueScroll.value.max = valueScroll(list.value) || 0
}
</script>

<style lang="css" module>
/* purgecss ignore */
.container {
    width: 100%;
}

.body {
    position: relative;
}

.grid {
    display: grid;
    grid-auto-flow: column dense;
    overflow-x: scroll;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none;
    scroll-behavior: smooth;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /* grid-template-columns: repeat(v-bind('props.size'),minmax(0,1fr)); */
    /* grid-auto-columns: calc(100% / v-bind('props.size'));
    margin-right: calc(-1 * v-bind('props.padding'));
    margin-left: calc(-1 * v-bind('props.padding')); */
}
.item {
    scroll-snap-align: start;
}

.grid::-webkit-scrollbar {
    display: none;
}
.xs {
    grid-auto-columns: calc(100%);
}

.lg {
    grid-auto-columns: calc(100% / 4);
    margin-right: -1rem;
    margin-left: -1rem;
}
.lg > li {
    padding-left: 1rem;
    padding-right: 1rem;
}

.xl {
    grid-auto-columns: calc(100% / 4);
    margin-right: -1rem;
    margin-left: -1rem;
}
.xl > li {
    padding-left: 1rem;
    padding-right: 1rem;
}
/* .item {
    padding-left: v-bind('props.padding');
    padding-right: v-bind('props.padding');
} */

@media (max-width: 1024px) {
    .lg {
        grid-auto-columns: calc(100% / 3);
    }
    .xl {
        grid-auto-columns: calc(100% / 3);
    }
     /*.grid {
        grid-auto-columns: calc(100% / v-bind('props[1024]'));
         margin-right: calc(-1 * v-bind('props.padding1024'));
        margin-left: calc(-1 * v-bind('props.padding1024'));
    }

    .item {
        padding-left: v-bind('props.padding1024');
        padding-right: v-bind('props.padding1024');
    } */
}

@media (max-width: 768px) {
    .lg {
        grid-auto-columns: calc(100% / 2);
        margin-right: -0.75rem;
        margin-left: -0.75rem;
    }
    .lg > li {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
    .xl {
        grid-auto-columns: calc(100% / 3);
        margin-right: -0.75rem;
        margin-left: -0.75rem;
    }
    .xl > li {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }
    /*.grid {
        grid-auto-columns: calc(100% / v-bind('props[768]'));
         margin-right: calc(-1 * v-bind('props.padding768'));
        margin-left: calc(-1 * v-bind('props.padding768'));
    }

     .item {
        padding-left: v-bind('props.padding768');
        padding-right: v-bind('props.padding768');
    } */
}

@media (max-width: 640px) {
    .lg {
        grid-auto-columns: calc(100% / 1);
        margin-right: -0.5rem;
        margin-left: -0.5rem;
    }
    .lg > li {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    .xl {
        grid-auto-columns: calc(100% / 2);
        margin-right: -0.5rem;
        margin-left: -0.5rem;
    }
    .xl > li {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }
    /*.grid {
        grid-auto-columns: calc(100% / v-bind('props[600]'));
         margin-right: calc(-1 * v-bind('props.padding600'));
        margin-left: calc(-1 * v-bind('props.padding600'));
    }

    .item {
        padding-left: v-bind('props.padding600');
        padding-right: v-bind('props.padding600');
    } */
}
</style>
