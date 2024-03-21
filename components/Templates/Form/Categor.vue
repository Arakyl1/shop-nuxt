<template>
    <Group class="gap-3" v-if="dataSelect">
        <Group v-for="(item, index) in dataSelect?.filter(_ => _)" :key="getTitle(index)"
            class="gap-2 w-full">
            <Title :tag="'h4'"
            class="truncate"
            :text="getTitle(index)" />
            <Select name="categor"
            :data="item"
            @update:model-value="(e) => addCategor(e, index)"
            :model-value="activeId[index] || undefined"
            class="w-full" />
        </Group>
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

const getTitle = (index:type) => titleForSelectList[index as keyof typeof titleForSelectList]


onMounted(() => updateActiveId(props.data))
watch(() => props.data, () => updateActiveId(props.data))
</script>