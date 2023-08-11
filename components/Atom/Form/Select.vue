<template>
    <select class="p-2 rounded-md text-gray-300 w-full focus-visible:outline-none"
        :value="selectValue"
        @change="(e) => $emit('update:value', (e.target as HTMLSelectElement).value)">
        <option class="text-gray-300"></option>
        <template v-for="item in data" :key="item.id">
            <slot>
                <option class="text-gray-300" :value="item.id">
                    {{ item.value }}
                </option>
            </slot>
        </template>
    </select>
</template>
<script setup lang="ts" generic="T extends { name: string, id: number, value: string }">

const props = defineProps<{ data: T[], valueAct: string | number }>()
const emit = defineEmits<{
    (event: "update:value", args: string): void
}>()
const selectValue = ref<number | string>('')

onMounted(() => {
    if (selectValue.value !== props.valueAct) {
        selectValue.value = props.valueAct
        emit('update:value', props.valueAct?.toString())
    }
})
onUpdated(() => {
    if (selectValue.value !== props.valueAct) {
        selectValue.value = props.valueAct
    }
})
</script>