<template>
    <select 
        @change="selectChahge($event)" :value="valueD.toString()">
        <option disabled value="" class="text-gray-500">Sel..</option>
        <option v-for="item in data" :key="item" :value="item" class="text-gray-500">{{ item }}</option>
    </select>
</template>

<script setup lang="ts">
const props = defineProps<{
    data?: PropertyKey[],
    valueD: number
}>()
const emit = defineEmits<{
    (e: 'select-number', value: string): void
}>()


function selectChahge({ target }: Event) {
    const _target = target as HTMLSelectElement
    emit('select-number', _target.value)
}
</script>