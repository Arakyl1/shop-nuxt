<template>
    <div :class="className['body']" >
        <div class="bg-blue-500 h-full py-12 px-4" ref="menu">
            <Group class="w-full gap-4">
                <Button
                :tag="'nuxt-link'"
                :to="'/'"
                :height="'h-0'">
                    <img src="@/assets/img/logo.png" class="h-9.5"
                    :alt="`Logo market place ${config.public.NAME_APP}`">
                </Button>
                <div class="scrollbar-v1 ver w-full">
                    <Transition name="slide-up" mode="out-in" >
                        <Group tag="ul" class="w-full gap-4" v-if="subcategoryData">
                            <li v-for="item in subcategoryData"
                                :key="item.id" class="w-full">

                                <Accordion :animated="'none'" class="w-full">
                                    <template #trigger="{ isActive, close, onClick }">
                                        <Flex class="gap-2" >
                                            <Button
                                            class="p-1"
                                            :square="true"
                                            :appearance="'yellow'"
                                            :height="'h-6'"
                                            :icon-left="{ icon: 'add-plus', size: '16_16' }"
                                            @click.stop="() => isActive ? close() : onClick()"/>
                                            <Button
                                            :text="item.value"
                                            :tag="'nuxt-link'"
                                            :to="getBaseCategorRoute(item.id, $route)"
                                            :class="className['link']"/>
                                        </Flex>
                                    </template>
                                    <template #default>
                                        <Flex v-if="'children' in item && Array.isArray(item.children) && item.children.length"
                                        class="grow py-3">
                                            <div class="w-8"></div>
                                            <Group class="w-full gap-2 w-1/2">
                                                <li v-for="elem in item.children" :key="elem.id" >
                                                    <Button
                                                    :text="elem.value"
                                                    :tag="'nuxt-link'"
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

                        <Group tag="ul" v-else
                        :class="className['list-categor']"
                        class="w-full ">
                            <li v-for="item in CATEGOR_DATA" :key="item.id" class="w-full"
                            :data-categor-id="item.id">
                                <Button
                                :text="item.value"
                                :tag="checkAvailabilityChildren(item) ? 'button' : 'nuxt-link'"
                                :rounded="'none'"
                                :mode="'empty'"
                                :iconRight="{ 'icon': 'arrow-bold', size: '16_12' }"
                                @click="() => setActiveCategor(item.id)"
                                v-bind="checkAvailabilityChildren(item) ? {} : getBaseCategorRoute(item.id, $route)"
                                :class="className['button-categor']"
                                class="w-full justify-between"/>
                                <div class="decor-line"></div>
                            </li>
                        </Group>
                    </Transition>
                </div>
            </Group>
        </div>
    </div>
</template>
<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Accordion from "@/components/UI/Accordion/Accordion.vue";
import { CategorDataItem } from '~~/type/intex';
import { getBaseCategorRoute } from '@/utils/headerHelper'

interface ToucheData {
    x: number | null,
    y: number | null,
    vector: number | null,
    started: boolean,
}

const props = defineProps<{
    closeFun: (...arg: any[]) => any
}>()


const route = useRoute()
const menu = ref<HTMLElement | null>(null)
const toucheDataModal: ToucheData = toucheElemPosition(menu)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")
const className = useCssModule()
const config = useRuntimeConfig()
const categorId = ref<number>(0)

const subcategoryData = computed(() => categorId.value !== 0 && CATEGOR_DATA.value ? CATEGOR_DATA.value.find(_ => _.id === categorId.value)?.children || null : null)

watch(() => toucheDataModal.vector, (newVector) => {
    if (newVector === 1) {
        if (categorId.value !== 0) {
            setActiveCategor(0)
        } else {
            props.closeFun(false)
            setActiveCategor(0)
        }
    }
})

function checkAvailabilityChildren(item: { children: string | any[]; }) {
    return 'children' in item && Array.isArray(item.children) && item.children?.length
}

function setActiveCategor(id: typeof categorId.value) {
    categorId.value = id
}

</script>

<style lang="css" module>
/* purgecss ignore */
.body {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    z-index: 50;
}

.link > p {
    white-space: wrap;
}
</style>