<template>
    <div @input="onCheckValid" @change="onCheckValid" @invalid.capture.prevent="onCheckValid" :class="className['field']">
        <label for="" v-if="label">{{ label }}</label>
        <slot v-bind="{ typeValid, messadge }"></slot>
        <span v-if="spanShow" v-show="messadge"
            :class="[className['span'], typeValid === 'valid' ? 'text-valid' : 'text-invalid']"
            class=" text-xs">{{ messadge }}</span>
    </div>
</template>

<script setup>
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
        type: String
    },
    // текст сообщения если значение не соответствует шаблону,
    // указанному в атрибуте pattern
    patternMismatch: {
        type: String
    },
    // текст сообщения если значение больше максимума, 
    // заданного в атрибуте max
    rangeOverflow: {
        type: String
    },
    // текст сообщения если значение меньше минимума, 
    // заданного в атрибуте min
    rangeUnderflow: {
        type: String
    },
    // текст сообщения если значение не соответствует правилам, 
    // заданным в атрибуте step
    stepMismatch: {
        type: String
    },
    // текст сообщения если значение превышает лимит, 
    // указанный в атрибуте maxlength
    tooLong: {
        type: String
    },
    // текст сообщения если длина значения не достигает минимума,
    // указанного в атрибуте minlength
    tooShort: {
        type: String
    },
    // текст сообщения если элемент соответствует всем ограничениям валидации и,
    //следовательно, считается валидным
    valid: {
        type: String
    },
    // текст сообщения если у элемента есть атрибут required, но сам элемент заполнен не был
    valueMissing: {
        type: String
    },
    spanShow: {
        type: Boolean,
        default: true
    }
})

const messadge = ref(null)
const typeValid = ref(null)
const className = useCssModule()

function onCheckValid({ target }) {
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        const valid = target.validity
        const skipKey = ['customError']

        for (const key in valid) {
            const value = valid[key];
            target.setCustomValidity('')
            if (!skipKey.includes(key)) {
                if (value && key in props && props[key]) {
                    messadge.value = props[key]
                    typeValid.value = key
                    
                   key !== 'valid' ? target.setCustomValidity(props[key]) : ''
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

// onMounted(() => window.addEventListener('validValue', (e) => onValid(e)))
// onMounted(() => window.removeEventListener('validValue', onValid))
</script>

<style lang="css" module>
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