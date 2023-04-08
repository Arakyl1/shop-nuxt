<template>
    <div class="w-full">
        <div>
            <div>
                <slot name="header" v-bind="{
                    prevItem,
                    nextItem,
                    indexActiveButton,
                    updateScrolLeftSlader,
                    sladerValueScroll }"></slot>
            </div>
            <div ref="slader" class="basic__slader slader__container" :class="[containerClass]" @scroll="onScroll"
                @pointerdown.passive="onPointerDown" @pointerup.passive="onPointerUp" @pointerleave.passive="onPointerLeave"
                @dragstart.stop.prevent @click="test">
                <template v-for="elem in sladerData" :key="elem">
                    <div class="slader__item">
                        <slot name="item" v-bind="{
                            elem,
                            prevItem,
                            nextItem,
                            indexActiveButton,
                            updateScrolLeftSlader,
                            sladerValueScroll }"></slot>
                    </div>
                </template>
            </div>
            <div>
                <slot name="bottom" v-bind="{
                    prevItem,
                    nextItem,
                    indexActiveButton,
                    updateScrolLeftSlader,
                    sladerValueScroll }"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { sladerValueScroll } from "./type";
interface Props {
    data: any[] | null,
    containerClass?: string
}
const props = withDefaults(defineProps<Props>(), {
    containerClass: '[grid-auto-columns:calc(100%)]'
})

const slader = ref<HTMLElement | null>(null)
const indexActiveButton = ref<number>(0)
const cordsScroll = ref<{ startX: number, startSx: number, difX: number, active: boolean } | null>(null)
const sladerData = computed(() => props.data ? props.data : [...Array(8)])
const buttonAcitive = ref<boolean>(false)
const isScrolling = ref()
const sladerValueScroll = ref<sladerValueScroll>({ current: 0, max: 0 })

function prevItem(): void {
    if (!slader.value) return
    slader.value.scrollBy({ left: -slader.value.clientWidth })
}
function nextItem(): void {
    if (!slader.value) return
    slader.value.scrollBy({ left: slader.value.clientWidth })
}

function updateScrolLeftSlader(index: number): void {
    if (!slader.value) return
    slader.value.scrollLeft = slader.value.clientWidth * index
}

function onScroll({ type }: Event): void {
    if (slader.value && type === 'scroll') {
        indexActiveButton.value = Math.round(+(slader.value.scrollLeft / slader.value.clientWidth).toFixed(1))
        // 
        window.clearTimeout(isScrolling.value)
        isScrolling.value = setTimeout(() => {
            if (!buttonAcitive.value) {
                slader.value!.style.setProperty('scroll-snap-type', 'x mandatory')
            }
            sladerValueScroll.value.current = slader.value!.scrollLeft
        }, 400)
    }
}

function onPointerDown({ clientX, type, pointerId, pointerType }: PointerEvent) {
    if (slader.value && type === 'pointerdown' && pointerType === 'mouse') {
        //slader.value.setPointerCapture(pointerId)
        cordsScroll.value = { startX: clientX, startSx: slader.value.scrollLeft, difX: 0, active: true }
        slader.value.style.setProperty('scroll-snap-type', 'none')
        slader.value.style.setProperty('scroll-behavior', 'auto')
        document.body.style.setProperty('cursor', 'all-scroll')
        slader.value.onpointermove = onPointerMove
        buttonAcitive.value = true
    }
}

function onPointerMove({ clientX, buttons, type, pointerId, pointerType }: PointerEvent) {
    if (type === 'pointermove' && pointerType === 'mouse') {
        if (cordsScroll.value && cordsScroll.value.active && slader.value && buttons !== 0) {
            let difX = cordsScroll.value.startX - clientX
            cordsScroll.value.startX = clientX
            slader.value.scrollBy({ left: difX })
        } else {
            resetScrollData(pointerId)
            cordsScroll.value = null
        }
    }
}

function onPointerUp({ type, pointerId, pointerType }: PointerEvent) {
    if (type === 'pointerup' && pointerType === 'mouse') {
        resetScrollData(pointerId)
        cordsScroll.value = null
    }
}

function onPointerLeave({ type, pointerId, pointerType }: PointerEvent) {
    if (type === 'pointerleave' && pointerType === 'mouse') {
        resetScrollData(pointerId)
        cordsScroll.value = null
    }
}

function resetScrollData(pointerId: number) {
    if (slader.value) {
        slader.value.style.setProperty('scroll-behavior', 'smooth')
        let widthCols: string = window.getComputedStyle(slader.value).getPropertyValue('grid-auto-columns')
        let sladerScrollLeft = slader.value.scrollLeft
        let sladerCotainerWIdth = slader.value.clientWidth
        let difScrollComplet: number = sladerScrollLeft / (sladerCotainerWIdth / (100 / parseInt(widthCols)));
        if (!Number.isInteger(difScrollComplet)) {
            let valueScroll = (Math.round(difScrollComplet) * (sladerCotainerWIdth / (100 / parseInt(widthCols)))) - sladerScrollLeft
            slader.value.scrollBy({ left: valueScroll, behavior: 'smooth' })
        }
        // slader.value.releasePointerCapture(pointerId)
        slader.value.onpointermove = null
        document.body.style.setProperty('cursor', 'auto')
        buttonAcitive.value = false
    }
}

onUpdated(() => {
    if (slader.value) {
        let scrollWidth = Math.max(
            slader.value.clientWidth,
            slader.value.offsetWidth,
            slader.value.scrollWidth
        )
        sladerValueScroll.value.max = scrollWidth - slader.value.clientWidth
    }
})

function test({ type, target}: Event) {
   // console.log(target);
    
}
</script>

<style lang="css">
.basic__slader {
    display: grid;
    grid-auto-flow: column;
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
}

.basic__slader::-webkit-scrollbar {
    display: none;
}
</style>
