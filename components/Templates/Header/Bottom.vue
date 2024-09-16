<template>
    <div class="">
        <UITMask :active="state" :fun="update">
            <Transition name="categor">
                <Menu
                v-show="state"
                :active-menu="state"
                :style="{ top: positionMenu.top, left: positionMenu.left }"
                @mouseleave="onMouseleave"/>
            </Transition>
        </UITMask>
        
        <div class="container mx-auto">
            <UITBlockFlex class="h-14 bg-gray-100 relative ">
            <div ref="menubutton" class="h-full flex">
                <UITButton
                :text="t('BASE_BUTTON.CATALOG')"
                :tag="'nuxt-link'"
                to="/catalog"
                class="px-5"
                :height="'h-14'"
                :icon-left="{ icon: 'menu', size: '20_20', type: 'monocolor' }"
                mode="blue"
                @mouseenter.stop="onMouseenter"/>
            </div>
            <div class="overflow-hidden h-14 pr-4">
                <UITBlockFlex ref="list" :tag="'ul'" :class="[$style['list-link']]">
                    <li v-for="item in CATEGOR_DATA" :key="item.id" class="px-4 py-3">
                        <UITButton
                        :tag="'nuxt-link'"
                        class="whitespace-nowrap"
                        :text="item.value"
                        :mode="'none'"
                        :to="getBaseCategorRoute(item.id, $route)"/>
                    </li>
                </UITBlockFlex>
                <UITBlockFlex :justify="'center'" :class="$style['button-more']">
                    <UITButton
                    :icon-left="{ 'icon': 'arrow-bold', size: '30_24' }"
                    :mode="'gray-icon'"
                    :class="{ [$style['active']]: !active }"
                    @click="listOffset"/>
                </UITBlockFlex>
            </div>
        </UITBlockFlex>
        </div>
    </div>
</template>
<script setup lang="ts">
import { UITBlockFlex, UITButton, UITMask } from "#components";
import { t } from "#imports";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Button from "components/UI/Button/index.vue";
import { localState } from "@/UI/utils/other/localState";
// import Mask from "@/components/UI/Mask/Mask.vue";
import Menu from './Menu/Menu.vue'
import type { CategorDataItem } from "@/type/intex";
import { getBaseCategorRoute } from '@/utils/headerHelper'

const { state, update } = localState()
// ссылать через свойства el
const list = ref<InstanceType<typeof UITBlockFlex> | null | null>(null)
const active = ref(true)
const menubutton = ref<HTMLButtonElement | null>(null)
const positionMenu = reactive({ top: '0px', left: '0px' })
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")


function onMouseenter(): void {
    if (menubutton.value ) {
        const rect = menubutton.value.getBoundingClientRect()
        positionMenu.left = transformPx(toFixed(rect.left))
        positionMenu.top = transformPx(toFixed(rect.top))
        update(true)
    }
}

function onMouseleave(): void {
    if (menubutton.value) {
        // update(false)
    }
}


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
    width: 2rem;
    background-image: linear-gradient(to left, var(--white), var(--gray-100), transparent);
}
.button-more > * {
    --stroke-hover: var(--yellow-300);
    --stroke-active: var(--yellow-500);
    /* --bg-color: transparent; */
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