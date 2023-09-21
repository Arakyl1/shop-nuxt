<template>
    <div @input.stop @change.stop>
        <form ref="form" @input="getParamsFilter" @change="getParamsFilter">
            <template v-if="dataFilterList">
                <section v-for="section, i in dataFilterList" :key="Array.isArray(section) ? i : section.title">
                    <template v-if="Array.isArray(section)">
                        <fieldset class="">
                            <div class="decor-line mb-3"></div>
                            <template v-for="item in section">
                                <template v-if="item.type === 'radio'">
                                    <p class="flex items-center justify-between mb-3">
                                        <span>{{ item.title }}</span>
                                        <AtomFormSwitch :style="{ height: '20px' }" :input-name="item.name!"
                                            :input-value="item.value!" />
                                    </p>
                                </template>
                            </template>
                        </fieldset>
                    </template>
                    <template v-else>
                        <template v-if="section.type === 'select'">
                            <fieldset>
                                <MoleculesFormSelectCategor :data="section.data" />
                            </fieldset>
                        </template>
                        <template v-else-if="section.type === 'number-range'">
                            <div class="decor-line"></div>
                            <fieldset class="py-3">
                                <h1 class="truncate mb-2">{{ section.title }}</h1>
                                <AtomFormNumberRange :section="section" :style="{ input: style.input }" />
                            </fieldset>
                        </template>
                        <template v-else-if="section.type === 'star'">
                            <fieldset class="py-2">
                                <h1 class="truncate">{{ section.title }}</h1>
                                <div class="decor-line my-1"></div>
                                <div class="py-1">
                                    <AtomFormRating :input-name="section.name" class="justify-between"
                                        :name="'star_25_25'" />
                                </div>
                            </fieldset>
                        </template>
                        <template v-else-if="section.type === 'checkbox'">
                            <fieldset class="grid py-2">
                                <h1 class="truncate">{{ section.title }}</h1>
                                <div class="decor-line my-1"></div>
                                <div>
                                    <MoleculesListChecbox :content="section" />

                                </div>
                            </fieldset>
                        </template>
                        <template v-else-if="section.type === 'radio'">
                            <p class="flex items-center justify-between mb-3">
                                <span>{{ section.title }}</span>
                                <AtomFormSwitch :style="{ height: '20px' }" :input-name="section.name!"
                                    :input-value="section.value!" />
                            </p>
                        </template>
                    </template>
                </section>

                <div class="flex justify-end pt-3">
                    <AtomButtonStandart @click.prevent="resetData" class=" bg-blue-500 text-white text-lg py-2 xl:py-1">
                        {{ _content?.TEXT_FILTER_BUTTON_RESET || "Reset" }}
                    </AtomButtonStandart>
                </div>

            </template>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Content, FilterData } from '~~/type/intex';
import { alert as _alert } from "@/stores/alert";


const route = useRoute()
const router = useRouter()
const storeAlert = _alert()
const _content = useState<Content>('CONTENT_APP')
const form = ref<HTMLFormElement | null>(null)
const dataFilterList = useState<FilterData | null>('dataFilterList', () => null)


const routeCategorId = computed(() => 'categor' in route.query ? route.query.categor : null)
const style = {
    title: 'text-lg mb-1',
    input: 'p-2 rounded-md text-gray-500'
}

if (!dataFilterList.value) {
    initFilterData()
}

watch(() => routeCategorId.value, () => {
    resetForm()
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

function resetForm() {
    if (form.value) {
        const formElements = form.value.elements
        for (const key in formElements) {
            const value = formElements[key]
            if (value.nodeName === 'INPUT') {
                const _elem = value as HTMLInputElement
                switch (_elem.type) {
                    case 'number': {
                        _elem.value = ''
                        break;
                    }
                    case 'checkbox': {
                        _elem.checked = false
                        break;
                    }
                }
            }
        }
        const formResetEvent = new Event('reset', { bubbles: true })
        form.value.dispatchEvent(formResetEvent)
    }
}

function resetData(event: MouseEvent) {
    resetForm()
    getParamsFilter(event)
}

function getParamsFilter({ target, type }: Event) {
    const queryParams = { ...route.query }

    if (target instanceof Element) {
        const _target = target

        if (form.value) {
            if (!form.value.checkValidity()) return

            const changeStr = (s: string) => s.split(' ').join('__')
            let finalParams: { [key: string]: string } = {}
            const formData = new FormData(form.value)
            const paramsData = new Map<string, (string | number)[]>()
            for (const [key, value] of formData) {
                const _value = isString(value) ? value : ''
                if (_value) {
                    if (key === 'categor') {
                        finalParams.categor = _value
                    } else if (paramsData.has(key)) {
                        const paramsItem = paramsData.get(key)
                        paramsData.set(key, [...paramsItem!, changeStr(_value)])
                    } else {
                        paramsData.set(key, [changeStr(_value)])
                    }
                }
            }
            if (_target.tagName === 'SELECT' && _target.name === 'categor') {
                finalParams.categor = _target.value
            }
            for (const [key, value] of paramsData) {
                finalParams[key] = value.join(',')
            }
            const findParams = _target.tagName === 'SELECT' && 'categor' in finalParams ? { categor: finalParams.categor } : finalParams
            let page = 'page' in queryParams ? { page: queryParams.page } : {}
            let limit = 'limit' in queryParams ? { limit: queryParams.limit } : {}
            router.push({ query: { ...findParams, ...page, ...limit } })
        }
    }
}

onMounted(() => {
    if (form.value) {
        const activeParams = { ...route.query }
        const value = new Map<string, (string)[]>()

        Object.entries(activeParams).map(_ => {
            return value.set(_[0], (_[1] as string)
                .split(',')
                .map(_ => _.split('__').join(' ')))
        })

        for (const element of form.value.elements) {
            const elemName = element.getAttribute('name') || ''
            if (elemName !== 'categor' && value.has(elemName)) {
                const valueData = value.get(elemName) || []
                if (element.tagName === 'INPUT') {
                    const _input = element as HTMLInputElement
                    switch (_input.type) {
                        case 'number': {
                            _input.valueAsNumber = parseInt(valueData[0])
                            break
                        }
                        case 'checkbox': {
                            if (valueData.includes(_input.value || '')) {
                                _input.checked = true
                            }
                            break
                        }
                    }
                }
            }
        }
        window.dispatchEvent(new CustomEvent('init-active-params'))
    }
})

// ('Проверить введеные данные')
</script>

