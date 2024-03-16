<template>
    <div :class="className['body']"  v-if="CATEGOR_DATA">
        <Flex>
            <Group :class="className['list']" >
                <Button
                :text="BASE_BUTTON.CATALOG"
                :tag="'nuxt-link'"
                to="/catalog?categor=1"
                class="px-5 h-14 grow"
                :iconLeft="{ icon: 'menu', size: '20_20' }"
                appearance="blue"
                :class="className['button-menu']"/>
               
                <Group  tag="ul"
                :class="className['list-categor']"
                class="w-full grow scrollbar-v1"
                @mouseout.stop="onMouseout">
                    <li v-for="item in CATEGOR_DATA" :key="item.id" class="w-full"
                    :data-categor-id="item.id">
                        <Button
                        :text="item.value"
                        :tag="'nuxt-link'"
                        :rounded="'none'"
                        :to="getBaseCategorRoute(item.id, $route)"
                        class="w-full h-12 justify-between text-base"
                        :class="className['button-categor']"
                        :iconRight="{ icon: 'arrow-bold', size: '16_12' }"/>
                    </li>
                </Group>
            </Group>
            <Transition name="slide-right">
                <Group v-if="groupSubcategory" :align="'flex-start'" :class="className['subcategory-list']">
                    <div :class="className['header']"></div>
                    <Flex :align="'flex-start'"  class="w-full h-full scrollbar-v1 px-3">
                        <Group tag="ul" class="grow w-1/2 gap-3 py-3" v-for="group in groupSubcategory">
                            <li v-for="item in group"
                                :key="item.id" class="w-full">
                                <Accordion :animated="'none'" class="w-full">
                                    <template #trigger="{ isActive, close, onClick }">
                                        <Flex class="gap-2" >
                                            <Button
                                            :appearance="'white-icon'"
                                            :icon-left="{ 'icon': 'add-plus', size: '16_16' }"
                                            @click.stop="() => isActive ? close() : onClick()"/>
                                            <Button
                                            :text="item.value"
                                            :tag="'nuxt-link'"
                                            :rounded="'none'"
                                            :to="getBaseCategorRoute(item.id, $route)"
                                            class="text-base"
                                            :class="className['link']"/>
                                        </Flex>
                                    </template>
                                    <template #default>
                                        <Flex v-if="'children' in item && Array.isArray(item.children) && item.children.length" class="grow">
                                            <div class="w-6"></div>
                                            <Group class="w-full gap-1 w-1/2">
                                                <li v-for="elem in item.children" :key="elem.id" >
                                                    <Button
                                                    :text="elem.value"
                                                    :tag="'nuxt-link'"
                                                    :rounded="'none'"
                                                    :to="getBaseCategorRoute(elem.id, $route)"
                                                    class="pre-wrap"
                                                    :class="className['link']"/>
                                                </li>
                                            </Group>
                                        </Flex>
                                    </template>
                                </Accordion>
                            </li> 
                        </Group>
                    </Flex>
                </Group>
            </Transition>
        </Flex>
    </div>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Accordion from "@/components/UI/Accordion/Accordion.vue";
import { CategorDataItem } from '@/type/intex';
import { BASE_BUTTON } from '@/common/C'
import { getBaseCategorRoute } from '@/utils/headerHelper'


const props = defineProps<{ activeMenu: boolean }>()

const activeCategor = ref<number | null>(null)
const route = useRoute()
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")
const className = useCssModule()

const groupSubcategory = computed(() => {
    if (activeCategor.value && CATEGOR_DATA.value) {
        const findRes = CATEGOR_DATA.value.find(_ => _.id === activeCategor.value)!.children
        if (!findRes) return null
        
        const lengthGroup = findRes.length / 2
        const numInteger = Number.isInteger(lengthGroup)
        const mudI = numInteger ? lengthGroup - 1 : Math.floor(lengthGroup)
        return [findRes.slice(0, mudI),findRes.slice(mudI)]
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


</script>

<style lang="css" module>
.body {
    position: fixed;
    background-color: var(--blue-500);
    border-radius: var(--rounded-lg);
    --height-body: 75vh;
}

.list {
    width: 200px;
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
    --bg-color--hover: var(--blue-500);
}
.header {
    min-height: 3.5rem;
}
.button-categor {
    border-top: 1px solid var(--blue-100);
}

.link > p {
    white-space: wrap;
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