<template >
    <DatePicker :popover="{ showDelay: 0, hideDelay: 50, placement: 'bottom-end' }">
        <template #default="{ togglePopover, inputValue }">
            <Input
                :type="'text'"
                :name="name"
                :mode="mode"
                :span="span"
                :required="true"
                :icon-clickable="true"
                :pattern="'\\d{4}-\\d{2}-\\d{2}|\\d{2}-\\d{2}-\\d{4}|\\d{2}\.\\d{2}\.\\d{4}'"
                :placeholder="placeholder"
                :model-value="inputValue"
                @icon-click="togglePopover"/>
        </template>
    </DatePicker>
</template>

<script setup>
import Input from "@/components/UI/Input/Input.vue";
// import { Calendar as IconCalendar } from "@element-plus/icons-vue";
import { DatePicker } from 'v-calendar';

const props = defineProps({
    // стиль оформления input
    mode: {
        type: String,
        validator(value) {
            return ['primary', 'secondary', 'outline'].includes(value)
        }
    },
    // имя input, 
    name: {
        type: String
    },
    // анимерованный placeholder вместо базового
    // если была передано значание для базовго placeholder (эт пропс placeholder)
    // то приоритет отдается базовому 
    span: {
        type: String
    },
    // базовый placeholder
    placeholder: {
        type: String
    },
    // сделать поле обязательный
    required: {
        type: Boolean
    }
})

</script>


<style lang="css">
.vc-day {
    min-height: 28px;
}
.vc-day-content{
    width: 24px;
    height: 24px;
    line-height: 24px;
}
</style>