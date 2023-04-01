<template>
    <div></div>
    <section>
        <TemplatesPageCatalogHeader />
        <div class="flex -mx-4 md:relative mb-8 min-h-[90vh] sm:-mx-2">
            <div class=" fixed top-1/2 left-0 z-20 transition-all hidden md:block"
                :class="[stage ? 'opacity-0' : ' opacity-100']">
                <AtomButtonStandart class="bg-blue-500 aspect-square
                sm:px-2 sm:py-1" @click="updateStage($event, true)">
                    <IconFilter class="group is-icon-white h-6"/>
                </AtomButtonStandart>
            </div>
            <div ref="filter" class="w-1/4 px-4 lg:w-1/3 transition-all
            md:fixed md:top-0 md:-left-full md:w-[360px] md:z-40
            sm:w-full sm:p-0 sm:overflow-y-scroll sm:h-screen"
                :class="[stage ? 'md:-left-4 sm:left-0' : 'md:-left-full']">
                <div class="bg-gray-100 px-4 py-8 xl:px-3 xl:py-6 rounded-md">
                    <TemplatesPageCatalogFilter @option-seacrh="(e) => getIdProduct(e)"/>
                </div>
            </div>
            <TemplatesPageCatalogGalletyItems :list-id-product="listIdProduct" :loader="loader" />
        </div>
            <div class="flex mb-20">
                <div class="w-1/4 md:hidden"></div>
                <div class="w-3/4 flex justify-center md:w-full">
                    <AtomButtonStandart @click="prevPage(route)" :disabled="route.query.page ? (+route.query.page === 1) : false"
                        class="-scale-x-100 mr-32" />
                    <AtomButtonStandart @click="nextPage(route)" :disabled="activeButtomNext === 0" />
                </div>
            </div>
        </section>
</template>

<script setup lang="ts">
import ShowContent from "@/utils/ShowContent"
import { prevPage, nextPage } from "~~/components/Atom/catalog/funControlPage";;
import { _ProductCardBase, productCardBaseParamsSelect } from "~~/type/intex";

definePageMeta({
    middleware: ['catalog'],
    title: 'Каталог товаров',
    keepalive: true
})

const filter = ref<HTMLElement | null>(null)
const toucheData = toucheElemPosition(filter)
const { stage, updateStage } = ShowContent()
const route = useRoute()
const listIdProduct = ref<_ProductCardBase[]>([])
const loader = ref<boolean>(true)
const activeButtomNext = ref<number>(0)
const { getInfo: getInfoProduct } = useProduct()
const { isMobile } = useDevice()


watch(() => toucheData.vector, (newVector) => {
    if (newVector === 3) {
        updateStage()
    }
})

async function getIdProduct(optionSeacrh: object = {}) {
    if (isMobile) {
        updateStage(event, false)
    }
    loader.value = true
    const page = route.query.page ? +route.query.page : 1
    const limit = route.query.limit ? +route.query.limit : 12

    const res = await getInfoProduct<_ProductCardBase[]>({
        skip: ((page - 1) * limit),
        take: limit,
        where: optionSeacrh,
        ...productCardBaseParamsSelect
    }, 'many=true')

    listIdProduct.value = res ? res : []

    const dataOfNextPage = await getInfoProduct<_ProductCardBase[]>({
        skip: (page * limit),
        take: limit,
        where: optionSeacrh,
        select: { id: true }
    }, 'many=true') || []

    activeButtomNext.value = dataOfNextPage ? dataOfNextPage.length : 0
    loader.value = false
}
</script>