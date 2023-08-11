<template>
    <div>
        <div class="pb-3">
            <slot name="title-1">
                <h1 class="truncate mb-2">Категорий</h1>
            </slot>
            <AtomFormSelect name="categor" :data="categorData" v-model="categorValue" />
        </div>
        <div v-if="subcategorData" class="pb-3">
            <slot name="title-2">
                <h1 class="truncate mb-2">Подкатегория</h1>
            </slot>
            <AtomFormSelect name="categor" :data="subcategorData.children" v-model="subcategorValue" />
        </div>
        <div v-if="classData" class="pb-3">
            <slot name="title-2">
                <h1 class="truncate mb-2">Группа</h1>
            </slot>
            <AtomFormSelect name="categor" :data="classData.children" v-model="classValue" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { CategorDataItem } from '~~/type/intex';

interface Props {
    data: {
        type?: string;
        title?: string;
        value: number | string;
        name?: string;
    }[]
    class?: string
}
const props = defineProps<Props>()
const categorValue = ref<string | number>('')
const subcategorValue = ref<string | number>('')
const classValue = ref<string | number>('')
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")

const categorData = computed(() => {
    if (CATEGOR_DATA.value) {
        return CATEGOR_DATA.value.map(_ => ({ ..._, children: [] }))
    }
    return []
})
const subcategorData = computed(() => {
    if (categorValue.value && CATEGOR_DATA.value) {
        return CATEGOR_DATA.value.find(_ => _.id === parseInt(categorValue.value.toString()) || 0)
    }
    return null
})
const classData = computed(() => {
    if (subcategorValue.value && subcategorData.value) {
        return subcategorData.value.children.find((_: { id: number; }) => _.id === parseInt(subcategorValue.value.toString()))
    }
    return null
})
const seleckKey = computed(() => props.data.map(_ => _.value).join('_') || null)
// onMounted(() => window.addEventListener('reset', resetForm))
// onUnmounted(() => window.removeEventListener('reset', resetForm))
// function resetForm() {
//     categorValue.value = null
//     subcategorValue.value = null
//     classValue.value = null
// }
onMounted(() => initSelect())
watch(() => seleckKey.value, (newV) => initSelect())

function initSelect() {
    const _data = props.data
    if (_data[0] && categorValue.value !== _data[0].value) {
        categorValue.value = _data[0].value
    }
    if (_data[1] && subcategorValue.value !== _data[1].value) {
        subcategorValue.value = _data[1].value
    }
    if (_data[2] && categorValue.value !== _data[2].value) {
        classValue.value = _data[2].value
    }
}
</script>