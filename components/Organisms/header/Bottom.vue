<template>
    <div class="">
        <AtomModalMask :state="state" :clickFun="update" class="" :class="[state ? 'delay-[0]' : 'delay-200 ']">
            <Transition name="menu-modaile">
                <div class="relative rounded-md w-min h-min max-h-[90vh] hidden flex flex-col" ref="menumodal"
                    @click.stop v-show="state" @mouseleave.stop="onMouseleave">

                    <div class="h-14 lg:h-12 flex bg-blue-500">

                        <AtomButtonStandart @mouseenter.stop="onMouseenter"
                            class="text-white flex items-center h-full after:content-none py-4">
                            <CreateIcon :name="'menu_20_20'" class="group is-icon-white mr-3"
                                :att="{ class: 'fill-white', 'stroke-linecap': 'round' }" />
                            <NuxtLink to="/catalog">
                                Каталог
                            </NuxtLink>
                        </AtomButtonStandart>
                    </div>

                    <Transition name="categor">
                        <div class="flex origin-top-left bg-blue-500 grow hidden" v-show="state"
                            ref="contentmodal">
                            <div class="overflow-y-scroll overflow-x-hidden min-w-min scrollbar-v1">
                                <MoleculesListSidebar class="pl-4 pr-1.5 w-max" :data="CATEGOR_DATA"
                                    @mouseout.stop="onMouseout" />
                            </div>
                            <div :style="{ maxHeight: heightModal + 'px' }" v-if="groupSubcategor" class="grow">
                                <div
                                    class="h-full border-l border-blue-100 py-4 pl-4 pr-1.5 overflow-y-scroll overflow-x-hidden scrollbar-v1">
                                    <div class="flex flex-row">
                                        <ul class="w-1/2 flex flex-col min-w-[240px]">
                                            <li class="mb-5 cursor-pointer w-full" v-for="item in groupSubcategor[0]"
                                                :key="item.name">
                                                <MoleculesListAditionalItem :data="item" />
                                            </li>
                                        </ul>
                                        <ul class="w-1/2 flex flex-col min-w-[240px]">
                                            <li class="mb-5 cursor-pointer w-full" v-for="item in groupSubcategor[1]"
                                                :key="item.name">
                                                <MoleculesListAditionalItem :data="item"/>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>

                </div>
            </Transition>
        </AtomModalMask>
        <div class="h-14 w-full bg-gray-100 relative lg:h-12 flex flex-nowrap">
            <div class="h-full flex transition-all" ref="menubutton">
                <AtomButtonStandart @mouseenter.stop="onMouseenter"
                    class="min-w-min text-white flex items-center bg-blue-500 ">
                    <CreateIcon :name="'menu_20_20'" class="group is-icon-white mr-3"
                        :att="{ class: 'fill-white', 'stroke-linecap': 'round' }" />
                    <NuxtLink to="/catalog">
                        Каталог
                    </NuxtLink>
                </AtomButtonStandart>
            </div>
            <div class="hidden">
                <ul class="flex flex-nowrap overflow-x-scroll scroll-smooth header__aditional" ref="list">
                    <li v-for="item in CATEGOR_DATA" :key="item.id" class="p-4 lg:p-3">
                        <NuxtLink
                            :to="{ path: '/catalog', query: { categor: item.id, limit: $route.query.limit || 12, page: 1 } }"
                            class="whitespace-nowrap">
                            {{ item.value }}
                        </NuxtLink>
                    </li>
                </ul>
                <div class="w-7 h-full absolute top-0 right-0 flex items-center justify-center  bg-gradient-to-l from-white to-gray-100"
                    @click="listOffset">
                    <CreateIcon name="arround_6_11" :att="{ class: 'fill-gray-500' }" class="mr-1 transition-all"
                        :class="{ 'rotate-180': !active }" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import localState from "@/utils/localState";
import CreateIcon from "@/content/icons/create";
import { CategorDataItem } from "~~/type/intex";

