<!-- При открытие этого select данные блок с данными, не будет отображаться абсолютно кнопки,
    а будет встроен в констекст сразу после кнопки.
    Пока оставил так, в дальнейшем чуть переделаю,
    чтобы можно было менять между абсолютно и относительным позиционированием
-->
<template>
    <div
    :data-select="instanse?.uid"
    :data-uid="instanse?.uid"
    class="relative"
    ref="body"
    :class="{ 'gap-3': isActive }" tabindex="-1" >
        <div class="w-full" ref="trigger">
            <slot name="trigger" v-bind="{ activeOption, isActive, onClick }">
                <Button :text="activeOption?.value"
                :mode="'outline'"
                :icon-transition="'select-icon'"
                :icon-right="{ icon: isActive ? 'arrow' : 'arrow', size: '25_25' }"
                class="text-base w-full truncate"
                :class="[ activeOption?.value ? 'justify-between' : 'justify-end']"
                :style="{ padding: '0rem 0.25rem 0 0.75rem' }"
                @click="onClick"/>
            </slot>
        </div>

        <Transition :name="animated">
            <div ref="container"
            :class="className['body']" 
            :style="{ height: isActive ? size.h : 0 }"
            class="w-full"
            :data-select-position="position">
                <slot v-if="$slots.default" v-bind="{ isActive }"></slot>
                <Card v-else
                mode="outline"
                :container="'xs'"
                :class="className['card']"
                class="scrollbar-v1 ver">
                    <Group
                    @click="changeActive"
                    role="listbox"
                    tabindex="0"
                    class="gap-1">
                        <p v-for="item in data"
                        role="option"
                        :aria-selected="item.id === modelValue"
                        :aria-controls="item.id"
                        :key="item?.id"
                        :data-select-item="item?.id"
                        class="pointer text-base">{{ item?.value }}</p>
                    </Group>
                </Card>
            </div>
        </Transition>

        <select ref="select" aria-hidden="true" :name="name" hidden :value="activeOptionId || null">
            <option v-for="item in data" :key="item.id" :value="item.id || item.value"></option>
        </select>
    </div>
</template>

<script setup>
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Group from "@/components/UI/Group/Group.vue";
import { watchEvent, initSize, checkThisComponent } from "@/utils/elemHelper";
import { isNumber, isNumeric, getScreenSize } from '@/utils/other'
import useShow from '@/composables/useShow'

const props = defineProps({
    active: {
        type: Boolean,
        default: true
    },
    disabled: { // сделать недоступныи 
        type: Boolean,
        default: false
    },
    // Select будет активен всегда
    always: Boolean,
    autoClose: {
        type: Boolean,
        default: true
    },
    delay: {
        type: Number,
        default: 0
    },
    // Задержка подсказки перед ее исчезновением
    closeDelay: {
        type: Number,
        default: 0
    },
    // Типы событий которые будут активировать select
    // Список событий 'click'
    triggers: {
        type: Array,
        default: ['click'],
    },
    // тип Select
    mode: {
        type: String,
        validator(value) {
            return ['checkdox'].includes(value)
        }
    },
     // Popover будет иметь анимацию
    // По умолчанию затухания
    animated: {
        type: String,
        default: 'fade'
    },
    // Popover будет иметь анимацию для мобильных
    // По умолчанию затухания
    animatedMobaile: {
        type: String,
        default: 'transY'
    },
    // данные select
    // данные желательно должны быть в формате [{ id: Number, value: String },{ id: Number, value: String }]
    data: {
        type: Object,
        default: [],
    },
    // выбранный по умолчанию
    modelValue: {
        type: [Number, String],
    },
    name: {
        type: String
    }
    
})

const emit = defineEmits(['update:modelValue'])

const className = useCssModule()
const select = ref(null)
const trigger = ref(null)
const body = ref(null)
const container = ref(null)
const instanse = ref()
const { size, refrech } = initSize(container)
//position = 'top'|'bottom'|'right'|'left'
const position = ref('bottom')


const watchElement = watchEvent('data-select', instanse, () => close())
const { isActive, open, close } = useShow(props, watchElement)
const activeOptionId = ref(props.modelValue || props.data[0]?.id)


const activeOption = computed(() => {
    if (props.data.length && activeOptionId.value) {
        return props.data.find(_ => _.id === activeOptionId.value) || null
    }
    return null
})

onMounted(() => {
    if (trigger.value) {
        window.addEventListener('scroll', onEvent)
    }
    updateOptionId(props.modelValue)
    instanse.value = getCurrentInstance()
})

onBeforeUnmount(() => {
    if (trigger.value) {
        window.removeEventListener('scroll', onEvent)
    } 
})


// watch(() => activeOptionId.value, (newV, oldV) => {
//     if (newV !== oldV) {
//         close()
//     }
// })

watch(() => props.modelValue, (newV, oldV) => {
    if (newV !== oldV ) {
        updateOptionId(newV)
    }
})

watch(() => props.data.length, () => {
    nextTick(() => refrech())
})


function changeActive({ target }) {
    if (isActive.value && target instanceof Element) {
        const _target = target.closest('[data-select-item]')
        if (_target) {
            const value = _target.dataset.selectItem
            
            close()
            updateOptionId(value)
            emit('update:modelValue', activeOptionId.value)
            nextTick(() => sendEvent())
        }
    }
}

function updateOptionId(newVal) {
    activeOptionId.value = newVal && isNumber(newVal) ?
        newVal : isNumeric(newVal) ?
        Number(newVal) : newVal
}

function onClick({ target }) {
    if (!isActive.value) {
        countingPositions(trigger.value)
        open()
    } else {
        close()
    }
}

function countingPositions(elem) {
    if (elem instanceof HTMLElement && window) {
        const rect = elem.getBoundingClientRect()
        const sizeS = getScreenSize(window)
        const right = sizeS.width - rect.right
        const bottom = sizeS.height - rect.bottom
        const value = parseFloat(size.h) + 10
        position.value = bottom > value ? 'bottom' :
            rect.top > value ? 'top' :
            right > value ? 'right' :
            rect.left > value ? 'left' : 'bottom'
    }
}

function onEvent() {
    countingPositions(trigger.value) 
}

function sendEvent() {
    if (select.value instanceof HTMLElement && checkThisComponent(body.value, unref(instanse))) {
        const event = new Event('change', { bubbles: true })
        select.value.dispatchEvent(event)
    }
}
</script>

<style lang="css" module>
/* purgecss ignore */
.body {
    overflow: hidden;
    position: absolute;
    transition: var(--transitions--sm);
    z-index: 200;
    max-height: 200px;
    --value-indent: 0.75rem;
    border-radius: var(--rounded-lg);
    box-shadow: 0 2px 3px -2px var(--gray-300), 0 2px 3px -2px var(--gray-300);
}
.trigger {
    --color-readonly: var(--black-500);
    --fill-readonly: var(--black-500);
}
.card {
    height: 100%;
    overflow-y: scroll;
}
.body[data-select-position='bottom'] {
    left: 0;
    top: calc(100% + var(--value-indent));
}
.body[data-select-position='right'] {
    left: calc(100% + var(--value-indent));
    top: 50%;
    transform: translateY(-50%);
}
.body[data-select-position='top'] {
    left: 0;
    top: calc(0% - var(--value-indent));
    transform: translateY(-100%);
}
</style>

