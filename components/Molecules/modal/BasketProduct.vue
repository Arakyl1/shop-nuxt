<template>
    <div>
        <AtomModalTransition :active="stage" class="model-style">
            <AtomModalContent :title="'Ваша корзина'" :text-default="'Ваша корзина пуста'"
                :hude-window="updateStage">
                <div class="flex flex-col" v-if="basket.length">
                    <ul>
                        <template v-for="(item, index) in basket" :key="item.id">
                            <slot v-bind="{ item, index }"></slot>
                        </template>
                    </ul>
                    <div class="decor-line"></div>
                    <div class="py-2">
                        <p class="text-xl sm:text-base font-medium text-blue-500 text-right">Общая сумма заказа: {{
                            transformPrice('ru', { currency: 'RUB', style: 'currency' }, totalOrderAmount)
                        }}</p>
                    </div>
                </div>
            </AtomModalContent>
        </AtomModalTransition>
    </div>
</template>

<script setup lang="ts">
import { showContent } from "~~/utils/ShowContent";

const { stage, updateStage } = showContent();
const { basket: _basketSore } = useStore()
const { basket } = _basketSore()

onBeforeMount(() => {
    window.addEventListener('showModalBasketProduct', updateStage)
})

const totalOrderAmount = computed(() => basket.value ? basket.value.reduce((s, i) => s + (i.price * i.quantity), 0) : 0)
</script>
