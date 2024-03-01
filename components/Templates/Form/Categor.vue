<template>
    <Group class="gap-y-3">
        <template v-if="dataSelect">
            <template v-for="(item,index) in dataSelect" :key="index">
                <Group class="gap-y-2 w-full" v-if="item">
                    <Title :tag="'h4'" class="truncate" :text="titleForSelectList[index as keyof typeof titleForSelectList]"/>
                    <Select
                    name="categor"
                    :data="item"
                    @update:model-value="(e) => addCategor(e, index)"
                    :model-value="activeId[index] || undefined"
                    class="w-full" />
                </Group>
            </template>
          </template>
    </Group>
</template>


<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Select from "@/components/UI/Select/SelectRelative.vue";
import selectCategorHelper from '@/utils/selectCategorHelper'

interface Props {
    data: number[]
    class?: string
}
const props = defineProps<Props>()
const { activeId, dataSelect, updateActiveId, resetSelect, addCategor } = selectCategorHelper('id')

const titleForSelectList = {
    0: 'Категория',
    1: 'Подкатегория',
    2: 'Группа'
}


onMounted(() => updateActiveId(props.data))
watch(() => props.data, () => updateActiveId(props.data))
</script>