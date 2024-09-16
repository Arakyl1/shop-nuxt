<!-- eslint-disable vue/no-unused-vars -->
<template>
    <Dropdown v-bind="{ triggers, position, mode: dropdownMode }" :class="[$style.Select, { [`SelM_${mode}`]: mode }]">
        <template #trigger="{ isActive, onClick, close, onFocus }">
            <Input
data-trigger
                class="text-sm h-8"
                :model-value="selectActiveOption?.name"
                :icon="{ icon: isActive ? defaultAttrforUI.selectTriggerIcon : defaultAttrforUI.selectTriggerIconActive, size: '24_24' }"
                :icon-size="'28_28'"
                :placeholder="placeholder"
                :mode="'outline'"
                v-bind="{ ...inputProps }"
                @focus.capture="onFocus"
                @click="isActive ? close() : onClick()"
            />
        </template>
        <template #default="{ close }">
            <Card :mode="'primary'"  class="p-2" :onchange="onChange(close)" :onclick="onChange(close)">
                <Group list-checkbox class="gap-1">
                    <Radio
                        v-for="item in data"
                        :key="item.id"
                        :text="item.name"
                        :direction="'left'"
                        class="h-8.5 px-2 w-full justify-between"
                        :input-attr="{
                            id: item.id.toString(),
                            name: inputName,
                            value: item.id,
                            tabindex: 0,
                            checked: selectActiveOption?.id === item.id
                        }"
                        v-bind="{ labelOpt }"
                        :label-opt="{ 'mode': 'blue-hover', rounded: 'lg' }"
                        :mode="'secondary'"   
                    />
                </Group>
            </Card>
        </template>
    </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from './Dropdown.vue';
import type { Props as PropsDropdown } from './Dropdown.vue';
import Group from '../Block/Group.vue';
import Card from '../Block/Card.vue';
import Radio from './Radio.vue';
import type { Props as RadioProps } from './Radio.vue';
import Input from './Input.vue';
import type { InputProps , defaultAttrforUI, type SelectMode } from '../../type/index';
 
import { nextTick, ref, useForm } from '#imports';


export interface Props extends Pick<PropsDropdown, 'triggers' | 'position'>, Pick<RadioProps, 'labelOpt'> {
    data: Array<{ id: number | string; name: string | number }>;
    inputName: string;
    defaultValue?: boolean;
    mode?: SelectMode;
    placeholder?: string;
    inputProps?: InputProps;
    dropdownMode?: PropsDropdown['mode']
}

const props = withDefaults(defineProps<Props>(), { defaultValue: true, triggers: () => ['click', 'focus'] });
const emit = defineEmits(['upadate:active-option']);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { addToWatchEventRestore } = useForm();
const selectActiveOption = ref<Props['data'][0] | null>(props.defaultValue ? props.data?.[0] : null);

 
function onChange(closeSelect: () => any) {
    return function ({ target }: Event) {
        if (!(target instanceof HTMLElement)) return;
        const radio = target.closest('[data-radio ]')?.querySelector(`input[type='radio']`);
        if (!radio) return null;
        const idOption = radio.id;
        selectActiveOption.value = props.data.find((_) => _.id.toString() === idOption) || null;
        nextTick(() => closeSelect());
        emit('upadate:active-option', selectActiveOption.value);
    };
}

</script>

<style lang="css" module>

.scroll {
    max-height: 220px;
}

.Select [dropdown-body] {
    z-index: 50;
    width: inherit;
}

.Select [data-trigger] {
    cursor: pointer;
    pointer-events: all;
}

.Select [data-trigger] input {
    pointer-events: none;
}
</style>
