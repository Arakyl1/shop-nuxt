<template>
    <div>
        <div>
            <div class="pb-3">
                <h4 class="text-lg mb-1">Категория</h4>
                <div v-if="categor">
                    <AtomList :list="categor" :class="[style.input]" class="w-full"
                        :value="route.query.categor ? route.query.categor : 'Категория'"
                        @change="routePushQueryCategor" />
                </div>
            </div>
            <div class="pb-3">
                <h4 class="text-lg mb-1">Подкатегория</h4>
                <div>
                    <AtomList :list="subcategor" :class="[style.input]" class="w-full"
                    :disabled="!('categor' in route.query)">Подкатегория
                    </AtomList>
                </div>
            </div>
            <div class="decor-line"></div>
            <div class="py-3">
                <h4 class="text-lg mb-1">Цена</h4>
                <form class="flex w-full items-center">
                    <input class="w-[45%]"
                        :class="[style.input, { 'outline outline-1 outline-red-500': checkValidPrice.from }]"
                        v-model="filterList.price.from" type="number" placeholder="От" />
                    <p class="grow text-center">:</p>
                    <input class="w-[45%] p-2"
                        :class="[style.input, { 'outline outline-1 outline-red-500': checkValidPrice.to }]"
                        v-model="filterList.price.upTo " type="number" placeholder="До" />
                </form>
            </div>
            <template v-if="makerList">
                <AtomListCheckbox :content="makerList" :reset="reset" @maker-data="addData($event as any[], 'maker')">
                    <template #title>
                        <h4 class="text-lg mb-1">Бренд</h4>
                    </template>
                </AtomListCheckbox>
            </template>
            <div class="decor-line"></div>
            <div class="py-3">
                <h4 class="text-lg mb-1">Рейтинг</h4>
                <AtomUIStar :quantity-star="filterList.ranting" @number-star="(e) => { filterList.ranting = e }"
                    class="justify-between" />
            </div>

            <ContentDoc path="/filter-list/other" v-slot="{ doc }">
                <AtomListCheckbox :content="doc.body" :reset="reset" @maker-data="addData($event as any[], 'actual')">
                    <template #title>
                        <h4 class="text-lg mb-1">Другое</h4>
                    </template>
                </AtomListCheckbox>
            </ContentDoc>
            <ContentDoc path="/filter-list/other-service" v-slot="{ doc }">
                <AtomListCheckbox :content="doc.body" :reset="reset" @maker-data="addData($event as any[], 'other')">
                    <template #title>
                        <h4 class="text-lg mb-1">Доставка и наличие'</h4>
                    </template>
                </AtomListCheckbox>
            </ContentDoc>
        </div>
        <div class="flex mt-4">
            <AtomButtonStandart class="bg-blue-500 text-white grow text-lg mr-4 py-3 xl:py-2"
            @click="searchProduct">
                Показать
            </AtomButtonStandart>
            <AtomButtonStandart class="bg-blue-500 aspect-square p-3.5"
            @click="resetSearchData">
                <IconReload class="w-6 h-6 xl:w-5 xl:h-5 group icon-white"  />
            </AtomButtonStandart>
        </div>
    </div>
</template>

<script setup lang="ts">
import { filterList as CreateFilterList } from "@/utils/create";
import { Prisma } from "@prisma/client";


type MakerItem = { name: string, value : string }
type optionSearch = {
    categor?: string,
    NOT?: [{ categor: '' }],
    price: { gte?: number, lte?: number },
    ranting: { gte: number },
    maker?: { in: string[]}
}

const emit = defineEmits<{
    (e: 'option-seacrh', id: object): void
}>()


const { getInfo: getInfoProduct } = useProduct()
const route = useRoute()
const router = useRouter()
const filterList = ref(CreateFilterList(route))
const makerList = ref<MakerItem[]>([])
const reset = ref(false)
const { data } = await useAsyncData('select', () => queryContent('/select').only(['select']).findOne())


