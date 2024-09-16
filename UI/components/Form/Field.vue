<template>
    <div ref="elem" :class="$style.Field" @input="onCheckValid" @change="onCheckValid">
        <slot name="label">
            <Paragraph v-if="label" :tag="'label'" :weight="''" :color="'text-03'" :size="'xs'">
                {{ label }}
                <span v-if="required" class="color-error-500">*</span>
            </Paragraph>
        </slot>
        <slot v-bind="{ typeValid, massage }"/>

        <slot name="footer" v-bind="{ typeValid, massage }">
            <Paragraph
                v-if="spanShow"
                v-show="massage"
                :tag="'span'"
                :class="[$style.Span, typeValid === 'valid' ? 'color-valid' : 'color-error-500']"
                :weight="'medium'"
                :color="'text-03'"
                :size="'xs'"
                :text="massage"
            />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, t } from '#imports';
import Paragraph from "../Paragraph/Text.vue";

interface Props {
    label?: string;
    mode?: 'primary' | 'secondary';
    badInput?: string;
    patternMismatch?: string;
    rangeOverflow?: string;
    rangeUnderflow?: string;
    stepMismatch?: string;
    tooLong?: string;
    tooShort?: string;
    customError?: string;
    valid?: string;
    valueMissing?: string;
    spanShow?: boolean;
    required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    spanShow: false,
    badInput: t('INPUT_VALIDITY_BASE.BAD_INPUT'),
    patternMismatch: t('INPUT_VALIDITY_BASE.PATTERN_MISMATCH'),
    rangeOverflow: t('INPUT_VALIDITY_BASE.RANGE_OVERFLOW'),
    rangeUnderflow: t('INPUT_VALIDITY_BASE.RANGE_UNDERFLOW'),
    stepMismatch: t('INPUT_VALIDITY_BASE.STEP_MISMATCH'),
    tooLong: t('INPUT_VALIDITY_BASE.TOO_LONG'),
    tooShort: t('INPUT_VALIDITY_BASE.TOO_SHORT'),
    valueMissing: t('INPUT_VALIDITY_BASE.VALUE_MISSING')
});

const massage = ref(null);
const typeValid = ref(null);
const elem = ref();

function onCheckValid(e) {
    e.preventDefault();
    const _target = e.target;
    if (_target instanceof HTMLInputElement || _target instanceof HTMLTextAreaElement) {
        const valid = _target.validity;
        const skipKey = [''];

        for (const key in valid) {
            const value = valid[key];
            if (!skipKey.includes(key)) {
                if (value && key in props && props[key]) {
                    massage.value = props[key];
                    typeValid.value = key;
                    return;
                }
            }
            if (key === 'valid' && valid) {
                resetValidData();
            }
        }
    }
}

function resetValidData() {
    massage.value = null;
    typeValid.value = null;
}

function checkMessage() {
    return (
        props.badInput ||
        props.patternMismatch ||
        props.rangeOverflow ||
        props.rangeUnderflow ||
        props.stepMismatch ||
        props.tooLong ||
        props.tooShort ||
        props.valueMissing ||
        props.customError ||
        props.valid ||
        false
    );
}

onMounted(() => (checkMessage() && elem.value ? elem.value.addEventListener('invalid', onCheckValid, { capture: true }) : null));
onBeforeUnmount(() => (checkMessage() && elem.value ? elem.value.removeEventListener('invalid', onCheckValid) : null));
</script>

<style lang="css" module>
.Field {
    position: relative;
}

.Field > label {
    display: inline-block;
    margin-bottom: 4px;
}

.Field > label > span {
    display: inline-block;

    /* transform: translateY(-1px); */
}

.Field > span:last-child {
    display: inline-block;
    margin-top: 4px;
}

/* .Span {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
} */
</style>
