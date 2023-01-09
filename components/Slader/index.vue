<template>
<div class="w-full">
    <div v-if="data">
    <div>
        <slot name="header" v-bind="{
            prevItem, nextItem
        }">
        <div class="flex mb-6 lg:mb-4 items-center">
            <h2 class="text-3xl grow lg:text-2xl sm:text-xl">{{ defaultTitle }}</h2>
            <div class="flex">
                <ButtomArround @click="prevItem" class=" -scale-100 group big xl:py-3 sm:py-2"/>
                <ButtomArround @click="nextItem" class="ml-5  group big xl:py-3 xl:ml-4 sm:py-2"/>
            </div>
        </div>
        <div class="decor-line mb-8 lg:mb-6"></div>
        </slot>
    </div>
    <div
    v-if="data.length"
    ref="slader"
    class="grid -mx-4 overflow-x-scroll grid-flow-col basic__slader scroll-smooth
    xl:-mx-3 sm:-mx-2 mb-4"
    :class="[containerClass]"
    @scroll="logItem">
        <template v-for="(elem, index) in data" :key="index">
            <slot name="item" v-bind="{
                elem,
                prevItem,
                nextItem
            }"
            ></slot>
        </template>
    </div>
    <div>
        <slot name="bottom" v-bind="{
            prevItem, nextItem, indexActiveButton, updateScrolLeftSlader
        }"
        >
        <div>
            <ul class="flex justify-center pt-2">
                <li v-for="(item, index) in data.length" :key="item"
                class="h-4 aspect-square rounded-full mx-2"
                :class="[ indexActiveButton === index ? 'bg-blue-500' : 'bg-blue-100 ']"
                @click="updateScrolLeftSlader(index)"></li>
            </ul>
        </div>
        </slot>
    </div>
    </div>
</div>
</template>
<script setup lang="ts">
interface Props {
    data: [] | null,
    containerClass: string,
    defaultTitle?: string,
}
withDefaults(defineProps<Props>(), {
    data: () => null,
    checkElem: true,
    containerClass: '[grid-auto-columns:calc(100%)]'
})

const slader = ref<HTMLElement | null>(null)
const indexActiveButton = ref<number>(0)

function prevItem() {
    slader.value?.scrollBy({ left: -slader.value?.clientWidth })    
}
function nextItem() {
    slader.value?.scrollBy({ left: slader.value?.clientWidth })
}

function updateScrolLeftSlader(index: number) {
    if (slader.value) {
        slader.value.scrollLeft = slader.value.clientWidth * index
    }
}

function logItem() {
    if (slader.value) {
        indexActiveButton.value = Math.round(+(slader.value.scrollLeft / slader.value?.clientWidth).toFixed(1))
    }
}
</script>

<style lang="css">
.basic__slader{
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none;
}
.basic__slader::-webkit-scrollbar{
    display: none;
}
</style>