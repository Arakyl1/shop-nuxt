<template>
    <div v-if="CATEGOR_DATA" :class="$style.body" class="rounded-lg bg-blue-500">
        <UITBlockFlex>
            <UITBlockGroup :class="$style.list">
                <UITButton
                :text="t('BASE_BUTTON.CATALOG')" :tag="'nuxt-link'" to="/catalog?categor=1" mode="blue"
                class="px-5 grow" :height="'h-14'" :icon-left="{ icon: 'menu', size: '20_20', type: 'monocolor' }"
                :class="$style['button-menu']" />

                <UITBlockScroll
                class="grow" :style="{ '--scrollbar-color': 'var(--gray-100)' }"
                    @mouseout.stop="onMouseout">
                    <template #container>
                        <UITBlockGroup tag="ul" :class="$style['list-categor']">
                            <li
                            v-for="item in CATEGOR_DATA" :key="item.id" class="w-full h-12"
                            :data-categor-id="item.id">
                                <UITButton
                                :text="item.value"
                                :tag="'nuxt-link'"
                                :height="'h-12'"
                                :mode="'Wh-lint'"
                                :rounded="'none'"
                                :to="getBaseCategorRoute(item.id, $route)"
                                :class="$style['button-categor']"
                                class="w-full justify-between my-2.5"
                                :icon-right="{ icon: 'Arrow-Primary-Right', size: '20_20' }" />
                            </li>
                        </UITBlockGroup>
                    </template>
                </UITBlockScroll>


            </UITBlockGroup>
            <Transition name="slide-right">
                <UITBlockGroup v-if="groupSubcategory" :align="'start'" :class="$style['subcategory-list']">
                    <div :class="$style.header" />
                    <UITBlockScroll class="h-full w-full px-3" :style="{ '--scrollbar-color': 'var(--gray-100)' }">
                    <UITBlockGrid :container="'sm'">
                        <UITBlockGroup
                        v-for="(group, i) in groupSubcategory"
                        :key="i"
                        tag="ul"
                        class="grow w-1/2 gap-3 py-3 gap-2">
                            <li v-for="item in group" :key="item.id" class="w-full">
                                <UITFormAccordion :animated="'none'" class="w-full">
                                    <template #trigger="{ isActive, close, onClick }">

                                        <UITBlockFlex class="gap-2" :align="'start'" :class="{ 'pl-8': !checkHasChildren(item) }">
                                            <UITButton
                                            v-if="checkHasChildren(item)"
                                            :square="true"
                                            :mode="'black'"
                                            :height="'h-6'"
                                            :icon-left="{ 'icon': 'add-plus', size: '20_20' }"
                                            class="justify-center translate-y-1"
                                            @click.stop="() => isActive ? close() : onClick()" />
                                            <UITButton
                                            :text="item.value"
                                            :tag="'nuxt-link'"
                                            :mode="'link-white'"
                                            class="w-full"
                                            :style="{ '--color-hover': 'var(--gray-200)' }"
                                            :to="getBaseCategorRoute(item.id, $route)" :class="$style.link" />
                                        </UITBlockFlex>
                                    </template>
                                    <template #default>  
                                        <UITBlockGroup v-if="checkHasChildren(item)" class="gap-3 pt-2 w-1/2 pl-8" > 
                                            <UITButton
                                            v-for="elem in item.children" :key="elem.id"
                                            :text="elem.value" :tag="'nuxt-link'"
                                            :mode="'link-white'"
                                            :style="{ '--color-hover': 'var(--gray-200)' }"
                                            :to="getBaseCategorRoute(elem.id, $route)" class="pre-wrap text-sm" :class="$style.link" />
                                        </UITBlockGroup>
                                    </template>
                                </UITFormAccordion>
                            </li>
                        </UITBlockGroup>
                    </UITBlockGrid>
                </UITBlockScroll>
                </UITBlockGroup>
            </Transition>
        </UITBlockFlex>
    </div>
</template>

<script setup lang="ts">
import { UITBlockFlex, UITBlockScroll, UITBlockGrid, UITBlockGroup, UITButton, UITFormAccordion } from "#components";
import { t } from "#imports";
import type { CategorDataItem } from '@/type/intex';
import { getBaseCategorRoute } from '@/utils/headerHelper'


const props = defineProps<{ activeMenu: boolean }>()

const activeCategor = ref<number | null>(null)
const route = useRoute()
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")

const groupSubcategory = computed(() => {
    if (activeCategor.value && CATEGOR_DATA.value) {
        const findRes = CATEGOR_DATA.value.find(_ => _.id === activeCategor.value)!.children
        if (!findRes) return null

        const lengthGroup = findRes.length / 2
        const numInteger = Number.isInteger(lengthGroup)
        const mudI = numInteger ? lengthGroup : Math.floor(lengthGroup)
        return [findRes.slice(0, mudI), findRes.slice(mudI)]
    }
})

watch(() => props.activeMenu, (newV) => newV ? resetData() : null)


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

function resetData() {
    activeCategor.value = null
}

function checkHasChildren(item: CategorDataItem) {
    return 'children' in item && Array.isArray(item.children) && item.children.length
}


</script>

<style lang="css" module>
/* purgecss ignore */
.body {
    position: fixed;
    --height-body: 75vh;
}

.list {
    width: min-content;
    max-height: var(--height-body);
}

.subcategory-list {
    height: var(--height-body);
    width: 550px;
}

.list-categor {
    padding-left: 0.75rem;
    padding-right: 0.25rem;
}

.button-menu {
    min-height: 3.5rem;
    --bg-color-hover: var(--blue-500);
}

.header {
    min-height: 3.5rem;
}

.button-categor {
    border-top:  1px solid var(--blue-100);
    --color-hover: var(--white);
}

.button-categor:hover{
    border-top:  1px solid var(--blue-100) !important;
}

.link,
.link > p {
    white-space: wrap !important;
}
</style>

<style lang="css">
.menu-mobile-enter-active,
.menu-mobile-leave-active {
    transition: opacity 1s ease;
}

.menu-mobile-enter-from,
.menu-mobile-leave-to {
    transform-origin: left;
    transform: scaleX(0);
}
</style>