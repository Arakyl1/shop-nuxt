<template>
    <div @input.stop @change.stop>
        <form ref="formCategory" @input="changeCategor" @change="changeCategor">
            <template v-if="selectData">
                <fieldset v-for="item in selectData">
                    <SelectCategor :data="item.data" :style="{ width: '250px' }"/>
                </fieldset>
            </template>
        </form>
        <form ref="form" class="flex flex-column gap-y-3" @input="getParamsFilter" @change="getParamsFilter">
            <template v-if="dataFilterList">
                <template v-for="section, i in dataFilterList"
                :key="Array.isArray(section) ? i : section.title">
                <template v-if="Array.isArray(section)">
                        <Group :tag="'fieldset'" class="w-full gap-y-2">
                            <div class="decor-line"></div>
                            <Group class="gap-y-2 w-full">
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

                        <Group v-else-if="section.type === 'number-range'" :tag="'fieldset'" class="gap-y-2" >
                            <div class="decor-line"></div>
                            <Title :tag="'h5'" class="truncate">{{ section.title }}</Title>
                            <RangeNumber :section="section" :mode="'outline'"/>
                        </Group>

                        <Group v-else-if="section.type === 'star'" :tag="'fieldset'" class="gap-y-2">
                            <Title tag="h5" class="truncate" :text="section.title"/>
                            <div class="decor-line"></div>
                            <Rating
                            :value="ratingStar"
                            :name="section.name"
                            :readonly="false"
                            :step="1"
                            :width="25"
                            class="justify-between w-full"/>
                        </Group>

                        <Group v-else-if="section.type === 'checkbox'" :tag="'fieldset'" class="gap-y-2">
                            <Title tag="h5" class="truncate" :text="section.title"/>
                            <div class="decor-line"></div>
                            <ListCheckBox :content="section" />
                        </Group>

                        <Flex v-else-if="section.type === 'radio'" :justify="'between'" class="gap-x-2">
                            <span>{{ section.title }}</span>
                            <Switch :name="section.name!" :value="section.value!" />
                        </Flex>
                    </template>
                </template>

                <Flex :justify="'end'" class=" pt-3">
                    <Button
                    :appearance="'blue'"
                    :text="commonButton.FILTER_RESET"
                    @click.prevent="resetData" class="text-lg px-8 h-10"/>
                </Flex>
            </template>
        </form>
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
import { Content, FilterData } from '~~/type/intex';
import { alert as _alert } from "@/stores/alert";
import { BASE_BUTTON as commonButton } from "@/common/C";
import { resetForm, setValueInput } from "#imports";


const route = useRoute()
const router = useRouter()
const storeAlert = _alert()
// const _content = useState<Content>('CONTENT_APP')
const formCategory = ref<HTMLFormElement | null>(null)
const form = ref<HTMLFormElement | null>(null)
const dataFilterList = useState<FilterData | null>('dataFilterList', () => null)
const ratingStar = ref<number>(0)


const routeCategorId = computed(() => 'categor' in route.query ? route.query.categor : null)
const selectData = computed(() => dataFilterList.value ? dataFilterList.value.filter(_ => {
    return !Array.isArray(_) ? _.type === 'select' : false }
) : null)


if (!dataFilterList.value) {
    initFilterData()
}

watch(() => routeCategorId.value, () => {
    if (form.value) resetForm(form.value)

    initFilterData()
})


// methods
function initFilterData() {
    useFetch('/api/other/filter', {
        server: true,
        params: { ...route.query },
        retry: 1,
        lazy: true,
        onResponse({ response }) {
            if (response.status < 400) {
                dataFilterList.value = response._data
            }
        }
    })
}


function resetData(event: MouseEvent) {
    // resetForm()
    getParamsFilter(event)
}

function getParamsFilter({ target, type }: Event) {
    const queryParams = { ...route.query }
   
    if (target instanceof Element) {
        const _target = target
        
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
            let limit = 'limit' in queryParams ? { limit: queryParams.limit } : {}
           
            router.push({ query: { 'categor': routeCategorId.value, ...finalParams, ...page, ...limit } })
        }
    }
}



function changeCategor({ target, type }: Event) {
    if (target instanceof HTMLSelectElement) {
        const _target = target
        let limit = 'limit' in route.query ? { limit: route.query.limit } : {}
        router.push({ query: { [_target.name]: _target.value, page: 1, ...limit } })
    }
}


onMounted(() => {
    if (form.value) {
        const activeParams = { ...route.query }
        const params = new Map<string, (string)[]>()

        for (const key in activeParams) {
            const value = activeParams[key]
            const attr = (value as string).split(':')
            const _key = `${key}${attr.length > 1 ? ('.' + attr[0]) : ''}`
            const _value = (attr.length > 1 ? attr.slice(1): attr).join(':') .split(',').map(_ => _.split('__').join(' '))
            params.set(_key, _value)
        }        
        setValueInput(form.value, params)
    }  
})

</script>

