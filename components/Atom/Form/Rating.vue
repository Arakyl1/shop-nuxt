<template>
    <div class="flex" @click.stop="addNumberStar">
        <slot name="input">
            <input type="number" hidden :name="inputName" v-model.number="starValue" ref="input">
        </slot>
        <slot v-bind="{ starValue }">
            <CreateIcon v-for="item in 5" :key="item" :name="name" class="item__star"
                :att="{ class: starValue && starValue >= item ? style.active : style.deactive }" :data-star="item" />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { default as CreateIcon, type NameIcon } from "@/content/icons/create";
import { RecordOption } from '~~/type/intex';


const props = withDefaults(defineProps<{
    quantityStar?: number | undefined
    style?: { base?: string, active: string, deactive: string },
    reset?: boolean,
    inputName?: string,
    name?: `${NameIcon}_${number}_${number}`
}>(), {
    style() {
        return {
            active: 'stait-active--fill',
            deactive: 'stait-deactive--fill'
        }
    },
    name: 'star_20_20',
    reset: false,
    inputkey: '_'
})

const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()


const starValue = ref<number | undefined>(undefined)
const input = ref<HTMLInputElement | null>(null)

onBeforeMount(() => {
    if (props.quantityStar && props.quantityStar !== starValue.value) {
        starValue.value = props.quantityStar
    }
})

onMounted(() => {
    window.addEventListener('reset', resetForm)
    window.addEventListener('init-active-params', initParams)

})
onUnmounted(() => {
    window.removeEventListener('reset', resetForm)
    window.removeEventListener('init-active-params', initParams)
})

type DatasetKey = 'star'
function addNumberStar({ target }: MouseEvent): void {
    
    if (target instanceof Element) {
        const _target = target.closest('[data-star]')

        interface ModifiedElement extends Element {
            dataset: DOMStringMap & RecordOption<DatasetKey, string>
        }
        if (_target) {
            const checkElem = _target as ModifiedElement
            const number: number = +checkElem.dataset.star
            if (number) {
                starValue.value = number
                emit('numberStar', number)
                setTimeout(() => {
                    if (input.value) {
                        const initEvent = new Event('input', { bubbles: true })
                        input.value.dispatchEvent(initEvent)
                    }
                }, 0);
            }
        }
    }
}

function resetForm() {
    starValue.value = undefined
}
function initParams() {
    if (input.value) {
        const value = input.value.value
        if (value && starValue.value?.toString() !== value) {
            starValue.value = parseInt(value)
        }
    }
}
</script>