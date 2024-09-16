<template>
    <div :class="$style.container">
        <div v-if="$slots.header">
            <slot
                name="header"
                v-bind="{
                    prev,
                    next,
                    indexActiveButton,
                    updateScrollLeft,
                    listValueScroll
                }"
            />
        </div>
        <div :class="$style.body" data-card-grid-scroll>
            <ul
                ref="list"
                :class="[$style.grid, `GS_${container}`]"
                @scroll.stop="onScroll"
                @pointerdown.stop.passive="onPointerDown"
                @pointerup.stop.passive="onPointerUp"
                @pointerleave.stop.passive="onPointerLeave"
                @dragstart.stop.prevent
            >
                <!-- eslint-disable-next-line vue/require-v-for-key -->
                <li v-for="(elem, key) in data || 9" :class="$style.item">
                    <slot
                        v-bind="{
                            elem,
                            key,
                            prev,
                            next,
                            indexActiveButton,
                            updateScrollLeft,
                            listValueScroll
                        }"
                    />
                </li>
            </ul>
            <div v-if="$slots.center">
                <slot
                    name="center"
                    v-bind="{
                        prev,
                        next,
                        indexActiveButton,
                        updateScrollLeft,
                        listValueScroll
                    }"
                />
            </div>
        </div>
        <div v-if="$slots.footer" class="w-full">
            <slot
                name="footer"
                v-bind="{
                    prev,
                    next,
                    indexActiveButton,
                    updateScrollLeft,
                    listValueScroll
                }"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, onUpdated, ref } from '#imports';
import type { GridScrollContainer } from "../../type/index";

export interface Props {
    data: Array<{ [key: PropertyKey]: unknown }>;
    container?: GridScrollContainer;
}

withDefaults(defineProps<Props>(), {
    data: () => [],
    container: 'xl'
});

const list = ref<HTMLElement | null>(null);
const indexActiveButton = ref(0);
const cordsScroll = ref<null | { startX: number; startSx: number; difX: number; active: boolean; }>(null);
const buttonActive = ref(false);
const isScrolling = ref();
const listValueScroll = ref({ current: 0, max: 0 });

onMounted(() => {
    window.addEventListener('resize', getValueScroll, { passive: true });
    setTimeout(() => getValueScroll(), 100);
});

onBeforeUnmount(() => window.removeEventListener('resize', getValueScroll));

onActivated(() => {
    window.addEventListener('resize', getValueScroll, { passive: true });
    setTimeout(() => getValueScroll(), 100);
});

onDeactivated(() => window.removeEventListener('resize', getValueScroll));

onUpdated(() => setTimeout(() => getValueScroll(), 100));

const fixedNumber = (num: number, valFix = 0) => Number(num.toFixed(valFix));

function prev() {
    if (!list.value) return;
    list.value.scrollBy({ left: -list.value.clientWidth });
}
function next() {
    if (!list.value) return;
    list.value.scrollBy({ left: list.value.clientWidth });
}

function updateScrollLeft(index: number) {
    if (!list.value) return;
    list.value.scrollLeft = Math.ceil(list.value.clientWidth * index);
}

function onScroll(e: Event) {
    if (list.value && e.type === 'scroll') {
        const sc = fixedNumber(list.value.scrollLeft);
        const cl = fixedNumber(list.value.clientWidth);
        indexActiveButton.value = Math.round(sc / cl);
        listValueScroll.value.current = listValueScroll.value.max < sc ? listValueScroll.value.max : sc;
        window.clearTimeout(isScrolling.value);
        isScrolling.value = setTimeout(() => {
            if (!buttonActive.value) {
                list.value!.style.setProperty('scroll-snap-type', 'x mandatory');
            }
        }, 400);
    }
}

function onPointerDown(event: PointerEvent) {
    const { clientX, type, pointerType } = event;
    if (list.value && type === 'pointerdown' && pointerType === 'mouse') {
        cordsScroll.value = { startX: clientX, startSx: list.value.scrollLeft, difX: 0, active: true };
        list.value.style.setProperty('scroll-snap-type', 'none');
        list.value.style.setProperty('scroll-behavior', 'auto');
        document.body.style.setProperty('cursor', 'all-scroll');
        list.value.onpointermove = onPointerMove;
        buttonActive.value = true;
    }
}

function onPointerMove(event: PointerEvent) {
    const { clientX, buttons, type, pointerId, pointerType } = event;
    if (type === 'pointermove' && pointerType === 'mouse') {
        if (cordsScroll.value && cordsScroll.value.active && list.value && buttons !== 0) {
            const difX = cordsScroll.value.startX - clientX;
            cordsScroll.value.startX = clientX;
            list.value.scrollLeft += difX;
        } else {
            resetScrollData(pointerId, list.value!);
            cordsScroll.value = null;
        }
    }
}

function onPointerUp(event: PointerEvent) {
    const { type, pointerId, pointerType } = event;
    if (type === 'pointerup' && pointerType === 'mouse') {
        resetScrollData(pointerId, list.value);
        cordsScroll.value = null;
    }
}

function onPointerLeave(event: PointerEvent) {
    const { type, pointerId, pointerType } = event;
    if (type === 'pointerleave' && pointerType === 'mouse') {
        resetScrollData(pointerId, list.value);
        cordsScroll.value = null;
    }
}

function resetScrollData(pointerId: number, elem: null | HTMLElement) {
    if (elem) {
        elem.style.setProperty('scroll-behavior', 'smooth');
        const widthCols = window.getComputedStyle(elem).getPropertyValue('grid-auto-columns');
        const sL = elem.scrollLeft;
        const value = elem.clientWidth / (100 / parseFloat(widthCols));
        const difSc = fixedNumber(sL / value, 2);

        if (!Number.isInteger(difSc)) {
            const resValue = Math.round(difSc) * value - sL;
            elem.scrollBy({ left: resValue, behavior: 'smooth' });
        }
        elem.onpointermove = null;
        document.body.style.setProperty('cursor', 'auto');
        buttonActive.value = false;
    }
}

function valueScroll(elem: null | HTMLElement) {
    if (elem) {
        const c = elem.clientWidth,
            o = elem.offsetWidth,
            s = elem.scrollWidth;
        const scrollWidth = Math.max(c, o, s);
        return scrollWidth - c;
    }
}
function getValueScroll() {
    listValueScroll.value.max = valueScroll(list.value) || 0;
}
</script>

<style lang="css" module>
.container {
    width: 100%;
}

.body {
    position: relative;
}

.grid {
    overflow-x: scroll;
    display: grid;
    grid-auto-flow: column dense;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none;
    scroll-behavior: smooth;
    -webkit-touch-callout: none;

    /* -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none; */
}

.item {
    scroll-snap-align: start;
}

.grid::-webkit-scrollbar {
    display: none;
}
</style>
