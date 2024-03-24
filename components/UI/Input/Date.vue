<template >
    <DatePicker :popover="{ showDelay: 0, hideDelay: 50, placement: 'bottom-end' }">
        <template #default="{ togglePopover, inputValue }">
            <Input
            :type="'text'"
            :icon-clickable="true"
            :icon="{ 'icon': 'calendar' }"
            :model-value="inputValue"
            v-bind="{ ...props }"
            @icon-click="togglePopover"/>
        </template>
    </DatePicker>
</template>

<script setup lang="ts">
import { default  as Input, Props as InputProps } from "@/components/UI/Input/Input.vue";
import { DatePicker } from 'v-calendar';

interface Props extends Pick<InputProps, 'mode'|'name'|'span'|'placeholder'|'required'|'autocomplete'|'disabled'|'pattern'> {}

const props = withDefaults(defineProps<Props>(), { 
    autocomplete: 'bday',
    pattern: '\\d{4}-\\d{2}-\\d{2}|\\d{2}-\\d{2}-\\d{4}|\\d{2}\.\\d{2}\.\\d{4}'
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