<template>
    <div class="flex"
    @click="addNumberStar">
        <IconStar v-for="item in 5" :key="item"
        :data-star="item"
        :class="[ quantityStar >= item ? 'group is-star-yellow' : 'group is-star-gray']"
        class="item__star group-[.is-icon-small]:sm:scale-75 "/>
    </div>
</template>

<script setup lang="ts">
import { RecordOption } from '~~/type/intex';

withDefaults(defineProps<{
    quantityStar?: number | undefined 
}>(), { quantityStar: 0})
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