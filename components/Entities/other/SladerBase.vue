<template>
    <div class="w-full">
        <div>
            <div>
                <slot name="header" v-bind="{ prevItem, nextItem }"></slot>
            </div>
            <div ref="slader" class="basic__slader slader__container" :class="[containerClass]" @scroll="logItem">
                <template v-for="(elem, index) in sladerData" :key="index">
                    <div class="slader__item ">
                        <slot name="item" v-bind="{
                            elem,
                            prevItem,
                            nextItem
                        }"></slot>
                    </div>
                </template>
            </div>
            <div>
                <slot name="bottom" v-bind="{
                    prevItem, nextItem, indexActiveButton, updateScrolLeftSlader
                }">
                </slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
    data: object[] | null,
    containerClass?: string
}
const props = withDefaults(defineProps<Props>(), {
    containerClass: '[grid-auto-columns:calc(100%)]'
})

const slader = ref<HTMLElement | null>(null)
const indexActiveButton = ref<number>(0)
const sladerData = computed(() => props.data ? props.data : [...Array(8)])

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
.basic__slader {
    display: grid;
    grid-auto-flow: column;
    overflow-x: scroll;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none;
    scroll-behavior: smooth;
}

.basic__slader::-webkit-scrollbar {
    display: none;
}
</style>
