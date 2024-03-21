<template>
    <div @input.stop @change.stop>
        <div v-show="!pending">
            <form ref="formCategory" @input="changeCategor" @change="changeCategor">
                <template v-if="selectData">
                    <fieldset>
                        <SelectCategor :data="selectData" />
                    </fieldset>
                </template>
            </form>
            <form ref="form" class="flex flex-column gap-3" @input="getParamsFilter" @change="getParamsFilter">
                <template v-if="dataFilterList">
                    <template v-for="section, i in dataFilterList"
                    :key="Array.isArray(section) ? i : section.title">
                    <template v-if="Array.isArray(section)">
                            <Group :tag="'fieldset'" class="w-full gap-2">
                                <div class="decor-line"></div>
                                <Group class="gap-2 w-full">
                                    <template v-for="item in section">
                                        <Flex v-if="item.type === 'radio'" :justify="'between'" class="w-full">
                                            <span class="text-md">{{ item.title }}</span>
                                            <Switch :name="item.name!"
                                            :value="item.value!" />
                                        </Flex>
                                    </template>
                                </Group>
                            </Group>
                        </template>
                        <template v-else>
                            <div v-if="section.type === 'select'"></div>

                            <Group v-else-if="section.type === 'number-range'" :tag="'fieldset'" class="gap-2" >
                                <div class="decor-line"></div>
                                <Title :tag="'h4'" class="truncate">{{ section.title }}</Title>
                                <RangeNumber :section="section" :mode="'outline'"/>
                            </Group>

                            <Group v-else-if="section.type === 'star'" :tag="'fieldset'" class="gap-2">
                                <Title tag="h4" class="truncate" :text="section.title"/>
                                <div class="decor-line"></div>
                                <Rating
                                :value="ratingStar"
                                :name="section.name"
                                :readonly="false"
                                :step="1"
                                :width="25"
                                class="justify-between w-full"/>
                            </Group>

                            <Group v-else-if="section.type === 'checkbox'" :tag="'fieldset'" class="gap-2">
                                <Title tag="h4" class="truncate" :text="section.title"/>
                                <div class="decor-line"></div>
                                <ListCheckBox :content="section" />
                            </Group>

                            <Flex v-else-if="section.type === 'radio'" :justify="'between'" class="gap-2">
                                <span>{{ section.title }}</span>
                                <Switch :name="section.name!" :value="section.value!" />
                            </Flex>
                        </template>
                    </template>

                    <Flex :justify="'end'" class=" pt-3">
                        <Button
                        :appearance="'blue'"
                        :text="commonButton.FILTER_RESET"
                        :icon-left="{ icon: 'reload', size: '20_20' }"
                        @click.prevent="resetData"
                        :height="'h-10'"
                        class="text-md px-4"/>
                    </Flex>
                </template>
            </form>
        </div>
        <FilterSkeleton v-show="pending"/>
    </div>
</template>

<script setup lang="ts">
import Rating from "@/components/UI/Rating/Rating.vue";
import Switch from "@/components/UI/Switch/Switch.vue";
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import RangeNumber from "@/components/UI/Range/Number.vue";
import Group from "@/components/UI/Group/Group.vue";
import SelectCategor from '@/components/Templates/Form/Categor.vue'
import ListCheckBox from "@/components/UI/List/Checkbox.vue";
import FilterSkeleton from '@/components/Templates/page__catalog/filterSkeleton.vue'
import { FilterData } from '~~/type/intex';
import { alert as _alert } from "@/stores/alert";
import { BASE_BUTTON as commonButton } from "@/common/C";
import { resetForm, setValueInput } from "@/utils/formHelpers";


const route = useRoute()
const router = useRouter()
const storeAlert = _alert()
const pending = ref<boolean>(false)
const formCategory = ref<HTMLFormElement | null>(null)
const form = ref<HTMLFormElement | null>(null)
const dataFilterList = useState<FilterData | null>('dataFilterList', () => null)
const ratingStar = ref<number>(0)


const routeCategorId = computed(() => 'categor' in route.query ? route.query.categor : null)
const sizePage = computed(() => 'limit' in route.query ? { limit: route.query.limit } : {})
const selectData = computed(() => dataFilterList.value ? dataFilterList.value.find(_ => _.type === 'select' )?.data.map(_ => _.id) : [])


initFilterData()

onMounted(() => {
    getFilterData()
    nextTick(() => initFilter())
    window.addEventListener('restore', getParamsFilter, { passive: true })
})


onBeforeUnmount(() => {
    window.removeEventListener('restore', getParamsFilter)
})

watch(() => routeCategorId.value, () => {
    if (form.value) {
        resetForm(form.value)   
        getFilterData()
    }
})


function initFilterData() {
    if (!dataFilterList.value) {
        getFilterData()
    }
}

function initFilter() {
    if (form.value) {
        const params = getFilterActiveParamsByRouteQuery()       
        setValueInput(form.value, params)
    }   
}

// methods
function getFilterData() {
    useFetch('/api/other/filter', {
        server: true,
        params: { ...route.query },
        retry: 1,
        lazy: false,
        onRequest() {
            pending.value = true
        },
        onResponse({ response }) {
            if (response.status < 400) {
                dataFilterList.value = response._data
            }
            pending.value = false
        }
    })
}


function resetData(event: MouseEvent) {
    form.value ? resetForm(form!) : null
    nextTick(() => {
        const event = new CustomEvent('restore')
        window.dispatchEvent(event)
    })
}

function getParamsFilter() {
    const queryParams = { ...route.query }
    if (form.value) {
        if (!form.value.checkValidity()) return

        const changeStr = (s: string) => s.trim().replace(/\s/, '__')
        let finalParams: { [key: string]: string } = {}
        const formData = new FormData(form.value)
        const paramsData = new Map<string, { key: string, value: (string | number)[] }>()

        for (const [key, value] of formData) {
            if (isString(value) && Boolean(value) && value !== '0') {
                const keyArr = key.split('.')
                const _key = keyArr[0]
                const _value = `${keyArr.slice(1).join('.')}${keyArr.length > 1 ? ':' : ''}${value}` 
                
                if (paramsData.has(key)) {
                    const paramsItem = paramsData.get(key)
                    paramsData.set(key, { key: _key, value: [...paramsItem!.value, changeStr(_value)] })
                } else {
                    paramsData.set(key, { key: _key, value: [changeStr(_value)] })
                }
            }
        }
      
        for (const [key, value] of paramsData) {
            finalParams[value['key']] = value.value.join(',')
        }

        let page = 'page' in queryParams ? { page: 1 } : {}
        router.push({ query: { 'categor': routeCategorId.value, ...finalParams, ...page, ...sizePage.value } })
    }
}



function changeCategor({ target }: Event) {
    if (target instanceof HTMLSelectElement) {
        const _target = target
        router.push({ query: { [_target.name]: _target.value, page: 1, ...sizePage.value } })
    }
}

function getFilterActiveParamsByRouteQuery() {
    const activeParams = { ...route.query }
    const params = new Map<string, (string)[]>()

    for (const key in activeParams) {
        const value = activeParams[key]
        const attr = (value as string).split(':')
        const _key = `${key}${attr.length > 1 ? ('.' + attr[0]) : ''}`
        const _value = (attr.length > 1 ? attr.slice(1): attr).join(':').split(',').map(_ => _.split('__').join(' '))
        params.set(_key, _value)
    }

    return params
}
</script>

