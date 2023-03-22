<template>
    <div></div>
    <section>
        <ClientOnly>
            <WidgetsCatalogHeader />
        </ClientOnly>
        <div class="flex -mx-4 md:relative mb-8 min-h-[90vh] sm:-mx-2">
            <div class=" fixed top-1/2 left-0 z-20 transition-all hidden md:block"
                :class="[stage ? 'opacity-0' : ' opacity-100']">
                <UIStandart class="bg-blue-500 aspect-square
                sm:px-2 sm:py-1" @click="updateStage($event, true)">
                    <UIIconFilter class="group is-icon-white h-6"/>
                </UIStandart>
            </div>
            <div ref="filter" class="w-1/4 px-4 lg:w-1/3 transition-all
            md:fixed md:top-0 md:-left-full md:w-[360px] md:z-40
            sm:w-full sm:p-0 sm:overflow-y-scroll sm:h-screen"
                :class="[stage ? 'md:-left-4 sm:left-0' : 'md:-left-full']">
                <div class="bg-gray-100 px-4 py-8 xl:px-3 xl:py-6">
                    <WidgetsCatalogFilter @option-seacrh="(e) => getIdProduct(e)"/>
                </div>
            </div>
            <WidgetsCatalogGalletyItems :list-id-product="listIdProduct" :loader="loader" />
        </div>
            <div class="flex mb-20">
                <div class="w-1/4 md:hidden"></div>
                <div class="w-3/4 flex justify-center md:w-full">
                    <SharedUIButtomArround @click="prevPage(route)" :disabled="route.query.page ? (+route.query.page === 1) : false"
                        class="-scale-x-100 mr-32" />
                    <SharedUIButtomArround @click="nextPage(route)" :disabled="!activeButtomNext" />
                </div>
            </div>
    </section>
</template>

<script setup lang="ts">
import ShowContent from "@/utils/ShowContent"
import { prevPage, nextPage } from "@/components/Features/catalog/FunctionControl";
import { Prisma } from "@prisma/client";

definePageMeta({
    middleware: ['catalog'],
    title: 'Каталог товаров',
    keepalive: true
})

const filter = ref<HTMLElement | null>(null)
const toucheData = toucheElemPosition(filter)
const { stage, updateStage } = ShowContent()
const route = useRoute()
const listIdProduct = ref<ProductCard[]>([])
const loader = ref<boolean>(true)
const makerList = ref<{ name: string; value: string; }[] | null>(null)
const activeButtomNext = ref<number>(0)
const { getInfo: getInfoProduct } = useProduct()
const { isMobile } = useDevice()


const selectOption = Prisma.validator<Prisma.ProductCardArgs>()(selectForCard({}))
type ProductCard = Prisma.ProductCardGetPayload<typeof selectOption>

watch(() => toucheData.vector, (newVector) => {
    if (newVector === 3) {
        updateStage(event)
    }
})

async function getIdProduct(optionSeacrh: object = {}) {
    if (isMobile) {
        updateStage(event, false)
    }
    loader.value = true
    const page = route.query.page ? +route.query.page : 1
    const limit = route.query.limit ? +route.query.limit : 12

    const res = await getInfoProduct<ProductCard[]>({
        skip: ((page - 1) * limit),
        take: limit,
        where: optionSeacrh,
        ...selectOption
    }, 'many=true')

    // await getMakerlist({
    //     where: optionSeacrh.categor ? { categor: optionSeacrh.categor } : { NOT: optionSeacrh.NOT },
    //     select: { maker: true }
    // })

    listIdProduct.value = res ? res : []

    const dataOfNextPage = await getInfoProduct<ProductCard[]>({
        skip: (page * limit),
        take: limit,
        where: optionSeacrh,
        select: { id: true }
    }, 'many=true') || []

    activeButtomNext.value = dataOfNextPage ? dataOfNextPage.length : 0
    loader.value = false
}

// async function getMakerlist(params: object) {
//     try {
//         const listModifi = (list: object[]) => list.map(el => Object.create({ name: el, value: el }))

//         const res: object[] = await getInfoProduct(params, 'many=true')
//         const list = new Set(res.map(el => el.maker))
//         makerList.value = listModifi([...list])
//     } catch (error) {
//         console.log(error);
//     }
// }
</script>