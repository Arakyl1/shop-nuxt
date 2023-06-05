<template>
    <div>
        <form ref="form">
            <section>
                <fieldset class="pb-3">
                    <legend >Категория</legend>
                    <div>
                        <AtomList :name="getPropertyName('categor')"
                        :list="data ? data.map((el: any) => el.name) : []"
                        :class="[style.input]" class="w-full"
                        :option="route.query.categor ? (route.query.categor as string) : '' "
                        @change="[routePushQueryCategor($event)]" />
                    </div>
                </fieldset>
                <fieldset class="pb-3">
                    <legend >Подкатегория</legend>
                    <div>
                        <AtomList :list="subcategor"
                        :class="[style.input]" class="w-full"
                        :disabled="!('categor' in route.query)"
                        :option="route.query.categor ? (route.query.categor as string) : '' "
                        />
                    </div>
                </fieldset>
            </section>

            <section>
                <div class="decor-line"></div>
                <div class="py-3">
                    <h1 class="text-lg mb-1">Цена</h1>
                    <div class="flex w-full items-center">
                        <template v-for="i in 1" :key="i">

                        
                        <input class="w-[45%]"
                            type="number"
                            placeholder="От"
                            name="price.gte"
                            ref="inputs"
                            step="1"
                            min="1"
                            :max="priseValue.to <= 0 ? 99999999 : priseValue.to"
                            :class="[style.input, 'input--validation']"
                            @input="(e) => (priseValue.from = (e.target as HTMLInputElement).valueAsNumber)"
                            />

                        <p class="grow text-center">:</p>

                        <input class="w-[45%] p-2"
                            type="number"
                            placeholder="До"
                            name="price.lte"
                            ref="inputs"
                            step="1"
                            :min="priseValue.from"
                            :class="[style.input, 'input--validation']"
                            @input="(e) => (priseValue.to = (e.target as HTMLInputElement).valueAsNumber)"
                             />
                        </template>
                    </div> 
                </div>
            </section>
            
            <template v-if="makerList.length">
                <AtomListCheckbox
                :content="makerList"
                :reset="reset">
                    <template #title>
                        <h1 class="text-lg mb-1">Бренд</h1>
                    </template>
                </AtomListCheckbox>
            </template>
             <div class="decor-line"></div>
            <div class="py-3">
                <h4 class="text-lg mb-1">Рейтинг</h4>
                <AtomUIStar class="justify-between" :reset="reset"/>
            </div>

            <AtomListCheckbox
            :content="filterListParams"
            :reset="reset">
                <template #title>
                    <h1 class="text-lg mb-1">Другое</h1>
                </template>
            </AtomListCheckbox>
            <AtomListCheckbox
            :content="filterListServive"
            :reset="reset">
                <template #title>
                    <h4 class="text-lg mb-1">Доставка и наличие'</h4>
                </template>
            </AtomListCheckbox>
        <div class="flex mt-4">
            <AtomButtonStandart class="bg-blue-500 text-white grow text-lg mr-4 py-3 xl:py-2" @click="sendParams()">
                Показать
            </AtomButtonStandart>
            <AtomButtonStandart class="bg-blue-500 aspect-square p-3.5" @click="resetSearchData">
                <IconReload class="w-6 h-6 xl:w-5 xl:h-5 group icon-white" />
            </AtomButtonStandart>
        </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Prisma } from "@prisma/client";
import { PP } from '~~/type/intex';


const emit = defineEmits<{
    (e: 'option-seacrh', id: object): void
}>()

const { getInfo: getInfoProduct } = useProduct()
const route = useRoute()
const router = useRouter()
const { createAlert } = useAlert() 
const form = ref<HTMLFormElement | null>(null)
const inputs = ref<any[]>([])
const priseValue = ref<{ from: number, to: number }>({ from: 0, to: 0 })
const makerList = ref<PP[]>([])
const reset = ref(false)
const { data } = await useAsyncData('select',
    () => queryContent('/select').only(['select']).findOne(),
    {
        transform: (data) => data.select
    })

const style = {
    title: 'text-lg mb-1',
    input: 'p-2 rounded-md text-gray-500'
}