const { state, update } = localState()
const list = ref<HTMLElement | null>(null)
const active = ref(true)
const menubutton = ref<HTMLButtonElement | null>(null)
const menumodal = ref<HTMLElement | null>(null)
const contentmodal = ref<HTMLElement | null>(null)
const heightModal = ref<number | null>()
const activeCategor = ref<number | null>(null)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")


const groupSubcategor = computed(() => {
    if (activeCategor.value && CATEGOR_DATA.value) {
        const findRes = JSON.parse(JSON.stringify(CATEGOR_DATA.value.find(_ => _.id === activeCategor.value)!.children))
        const lengthGroup = findRes.length / 2
        const numInteger = Number.isInteger(lengthGroup)
        return [
            findRes.filter((_: any, i: number) => i >= 0 && i <= (numInteger ? lengthGroup - 1 : Math.floor(lengthGroup))),
            findRes.filter((_: any, i: number) => i > (numInteger ? lengthGroup - 1 : Math.floor(lengthGroup)))
        ]
    }
})


function onMouseenter(): void {
    if (menubutton.value && menumodal.value) {
        let rect = menubutton.value.getBoundingClientRect()
        menumodal.value.style.top = rect.y + 'px'
        menumodal.value.style.left = rect.x + 'px'
        let wModal = menumodal.value.clientWidth
        menubutton.value.style.minWidth = wModal + 'px'
        update(true)
        nextTick(() => {
            if (contentmodal.value) {
                heightModal.value = contentmodal.value.clientHeight
            }
        })
    }
}

function onMouseout({ target, type }: MouseEvent) {
    if (type === 'mouseout') {
        const elem = target as HTMLElement
        const elemCategor = elem.closest('[data-categor-id]')
        if (elemCategor) {
            const categorId = (elemCategor as HTMLElement).dataset.categorId
            if (categorId) {
                activeCategor.value = parseInt(categorId)
            }
        }
    }
}

function onMouseleave(): void {
    if (menubutton.value && menumodal.value) {
        update(false)
        let firstElem = menubutton.value.firstElementChild
        if (firstElem) {
            menubutton.value.style.minWidth = firstElem.clientWidth + 'px'
        }
    }
    heightModal.value = null
    activeCategor.value = null
}

watch(() => state.value, (newV) => {
    if (!newV) {
        onMouseleave()
    }
})

function listOffset(): void {
    if (!list.value) return
    active.value = !active.value
    const width = list.value.scrollWidth
    list.value?.scrollBy(active.value ? { left: -width } : { left: width })
}

</script>

<style lang="css">
/* .categor-leave-active,
.categor-enter-active {
    transform-origin: top;
    transition: all 2s ease-in-out;
}
.categor-leave-active{
    transition-delay: 2000ms;
}

.categor-enter-from,
.categor-leave-to {
    
    opacity: 0;
    transform: scaleY(0);
} */

/* .categor-enter-active {
  animation: scale 0.5s;
  animation-delay: 1s;
}
.categor-leave-active {
  animation: scale0.5s reverse;
}
@keyframes scale {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
} */

.categor-enter-active,
.categor-leave-active {
    transition: opacity 0.2s ease;
}

.categor-enter-active {
    transition-delay: 0.2s;
}

.categor-enter-from,
.categor-leave-to {
    opacity: 0;
    /* border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; */
    transform-origin: top;
    transform: scaleY(0);
}

/* .categor-enter-to,
.categor-leave-from {
    opacity: 1;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transform: scaleY(1);
} */

.menu-modaile-enter-active,
.menu-modaile-leave-active {
    transition: opacity 1s ease;
}

/* .menu-modaile-leave-active{
    transition-delay: 0.3s;
} */

.menu-modaile-enter-from,
.menu-modaile-leave-to {
    transform-origin: left;
    transform: scaleX(0);
}


.header__aditional {
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none
}

.header__aditional::-webkit-scrollbar {
    display: none;
}

</style>