const searchParameters = computed(() => Object.values(route.query).map((el: any) => el.trim()).join('_'))

const categor = computed(() => data.value ? data.value.select.map((el: any) => el.name) : [])
const subcategor = computed(() => data.value && route.query.categor ?
    data.value.select.find((el: any) => el.name === route.query.categor).children.map((el: any) => el.name) :
    [])

const checkValidPrice = computed(() => {
    const from = filterList.value.price.from
    const upTO = filterList.value.price.upTo
    return { from: from ? (from > upTO && upTO !== 0) || from < 0 : false, to: upTO < 0 }
})

const optionSearch = computed(() => {
    const option: optionSearch = {
        price: {},
        ranting: { gte: 0 },
    }

    if (route.query.categor) {
        option.categor = route.query.categor as unknown as string
    } else {
        option.NOT = [{ categor: '' }]
    }
    if (filterList.value.ranting > 0) option.ranting.gte = filterList.value.ranting
    if (filterList.value.price.from > 0) option.price.gte = filterList.value.price.from
    if (filterList.value.price.upTo > 0) option.price.lte = filterList.value.price.upTo
    if (filterList.value.maker.length > 0) option.maker = { in: filterList.value.maker }
    if (filterList.value.actual.length > 0) addOption(filterList.value.actual, option)
    if (filterList.value.other.length > 0) addOption(filterList.value.other, option)
    
    return option
})

// methods
function routePushQueryCategor({ target }: Event) {
    const _target = target as HTMLSelectElement
    type params = { page: number, categor?: string }
    const params: params = { ...route.query, page: 1, categor: _target ? _target.value : "Категория" }
    if (params.categor === "Категория") delete params.categor

    route.query.categor !== params.categor ? router.push({ query: params }) : ''
}

type filterListKey = 'maker'|'other'|'actual'
const addData = (el: any[], way: string) => {
    filterList.value[way as unknown as filterListKey] = el
}
const addOption = (data: string[], option: object): void => Object.assign(
    option, ...data.map(el => { return { [el]: true } }));

function resetSearchData() {
    filterList.value = CreateFilterList(route)
    reset.value = !reset.value
    sendParams()
}

type SearchParams = { where: { categor: string } | { NOT: [{categor: ''}] }, select: { maker: true } }

async function getMakerlist(params: SearchParams): Promise<void> {
    const selectOption = Prisma.validator<Prisma.ProductCardArgs>()({ select: params.select })
    type MakerNameList = Prisma.ProductCardGetPayload<typeof selectOption>

    const listModifi = <T extends any,>(list: string[]):T[] => list.map(el => Object.create({ name: el, value: el }))
        
    try {
        const res = await getInfoProduct<MakerNameList[]>(params, 'many=true')
        if (!res) return
        const list = new Set(res.map(el => el.maker))
        makerList.value = listModifi<MakerItem>([...list])
    } catch (error) {
        console.log(error);
    } 
}

function SearchParams():SearchParams {
   return {
        where: typeof route.query.categor === 'string' ? { categor: route.query.categor } : { NOT: [{ categor: '' }] },
        select: { maker: true }
    }
}

function sendParams() {
    if (+route.query.page! > 1) {
        return navigateTo({
            path: route.path,
            query: { ...route.query, page: 1 }
        })
    } else {
        searchProduct()
    }
}

function searchProduct() {
    emit('option-seacrh', optionSearch.value)
}

async function initFilter() {
    searchProduct()
    await getMakerlist(SearchParams())
}

    
watch(() => searchParameters.value, () => {
    searchProduct()
})

watch(() => route.query.categor!, async(newValue, oldValue) => {

    if (newValue === oldValue) return
    await getMakerlist(SearchParams())
})

initFilter()

const style = {
    title: 'text-lg mb-1',
    input: 'p-2 rounded-md focus-visible:outline-none text-gray-500'
}
</script>

