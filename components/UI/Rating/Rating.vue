<template>
    <div class="flex justify-start gap-x-2"
    ref="ranting"
    :data-ranting="instanse?.uid"
    :data-uid="instanse?.uid"
    :tabindex="-1">
        <input type="text"
            ref="input"
            :name="name"
            :value="oldValue"
            :required="required"
            v-bind="required ? { pattern: `[1-${star}]`} : {}"
            @input="onInput"
            @reset="onReset"
            :class="className['input']"/>
        <svg v-for="item in star" :key="item"
            xmlns="http://www.w3.org/2000/svg"
            :data-star="item"
            :width="width" :height="width" viewBox="0 0 23 23" fill="none"
            :class="{ 'pointer': !readonly }">
            <defs>
                <linearGradient :id="instanse?.uid + '-fill-' + item" x1="0" y1="0" x2="100%" y2="0">
                    <stop :class="className['start']" :offset="getOffset(item, ratValue) + '%'"/>
                    <stop :class="className['end']" :offset="getOffset(item, ratValue) + '%'"/>
                    <stop :class="className['end']" :offset="getOffset(item, ratValue, 'end') + '%'"/>
                </linearGradient>
            </defs>
            <path :fill="`url(#${instanse?.uid}-fill-${item})`" d="M10.4749 0.859314C10.8391 0.106944 11.9109 0.106945 12.2751 0.859315L14.9687 6.42357C15.1127 6.72108 15.3944 6.9282 15.7214 6.97693L21.7783 7.87964C22.5921 8.00094 22.9194 8.99842 22.3356 9.57825L17.9299 13.9538C17.6995 14.1826 17.5945 14.509 17.6484 14.8292L18.6845 20.9893C18.8224 21.8089 17.9583 22.4292 17.2258 22.0364L11.8476 19.1525C11.5524 18.9942 11.1976 18.9942 10.9024 19.1525L5.52419 22.0364C4.79172 22.4292 3.9276 21.8089 4.06546 20.9893L5.10162 14.8292C5.15548 14.509 5.05053 14.1826 4.82015 13.9538L0.414439 9.57825C-0.169394 8.99842 0.157849 8.00094 0.971701 7.87964L7.02863 6.97693C7.35555 6.9282 7.63728 6.72108 7.7813 6.42357L10.4749 0.859314Z" />
        </svg>
    </div>
</template>

<script setup lang="ts">

export interface Props {
    // name для импута, что бы не заводить под каждый параметр формы отдельную переменую
    // проще сделать чтобы данные локально заносились в input, а затем через new FormData()
    // достать все значения элементов формы у которых проставлено имя и установлено значение
    name?: string,
    value?: string | number,
    // сделать чтобы звезды были доступны только для просмотра
    readonly?: boolean,
    // количество звезд
    star?: number,
     // шаг огругления рейтинга, по умолнанию десятичное
    // в таком случае звезда будет закрашиваться с шагом в 10%
    // чтобы сразу всю закрашивать уставить значение step на единицу(1)
    // при увеличение step шаг будет уменьшаться
    step?: number,
    // размер иконки
    width?: number,
    required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    value: '',
    star: 5,
    step: 10,
    width: 23,
    required: false,
    readonly: true
})


const ratValue = ref<number | string>(props.value)
const oldValue = ref<number | string>(props.value)
const ranting = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const instanse = getCurrentInstance()
const className = useCssModule()

onMounted(() => {
    if (!props.readonly && ranting.value instanceof HTMLElement) {
        ranting.value.addEventListener('mouseenter', onMouseenter)
        ranting.value.addEventListener('mousemove', onMousemove)
        ranting.value.addEventListener('mouseleave', onMouseleave)
        ranting.value.addEventListener('click', onClick)
    }
})

onBeforeUnmount(() => {
    if (!props.readonly && ranting.value instanceof HTMLElement) {
        ranting.value.removeEventListener('mouseenter', onMouseenter)
        ranting.value.removeEventListener('mousemove', onMousemove)
        ranting.value.removeEventListener('mouseleave', onMouseleave)
        ranting.value.removeEventListener('click', onClick)
    }
    
})

watch(() => oldValue.value, (newV) => {
    if (Number(newV) > props.star) {
        updateValue(props.star)
        updateRatValue(props.star)
        return
    }
    if (newV !== ratValue.value) {
        updateRatValue(newV)
    }
})

function toFixed(num: number) {
    return Number(num.toFixed(2))
}

function getOffset(num: number | string, value: number |string, stop = 'start') {
    const dif = toFixed(Number(value) - Number(num))
    return dif >= 0 ? 100 : (dif <= -1 ? 0 : (stop === 'end' ? toFixed(Math.abs(dif) * 100) : toFixed((1 + dif) * 100)))
}

function onMouseenter({ target }: MouseEvent) {
    if (target instanceof Element) {
        updateValue(ratValue.value)
    }
}

function onMousemove({ target, clientX }: MouseEvent) {
    if (target instanceof Element) {
        const elem = target.closest('[data-star]')
        if (elem instanceof HTMLElement || elem instanceof SVGElement) {
           const value = parseInt(elem.dataset.star!)
           const rect = elem.getBoundingClientRect()
           const difX = clientX - rect.left
           const res = (value - 1) + (Math.round(Number((props.step / rect.width) * difX)) / props.step)
           if (res >= 0 && res <= 100 ) {
                updateRatValue(props.star - res > 0.3 ? res : props.star)
           }
        }
    }
}

function onMouseleave({ target }: MouseEvent) {
    if (target instanceof Element) {
        updateRatValue(oldValue.value)
    }
}

function onClick({ target }: MouseEvent) {
    if (target instanceof Element) {
        updateValue(ratValue.value)
        nextTick(() => {
            setCustomEvent()
        })
    }
}

function setCustomEvent() {
    if (input.value instanceof HTMLInputElement) {
        const event = new Event('change', { bubbles: true })
        input.value.dispatchEvent(event)
    }
}

function checkValidValue(value: number | string) {
   return Number(value) <= props.star ? Number(value) : props.star
}

function updateRatValue(value: number | string) {
    ratValue.value = checkValidValue(value)
}

function updateValue(value: number | string) {
    oldValue.value = checkValidValue(value)    
}

function onInput({ target }: Event) {
    if (target instanceof HTMLInputElement) {
        updateValue(toFixed(Number(target.value)))
    } 
}

function onReset() {
    updateValue(0)
}

</script>

<style lang="css" module>
.input {
    visibility: hidden;
    position: absolute;
    z-index: -100;
}
.start {
    stop-color: var(--rating-star-active);
    transition: var(--rating-star-transition);
}
.end {
    stop-color: var(--rating-star-default);
    transition: var(--rating-star-transition);
}
</style>