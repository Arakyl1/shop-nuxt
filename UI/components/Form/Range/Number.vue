<template>
    <Flex class="gap-4" @input="onInput">
        <Input
            v-model="value.from"
            type="number"
            :input-attr="{
                step: data.to?.step || 1,
                min: data.to?.min,
                max: data.from?.max
            }"
            :name="data.from.name"
            :placeholder="data.from.placeholder"
            :class="$style.item"
            :data-to="data.to.modelValue || false"
            :span="data.from?.span"
        />
        <Input
            v-model="value.to"
            type="number"
            :placeholder="data.to.placeholder"
            :input-attr="{
                step: data.to?.step || 1,
                min: value.from > 0 ? value.from : data.to?.min,
                max: data.to?.max
            }"
            :name="data.to.name"
            :class="$style.item"
            :data-from="data.from.modelValue || false"
            :span="data.to?.span"
        />
    </Flex>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import type { InputProps } from '../../../type/index';
import Input from '../Input.vue';
import Flex from '../../Container/Flex.vue';

type InputData = Pick<InputProps, 'readonly' | 'required' | 'disabled' | 'mode' | 'modelValue' | 'name' | 'placeholder' | 'span'> & {
    name: string;
    min?: number;
    max?: number;
    step?: number;
    value?: number;
};

export interface Props {
    data: {
        from: InputData;
        to: InputData;
    };
}

const props = defineProps<Props>();
const emit = defineEmits(['change']);
const value = ref<{ from: number; to: number }>({ from: props.data.from.min || 0, to: props.data.to.max || 0 });

function onInput() {
    emit('change', value.value);
}

watch(
    () => props.data.from.value,
    () => {
        value.value.from = props.data.from.value;
    }
);
watch(
    () => props.data.to.value,
    () => {
        value.value.to = props.data.to.value;
    }
);
</script>

<style lang="css" module>
.item {
    width: calc(100% - 0.5rem);
}
</style>
