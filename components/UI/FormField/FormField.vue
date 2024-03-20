<template>
    <div @input="onCheckValid" @change="onCheckValid" ref="elem" :class="className['field']">
        <label for="" v-if="label">{{ label }}</label>
        <slot v-bind="{ typeValid, messadge }"></slot>
        <span v-if="spanShow" v-show="messadge"
            :class="[className['span'], typeValid === 'valid' ? 'text-valid' : 'text-invalid']"
            class=" text-xs">{{ messadge }}</span>
    </div>
</template>

<script setup>
import { INPUT_VALIDITY_BASE } from '@/common/C'

const props = defineProps({
    label: {
        type: String,
    },
    mode: {
        type: String,
        validator(value) {
            return ['primary', 'secondary'].includes(value)
        }
    },
    // текст сообщения если пользователь ввел значение
    // которое браузер не может преобразовать
    badInput: {
        type: String,
        default: INPUT_VALIDITY_BASE.BAD_INPUT
    },
    // текст сообщения если значение не соответствует шаблону,
    // указанному в атрибуте pattern
    patternMismatch: {
        type: String,
        default: INPUT_VALIDITY_BASE.PATTERN_MISMATCH
    },
    // текст сообщения если значение больше максимума, 
    // заданного в атрибуте max
    rangeOverflow: {
        type: String,
        default: INPUT_VALIDITY_BASE.RANGE_OVERFLOW
    },
    // текст сообщения если значение меньше минимума, 
    // заданного в атрибуте min
    rangeUnderflow: {
        type: String,
        default: INPUT_VALIDITY_BASE.RANGE_UNDERFLOW
    },
    // текст сообщения если значение не соответствует правилам, 
    // заданным в атрибуте step
    stepMismatch: {
        type: String,
        default: INPUT_VALIDITY_BASE.STEP_MISMATCH
    },
    // текст сообщения если значение превышает лимит, 
    // указанный в атрибуте maxlength
    tooLong: {
        type: String,
        default: INPUT_VALIDITY_BASE.TOO_LONG
    },
    // текст сообщения если длина значения не достигает минимума,
    // указанного в атрибуте minlength
    tooShort: {
        type: String,
        default: INPUT_VALIDITY_BASE.TOO_SHORT
    },
    // текст сообщения если элемент соответствует всем ограничениям валидации и,
    //следовательно, считается валидным
    valid: {
        type: String,
    },
    // текст сообщения если у элемента есть атрибут required, но сам элемент заполнен не был
    valueMissing: {
        type: String,
        default: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    spanShow: {
        type: Boolean,
        default: true
    }
})

const messadge = ref(null)
const typeValid = ref(null)
const className = useCssModule()
const elem = ref()

function onCheckValid(e) {
    e.preventDefault()
    const _target = e.target
    if (_target instanceof HTMLInputElement || _target instanceof HTMLTextAreaElement) {
        const valid = _target.validity
        const skipKey = ['customError']

        for (const key in valid) {
            const value = valid[key];
            _target.setCustomValidity('')
            if (!skipKey.includes(key)) {
                if (value && key in props && props[key]) {
                    messadge.value = props[key]
                    typeValid.value = key
                    
                //    key !== 'valid' ? _target.setCustomValidity(props[key]) : ''
                    return
                }

                resetValidData()
            }
        }
    }
}

function resetValidData(params) {
    messadge.value = null
    typeValid.value = null
}

function checkMessage() {
    return props.badInput || props.patternMismatch || props.rangeOverflow || props.rangeUnderflow || props.stepMismatch || props.tooLong || props.tooShort || props.valueMissing || props.valid || false
}

onMounted(() => checkMessage() && elem.value ? elem.value.addEventListener('invalid', onCheckValid, { capture: true, }) : null)
onMounted(() => checkMessage() && elem.value ? elem.value.removeEventListener('invalid', onCheckValid) : null)
</script>

<style lang="css" module>
/* purgecss ignore */
.field {
    position: relative;
}

.span {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(100%);
}
</style>