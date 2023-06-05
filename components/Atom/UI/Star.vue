<template>
    <div class="flex" 
    @click="addNumberStar" >
        <slot v-bind="{ starValue }">
            <input type="number" hidden name="ranting.gte" :value="starValue">
        </slot>
        <IconStar v-for="item in 5" :key="item"
        :data-star="item"
        :class="[style.base, starValue && starValue >= item ? style.active : style.deactive]"/>
    </div>
</template>

<script setup lang="ts">

import { RecordOption } from '~~/type/intex';


const props = withDefaults(defineProps<{
    quantityStar?: number | undefined
    style?: { base: string, active: string, deactive: string },
    reset?: boolean
}>(), {
    style() {
        return {
            base: 'item__star group-[.is-icon-small]:sm:scale-75 group',
            active: 'stait-active--fill',
            deactive: 'stait-deactive--fill'
        }
    },
    reset: false
})

const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()

const starValue = ref<number|undefined>(props.quantityStar ? props.quantityStar : undefined)

type DatasetKey = 'star'
function addNumberStar({ target }: MouseEvent): void {
    interface ModifiedHTMLElement extends HTMLElement {
        dataset: DOMStringMap & RecordOption<DatasetKey, string>
    }
    const elementTarget = target as HTMLElement
    const element = elementTarget.closest('.item__star') as ModifiedHTMLElement
    const number: number = +element.dataset.star
    if (number) {
        starValue.value = number
        emit('numberStar', number)
    }
}

watch(() => props.reset, () => {
    starValue.value = undefined
})
</script>