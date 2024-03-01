<template>
    <div class="">
        <Mask :active="state" :fun="update">

        </Mask>
        <!-- <AtomModalMask :state="state" :clickFun="update" class="" :class="[state ? 'delay-[0]' : 'delay-200 ']">
            <Transition name="menu-modaile">
                <div class="relative rounded-md w-min h-min max-h-[90vh] overflow-hidden flex flex-col" ref="menumodal"
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
                        <div class="flex origin-top-left bg-blue-500 grow overflow-hidden" v-show="state"
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
        </AtomModalMask> -->
        <div class="container">
            <Flex class="h-14 w-full bg-gray-100 relative ">
            <div class="h-full flex" ref="menubutton">
                <Button
                text="Каталог"
                :tag="'nuxt-link'"
                to="/catalog"
                class="px-5"
                :iconLeft="{ key: 'menu', size: '20_20' }"
                appearance="blue"
                @mouseenter.stop="onMouseenter"/>
            </div>
            <div class="hidden h-14">
                <Flex :tag="'ul'" :class="className['list-link']" ref="list">
                    <li v-for="item in CATEGOR_DATA" :key="item.id" class="p-4">
                        <Button :tag="'nuxt-link'"
                        class="whitespace-nowrap"
                        :text="item.value"
                        :mode="'none'"
                        :to="{ path: '/catalog', query: { categor: item.id, limit: $route.query.limit || 12, page: 1 } }"/>
                    </li>
                </Flex>
                <Flex :justify="'center'" :class="className['button-more']">
                    <Button
                    :iconLeft="{ key: 'arrow-bold', size: '6_11' }"
                    :appearance="'gray-icon'"
                    :class="{ [className['active']]: !active }"
                    @click="listOffset"/>
                </Flex>
            </div>
        </Flex>
        </div>
    </div>
</template>
<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import localState from "@/utils/localState";
import { CategorDataItem } from "~~/type/intex";
import Mask from "@/components/UI/Mask/Mask.vue";

const { state, update } = localState()
// ссылать через свойства el
const list = ref<InstanceType<typeof Flex> | null | null>(null)
const active = ref(true)
const menubutton = ref<HTMLButtonElement | null>(null)
const menumodal = ref<HTMLElement | null>(null)
const contentmodal = ref<HTMLElement | null>(null)
const heightModal = ref<number | null>()
const className = useCssModule()
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
    if (menubutton.value ) {
        let rect = menubutton.value.getBoundingClientRect()
        // menumodal.value.style.top = rect.y + 'px' && menumodal.value
        // menumodal.value.style.left = rect.x + 'px'
        // let wModal = menumodal.value.clientWidth
        // menubutton.value.style.minWidth = wModal + 'px'
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
    if (list.value && list.value.flex) {
        active.value = !active.value
        const width = list.value.flex.scrollWidth
        list.value.flex.scrollBy(active.value ? { left: -width } : { left: width })
    }
}


</script>

<style lang="css" module>
.list-link {
    height: 100%;
    overflow-x: scroll;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none
}
.list-link::-webkit-scrollbar {
    display: none;
}
.button-more {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 1.75rem;
    background-image: linear-gradient(to left, var(--white), var(--gray-100));
}
.button-more > * {
    --fill-hover: var(--yellow-300);
    --fill-active: var(--yellow-500);
}
.button-more > .active {
    transform: rotate(-180deg);
}

</style> 

<style lang="css">

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
  
    transform-origin: top;
    transform: scaleY(0);
}


.menu-modaile-enter-active,
.menu-modaile-leave-active {
    transition: opacity 1s ease;
}

.menu-modaile-enter-from,
.menu-modaile-leave-to {
    transform-origin: left;
    transform: scaleX(0);
}




</style>