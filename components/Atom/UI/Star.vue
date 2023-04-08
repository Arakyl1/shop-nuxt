<template>
    <div class="flex"
    @click="addNumberStar">
        <IconStar v-for="item in 5" :key="item"
        :data-star="item"
        :class="[style.base, quantityStar >= item ? style.active : style.inActive]"/>
    </div>
</template>

<script setup lang="ts">
import { RecordOption } from '~~/type/intex';

withDefaults(defineProps<{
    quantityStar?: number | undefined
    style?: { base: string, active: string, inActive: string }
}>(), {
    quantityStar: 3,
    style() {
        return {
            base: 'item__star group-[.is-icon-small]:sm:scale-75',
            active: 'group is-star-yellow',
            inActive: 'group is-star-gray'
        }
    },
})

const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()

type DatasetKey = 'star'
function addNumberStar({ target }: MouseEvent) {
    interface ModifiedHTMLElement extends HTMLElement {
        dataset: DOMStringMap & RecordOption<DatasetKey, string>
    }
    const elementTarget = target as HTMLElement
    const element = elementTarget.closest('.item__star') as ModifiedHTMLElement
    const number: number = +element.dataset.star
    if (number) {
      emit('numberStar', number)
    }
}
</script>