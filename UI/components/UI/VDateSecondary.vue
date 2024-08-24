<template>
    <UIVDropdown v-bind="{ iconLeft, text }" ref="dropdown" :active="!!activeDate?.[0]" :triggers="['click']" :position="'left'">
        <template #trigger="{ onClick }">
            <UIVInput
                class="h-8 text-sm"
                :mode="'outline'"
                :model-value="activeDate ? formatDate(activeDate[0], 'DD MM YYYY') : '--.--.----'"
                :class="[$style.Input_Date, $style.Input_Trigger]"
                :icon="'Calendar-primary'"
                :icon-clickable="true"
                :name="inputName"
                v-bind="{ inputAttr, required, disabled, readonly }"
                @change="onChange"
                @click="onClick"
            />
        </template>
        <UIVContainer :class="$style.body" class="p-4" data-date>
            <UIVGroup class="gap-4">
                <UIVInput
                    class="h-8 text-sm"
                    :mode="'outline'"
                    :model-value="activeDate ? formatDate(activeDate[0], 'DD MM YYYY') : '--.--.----'"
                    :class="$style.Input_Date"
                    :icon="'Calendar-primary'"
                    :icon-clickable="true"
                    :name="inputName"
                    :required="required"
                    :input-attr="{ maxlength: 10 }"
                    @change="onChange"
                />
                <Calendar
                    ref="calendar"
                    :masks="{ weekdays: 'WW' }"
                    :class="$style.Calendar"
                    :attributes="[{ highlight: true, dates: activeDate }]"
                    @dayclick="onDayClick"
                >
                    <template #header-title="{ title }">
                        <UIVParagraph :text="title" :weight="'bold'" class="text-capitalize" />
                    </template>
                    <template #header-prev-button="{ move: prev }">
                        <UIVIcon :icon="'Arrow-Primary-Left'" :size="'16_16'" @click="prev" />
                    </template>
                    <template #header-next-button="{ move: next }">
                        <UIVIcon :icon="'Arrow-Primary-Right'" :size="'16_16'" @click="next" />
                    </template>
                </Calendar>
            </UIVGroup>
        </UIVContainer>
    </UIVDropdown>
</template>

<script setup lang="ts">
import { Calendar } from 'v-calendar';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, useForm } from '#imports';

import type { InputProps, useShowProps } from '../../type/index';
import { formatDate, formatDateIsInput, isString } from '../../utils/index';
import type { Props as DropdownProps } from './VDropdown.vue';

export interface Props
    extends useShowProps,
        Pick<DropdownProps, 'text' | 'iconLeft' | 'active' | 'closeDelay'>,
        Pick<InputProps, 'inputAttr' | 'required' | 'disabled' | 'readonly'> {
    value?: Array<string>;
    inputName: string;
}

const props = withDefaults(defineProps<Props>(), { closeDelay: 100 });

defineOptions({
    name: 'DropdownDate'
});

const calendar = ref();
const dropdown = ref();
// const thisElemActive = ref<boolean>(false);
const activeDate = ref(props?.value?.length ? props?.value : null);

// const { addToWatchEventRestore } = useForm();
// addToWatchEventRestore(() => updateStateElem(false));

function onDayClick(e) {
    if (!e) return;
    activeDate.value = [e.noonDate] || '';
    dropdown.value.close();
}

async function onChange({ target }: Event) {
    if (!(target instanceof HTMLInputElement)) return null;
    const newDate = new Date(formatDateIsInput(target.value)).toJSON();
    updateDate(isString(newDate) ? newDate : new Date().toJSON());
}

async function updateDate(date: string) {
    activeDate.value = [date];
    await calendar.value?.move(date);
}
</script>

<style lang="css" module>
.body {
    width: 242px;
}

.Input_Trigger {
    width: 125px;
}

.Input_Date svg {
    width: 20px;
    height: 20px;
    stroke: var(--text-04);
}
</style>
