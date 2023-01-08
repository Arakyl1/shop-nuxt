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
withDefaults(defineProps<{
    quantityStar?: number | string | undefined 
}>(), { quantityStar: 0})
const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()

function addNumberStar(event: Event) {
    const numderStar = +event.target.closest('.item__star')?.dataset.star;
    if (numderStar) {
        emit('numberStar', numderStar)
    }
}
</script>