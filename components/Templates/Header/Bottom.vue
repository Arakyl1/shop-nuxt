<template>
    <div class="">
        <Mask :active="state" :fun="update">
            <Transition name="categor">
                <Menu v-show="state"
                :activeMenu="state"
                :style="{ top: positionMenu.top, left: positionMenu.left }"
                @mouseleave="onMouseleave"/>
            </Transition>
        </Mask>
        
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
import Mask from "@/components/UI/Mask/Mask.vue";
import Menu from './Menu.vue'
import { CategorDataItem } from "@/type/intex";

const { state, update } = localState()
// ссылать через свойства el
const list = ref<InstanceType<typeof Flex> | null | null>(null)
const active = ref(true)
const menubutton = ref<HTMLButtonElement | null>(null)
const className = useCssModule()
const positionMenu = reactive({ top: '0px', left: '0px' })
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")


function onMouseenter(): void {
    if (menubutton.value ) {
        let rect = menubutton.value.getBoundingClientRect()
        positionMenu.left = transformPx(toFixed(rect.left))
        positionMenu.top = transformPx(toFixed(rect.top))
        update(true)
    }
}


function onMouseleave(): void {
    if (menubutton.value) {
        update(false)
    }
}

// watch(() => state.value, (newV) => {
//     if (!newV) {
//         onMouseleave()
//     }
// })

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

.categor-leave-active,
.categor-enter-active {
    transition: opacity 0.25s ease-in-out 0.1, transform 0.35s ease-in-out;
}

/* .categor-enter-active {
    transition-delay: 0.35s;
} */

.categor-enter-from,
.categor-leave-to {
    opacity: 0;
    transform-origin: top right;
    transform: scaleY(0);
}


/* .menu-modaile-enter-active,
.menu-modaile-leave-active {
    transition: opacity 1s ease;
}

.menu-modaile-enter-from,
.menu-modaile-leave-to {
    transform-origin: left;
    transform: scaleX(0);
} */




</style>