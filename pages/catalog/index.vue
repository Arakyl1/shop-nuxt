<template>
    <section>
        <!-- <ClientOnly>
            <CatalogSelectingNumberDisplayedItems/>
        </ClientOnly>
        <div class="flex -mx-4 md:relative mb-8 min-h-[90vh] sm:-mx-2">
            <div class=" fixed top-1/2 left-0 z-20 transition-all hidden md:block"
            :class="[ stage ? 'opacity-0' : ' opacity-100']">
                <ButtomStandart class="bg-blue-500 aspect-square
                sm:px-2 sm:py-1"
                @click="updateStage($event, true)">
                    <IconFilter class="group is-icon-white h-6"/>
                </ButtomStandart>
            </div>
            <div ref="filter"
            class="w-1/4 px-4 lg:w-1/3 transition-all
            md:fixed md:top-0 md:-left-full md:w-[360px] md:z-40
            sm:w-full sm:p-0 sm:overflow-y-scroll sm:h-screen"
            :class="[ stage ? 'md:-left-4 sm:left-0' : 'md:-left-full' ]">
                <div class="bg-gray-100 px-4 py-8 xl:px-3 xl:py-6">
                    <CatalogFilter :makerList="makerList"
                    @option-seacrh="(e) => getIdProduct(e)"/>
                </div>
            </div>
            <div class="w-3/4 lg:w-2/3 md:w-full">
                <div v-if="loader" class="flex justify-center mt-32">
                    <IconLoader/>
                </div>
                <div class="flex flex-wrap" v-else-if="!loader && Array.isArray(listIdProduct) ? listIdProduct.length : null">
                    <ProductCard v-for="item in listIdProduct"
                    :key="item.id" :id="item.id"
                    class="w-1/3 mb-10 lg:w-1/2 md:w-1/3 sm:w-1/2
                    slader__item
                    group is-pos-info-for-stock"/>
                </div>
                <div v-else>
                    <p class="text-2xl text-gray-500 p-8 lg:text-xl sm:text-lg sm:p-4"
                    >По вашему запросу ничего не найденно</p>
                </div>
            </div>
        </div>
        <CatalogPageControlButtoms :activeButtomNext="activeButtomNext"
        class="mb-20"/> -->
    </section>
</template>


<!-- <script setup lang="ts">
import { ShowContent } from "@/components/Other/Modal/Show";

definePageMeta({
    middleware: ['catalog'],
    title: 'Каталог товаров',
    pageTransition: { name: 'page-transition' },
    keepalive: { include: 'Filter'}
})

const { getProductForCategor, getMakerlist } = useProduct()
const route = useRoute()

const listIdProduct = ref<object[]>([])
const loader = ref<boolean>(true)
const filter = ref<HTMLElement | null>(null)
const toucheData = toucheElemPosition(filter)
const makerList = ref<{ name: string; value: string; }[] | undefined>(null)
const activeButtomNext = ref<number>(0)
const { stage, updateStage } = ShowContent()


async function getIdProduct(optionSeacrh: object = {}) {
    loader.value = true
    const res = await getProductForCategor({
        skip: ((route.query.page - 1) * route.query.limit),
        take: +route.query.limit,
        where: optionSeacrh,
        select: { id: true}
    })

    makerList.value = await getMakerlist({
        where: optionSeacrh.categor ? { categor: optionSeacrh.categor } : { NOT: optionSeacrh.NOT },
        select: { maker: true }
    })

    const dataOfNextPage = await getProductForCategor({
        skip: (+route.query.page * route.query.limit),
        take: +route.query.limit,
        where: optionSeacrh,
        select: { id: true}
    })
    
    listIdProduct.value = res?.value
    activeButtomNext.value = dataOfNextPage?.value.length
    loader.value = false
}

watch(() => toucheData.vector, (newVector) => {
    if (newVector === 3) {
        updateStage(event)
    }
})
</script> -->

