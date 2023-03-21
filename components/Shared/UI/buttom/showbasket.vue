<template>
    <slot v-bind="{ showModalBasket, basket }">
        <UIStandart class="p-0 group" @click="showModalBasket" :class="[basket.length ? 'icon-red' : 'icon-gray']">
            <UIIconBasket />
        </UIStandart>
    </slot>
</template>

<script setup lang="ts">
const { basket: _basketSore } = useStore()
const { basket } = _basketSore()


function showModalBasket() {
    window.dispatchEvent(new CustomEvent('showModalBasketProduct'))
}
</script>