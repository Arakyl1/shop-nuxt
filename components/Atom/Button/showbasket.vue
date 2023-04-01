<template>
    <slot v-bind="{ showModalBasket, basket }">
        <AtomButtonStandart class="p-0 group" @click="showModalBasket" :class="[basket.length ? 'icon-red' : 'icon-gray']">
            <IconBasket />
        </AtomButtonStandart>
    </slot>
</template>

<script setup lang="ts">
const { basket: _basketSore } = useStore()
const { basket } = _basketSore()


function showModalBasket() {
    window.dispatchEvent(new CustomEvent('showModalBasketProduct'))
}
</script>