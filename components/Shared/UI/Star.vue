<template>
    <div class="flex"
    @click="addNumberStar">
        <UIIconStar v-for="item in 5" :key="item"
        :data-star="item"
        :class="[ quantityStar >= item ? 'group is-star-yellow' : 'group is-star-gray']"
        class="item__star group-[.is-icon-small]:sm:scale-75 "/>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    quantityStar?: number | string | undefined 
}>(), { quantityStar: 0})
const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()

function addNumberStar({ target }: MouseEvent) {
    
    
    interface MyHTMLElement extends HTMLElement {
        dataset: DOMStringMap & { star: string }
    }
    const elementTarget = target as HTMLElement
    const element = elementTarget.closest('.item__star') as MyHTMLElement
    const number: number = +element.dataset.star
    console.log(element.dataset.star);
    if (number) {
        emit('numberStar', number)
    }
}
</script>