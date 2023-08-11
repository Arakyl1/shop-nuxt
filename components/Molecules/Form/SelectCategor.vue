<template>
    <div>
        <div class="pb-3">
            <slot name="title-1">
                <h1 class="truncate mb-2">Категорий</h1>
            </slot>
            <AtomFormSelect name="categor" :data="categorData" :valueAct="props.data[0] ? props.data[0].value : 0" @update:value="(e) => {categorValue = e, subcategorValue = null,  classValue = null}" />
        </div>
        <div v-if="subcategorData" class="pb-3">
            <slot name="title-2">
                <h1 class="truncate mb-2">Подкатегория</h1>
            </slot>
            <AtomFormSelect name="categor" :data="subcategorData.children" :valueAct="props.data[1] ? props.data[1].value : 0" @update:value="(e) => { subcategorValue = e, classValue = null}"/>
        </div>
        <div v-if="classData" class="pb-3">
            <slot name="title-2">
                <h1 class="truncate mb-2">Группа</h1>
            </slot>
            <AtomFormSelect name="categor" :data="classData.children" :valueAct="props.data[2] ? props.data[2].value : 0" @update:value="(e) => classValue = e"/>
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
const categorValue = ref<string | null>(null)
const subcategorValue = ref<string | null>(null)
const classValue = ref<string | null>(null)
const CATEGOR_DATA = useState<CategorDataItem[] | null>("CATEGOR_DATA_APP")

const categorData = computed(() => CATEGOR_DATA.value ? CATEGOR_DATA.value.map(_ => ({ ..._, children: [] })) : [])
const subcategorData = computed(() => categorValue.value && CATEGOR_DATA.value ? CATEGOR_DATA.value.find(_ => _.id === parseInt(categorValue.value || '') || 0) : null)
const classData = computed(() => subcategorValue.value && subcategorData.value ? subcategorData.value.children.find(_ => _.id === parseInt(subcategorValue.value || '') || '') : null)

// onMounted(() => window.addEventListener('reset', resetForm))
// onUnmounted(() => window.removeEventListener('reset', resetForm))
// function resetForm() {
//     categorValue.value = null
//     subcategorValue.value = null
//     classValue.value = null
// }
</script>