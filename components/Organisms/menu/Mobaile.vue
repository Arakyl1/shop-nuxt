<template>
    <div class="fixed w-screen h-screen top-0 z-50 transition-all right-0" >
        <div class="bg-blue-500 h-full flex flex-col" ref="modalmain">
            <div class="px-4 pt-4" >
                <img src="@/assets/img/logo.png" alt="logo" class="w-32 mb-4">
            </div>
            <div class="grow overflow-y-scroll overflow-x-hidden scrollbar-v1 px-4 pb-8">
                <Transition name="slide-up" mode="out-in">
                    <template v-if="CATEGOR_DATA && !subcategorData">
                        
                            <ul class="flex flex-col">
                                <li v-for="item in CATEGOR_DATA" :key="item.id" class=" py-3 border-b border-blue-100"
                                @click="categorId = item.id">
                                    <div class="flex items-center justify-between">
                                        <NuxtLink
                                            :to="{ path: '/catalog', query: { categor: item.id, page: 1, limit: route.query.limit || 12 } }"
                                            class="text-white cursor-pointer"
                                            @click.stop
                                            > {{ item.value }}</NuxtLink>
                                        <div class="ml-5 cursor-pointer grow flex justify-end">
                                            <CreateIcon name="arround_6_11" :att="{ class: 'fill-white' }" />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                    </template>

                    <template v-else-if="subcategorData && subcategorData.children.length">
                        <div >
                            <ul class="flex flex-col">
                                <li class="py-2" v-for="section in subcategorData.children" :key="section.id">
                                    <MoleculesListAditionalItem  :data="section"/>
                                </li>
                            </ul>
                        </div>
                    </template>
                </Transition>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import type { _AsyncData } from 'nuxt/dist/app/composables/asyncData';
import CreateIcon from "@/content/icons/create";
import { CategorDataItem } from '~~/type/intex';

interface ToucheData {
    x: number | null,
    y: number | null,
    vector: number | null,
    started: boolean,
}

const props = defineProps<{
    updateFun: (...arg: any) => any
}>()


const route = useRoute()
const modalmain = ref<HTMLElement | null>(null)
const toucheDataModal: ToucheData = toucheElemPosition(modalmain)
const categorId = ref<number>(0)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")

const subcategorData = computed(() => categorId.value !== 0 && CATEGOR_DATA.value ? CATEGOR_DATA.value.find(_ => _.id === categorId.value) : null)

watch(() => toucheDataModal.vector, (newVector) => {
    if (newVector === 1) {
        if (categorId.value !== 0) {
            categorId.value = 0
        } else {
            props.updateFun(false)
            categorId.value = 0
        }
    }
})

</script>