<template>
    <div>
        <div>
            <div class="pb-3">
                <h4 class="text-lg mb-1">Категория</h4>
                <div v-if="categor">
                    <SharedUISelect :list="categor" :class="[style.input]" class="w-full"
                        :value="route.query.categor ? route.query.categor : 'Категория'"
                        @change="routePushQueryCategor" />
                </div>
            </div>
            <div class="pb-3">
                <h4 class="text-lg mb-1">Подкатегория</h4>
                <div>
                    <SharedUISelect :list="subcategor" :class="[style.input]" class="w-full"
                    :disabled="!('categor' in route.query)">Подкатегория
                    </SharedUISelect>
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
                <EntitiesFilterListCheckbox :content="makerList" :reset="reset" @maker-data="addData($event, 'maker')">
                    <template #title>
                        <h4 class="text-lg mb-1">Бренд</h4>
                    </template>
                </EntitiesFilterListCheckbox>
            </template>
            <div class="decor-line"></div>
            <div class="py-3">
                <h4 class="text-lg mb-1">Рейтинг</h4>
                <SharedUIStar :quantity-star="filterList.ranting" @number-star="(e) => { filterList.ranting = e }"
                    class="justify-between" />
            </div>

            <ContentDoc path="/filter-list/other" v-slot="{ doc }">
                <EntitiesFilterListCheckbox :content="doc.body" :reset="reset" @maker-data="addData($event, 'actual')">
                    <template #title>
                        <h4 class="text-lg mb-1">Другое</h4>
                    </template>
                </EntitiesFilterListCheckbox>
            </ContentDoc>
            <ContentDoc path="/filter-list/other-service" v-slot="{ doc }">
                <EntitiesFilterListCheckbox :content="doc.body" :reset="reset" @maker-data="addData($event, 'other')">
                    <template #title>
                        <h4 class="text-lg mb-1">Доставка и наличие'</h4>
                    </template>
                </EntitiesFilterListCheckbox>
            </ContentDoc>
        </div>
        <div class="flex mt-4">
            <UIStandart class="bg-blue-500 text-white grow text-lg mr-4 py-3 xl:py-2"
            @click="searchProduct">
                Показать
            </UIStandart>
            <UIStandart class="bg-blue-500 aspect-square p-3.5"
            @click="resetSearchData">
                <UIIconReload class="w-6 h-6 xl:w-5 xl:h-5 group icon-white"  />
            </UIStandart>
        </div>
    </div>
</template>

<script setup lang="ts">
import { filterList as CreateFilterList } from "@/utils/create";
import { RouteLocationNormalizedLoaded } from "vue-router";

const props = defineProps<{
    makerList: {
        name: string,
        value: string
    }[]
}>()

const emit = defineEmits<{
    (e: 'option-seacrh', id: object): void
}>()

const route: RouteLocationNormalizedLoaded = useRoute()
const router = useRouter()
const { data } = await useAsyncData('select', () => queryContent('/select').only(['select']).findOne())

const filterList = ref(CreateFilterList(route))

const reset = ref(false)

const style = {
    title: 'text-lg mb-1',
    input: 'p-2 rounded-md focus-visible:outline-none text-gray-500'
}

const searchParameters = computed(() => Object.values(route.query).map(el => el.trim()).join('_'))
const categor = computed(() => data.value ? data.value.select.map(el => el.name) : [])
const subcategor = computed(() => data.value && route.query.categor ?
    data.value.select.find(el => el.name === route.query.categor).children.map(el => el.name) :
    [])

const checkValidPrice = computed(() => {
    const from = filterList.value.price.from
    const upTO = filterList.value.price.upTo
    return { from: from ? (from > upTO && upTO !== 0) || from < 0 : false, to: upTO < 0 }
})

const optionSearch = computed(() => {
    const option = {
        price: {},
        ranting: { gte: 0 },
    }

    if (route.query.categor) {
        option.categor = route.query.categor
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
function routePushQueryCategor(event: Event) {
    const params = { ...route.query, page: 1, categor: event.target ? event.target.value : "Категория" }
    if (params.categor === "Категория") {
        delete params.categor
    }

    route.query.categor !== params.categor ? router.push({ query: params }) : ''
}

const addData = (el: any, way: any) => { filterList.value[way] = el }
const addOption = (data: string[], option: object) => Object.assign(option, ...data.map(el => { return { [el]: true } }));

function resetSearchData() {
    filterList.value = CreateFilterList(route)
    reset.value = !reset.value
    sendParams()
}

function sendParams() {
    if (+route.query.page > 1) {
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

searchProduct()

watch(() => searchParameters.value, () => {
    searchProduct()
})
</script>

