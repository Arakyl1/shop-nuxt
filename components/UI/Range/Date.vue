<template>
    <DatePicker v-model.range="range" :input-debounce="500">
        <template #default="{ inputValue,  togglePopover }">
            <Button :mode="'outline-2'" :rounded="'lg'" :class="className['bt']"
                @click="() => togglePopover()">
                <Icon :name="'calendar-value'" />
                <Paragraph :text="changeValue(inputValue)" class="text-medium text-dark-700" :size="'sm'" />
            </Button>
        </template>
    </DatePicker>
</template>

<script setup>
import Button from "@/components/UI/Button/index.vue";
import Paragraph from "@/components/UI/Paragraph/Paragraph.vue";
import { DatePicker } from 'v-calendar';
import Icon from '@/components/Icons-component.vue'

const props = defineProps({
    value: {
        type: Object,
        default: {
            start: new Date(Date.now() - 1209600000),
            end: new Date(),
        }
    }
})

const emit = defineEmits(['update:value'])

const className = useCssModule()
const range = ref(props.value);

watch(() => props.value, (newV) => {
    range.value = newV
})

function changeValue(value) {
    emit('update:value', value)
    return changeDate(value)
}

function changeDate(date) {
    const mod = (d) => d.split('.').slice(0, 2).join('.')
    return `${mod(date.start)} - ${mod(date.end)}`
}
</script>

<style lang="css" module>
.bt {
    padding: 0.75rem 0.5rem;
}

.bt>span {
    display: flex;
    flex-wrap: nowrap;
    gap: 0 0.4375rem;
    align-items: center;
}
</style>