const searchParameters = computed(() => Object.values(route.query).map((el: any) => el.trim()).join('_'))

const subcategor = computed(() => data.value && 'categor' in route.query ?
    data.value.find((el: any) => el.name === route.query.categor).children.map((el: any) => el.name) :
[])

// methods

function checkValidInput(): boolean {
    let valid: boolean = false
    if (!inputs.value) return valid
    
    if (Array.isArray(inputs.value)) {
        valid = inputs.value.find(_ => !_.validity.valid) ? false : true
    }
    return valid 
}

function routePushQueryCategor({ target }: Event) {
    const _target = target as HTMLSelectElement
    type params = { page: number, categor?: string }
    const params: params = { ...route.query, page: 1, categor: _target ? _target.value : "Категория" }
    if (params.categor === "Категория") delete params.categor

    route.query.categor !== params.categor ? router.push({ query: params }) : ''
}


async function getMakerlist<
    T extends Prisma.ProductCardWhereInput 
>(_w: T): Promise<void> {

    const selectOption = Prisma.validator<Prisma.ProductCardArgs>()({ select: { maker: true }})
    type MakerNameList = Prisma.ProductCardGetPayload<typeof selectOption>

    const listModifi = <T extends any>(list: string[]): T[] => list.map(el => Object.create({ title: el, name: 'maker.in', value: el }))

    const keyData = generateKey({ categor: route.query.categor })
    try {
        getInfoProduct<MakerNameList[]>({ 'where': _w, ...selectOption },
            { many: true },
            {
                key: keyData,
                server: false,
                onResponse({ response }) {
                    const list = new Set(response._data.map((el: MakerNameList) => el.maker)) as Set<string>
                    makerList.value = listModifi<PP>([...list])
                }
            })
    } catch (error) {
        console.log(error);
    }
}

type GG = { [prop: string]: any }
function createSearchParams(): GG | void {
    let s = Date.now()
    if (!form.value) return
    const f = new FormData(form.value)

    let paramsData: GG = {}

    for (const [key,value] of f) {
        const keyAr = key.split('.').reverse()
        let creatObj: GG = {}
        
        keyAr.forEach((_,i) => {
            if (value) {
                let valueIsNumber = parseFloat(value as string).toString().length === value.length
                if (valueIsNumber) {
                    creatObj = { [_]: i === 0 ? parseFloat(value as string) : creatObj }
                    return
                }
                if (value === 'true') {
                    creatObj = { [_]: i === 0 ? true : creatObj }
                    return
                }
                if (_ === 'in') {
                    creatObj = { in: [value] }
                    return
                }
                if (isString(value) && value && i === 0) {
                    creatObj = { [_]: value }
                    return
                }
                creatObj = { [_]: creatObj }
            }
        })
        paramsData = deepConcat(creatObj, paramsData)
    }
    console.log(paramsData);
    return paramsData
}

type searchParams = () => Prisma.ProductCardWhereInput 
const searchParams: searchParams = () => ('categor' in route.query ?
    { 'categor': (route.query.categor as string) }:
    { NOT: [{ categor: '' }] })


function searchProduct() {
    const d = createSearchParams()
    test(d)
    if (d) {
        emit('option-seacrh', d)
    } else {
        emit('option-seacrh', searchParams() ) 
    }
}

function sendParams() {
    const res = checkValidInput()
    if (res) {
        if (+route.query.page! > 1) {
            return navigateTo({
                path: route.path,
                query: { ...route.query, page: 1 }
            })
        } else {
            searchProduct()
        }
    } else {
        createAlert('Проверить введеные данные')
    }
    
}

function resetSearchData() {
    if (inputs.value.length) {
        inputs.value.forEach(_ => _.value = '')
    }
    priseValue.value = { from: 0, to: 0 }
    reset.value = !reset.value
    setTimeout(() => sendParams(), 0) 
}

async function initFilter() {
    searchProduct()
    getMakerlist(searchParams())
}

initFilter()

watch(() => searchParameters.value, () => {
    searchProduct()
})

watch(() => route.query.categor!, async (newValue, oldValue) => {
    if (newValue === oldValue) return
    getMakerlist(searchParams())
})
</script>

