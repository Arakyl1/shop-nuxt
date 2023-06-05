<template>
    <div>
        <AtomModalTransition :active="stage" class="model-style">
            <AtomModalContent :title="'Ваша корзина'"
                :hude-window="updateStage">
                <div class="flex flex-col" v-if="basket?.length">
                    <ul>
                        <li v-for="(item, index) in basket" :key="item.id">
                            <slot v-bind="{ basketData: item, index, resData: bastetItemData(item.id) }"></slot>
                        </li>
                    </ul>
                    <div class="decor-line"></div>
                    <div class="py-2">
                        <p class="text-xl sm:text-base font-medium text-blue-500 text-right">Общая сумма заказа: {{
                            transformPrice('ru', { currency: 'RUB', style: 'currency' }, totalOrderAmount)
                        }}</p>
                    </div>
                </div>
                <p v-else class="text-2xl text-gray-700 p-5 md:text-xl sm:text-lg">Ваша корзина пуста</p>
            </AtomModalContent>
        </AtomModalTransition>
    </div>
</template>

<script setup lang="ts">
import { showContent } from "~~/utils/ShowContent";
import { BasketItem, ProductCardForSearch, productCardParamsForSearchSelect } from "@/type/intex";

const { stage, updateStage } = showContent();
const { basket: _basketSore } = useStore()
const { basket } = _basketSore()
const { getInfo: getInfoProduct } = useProduct()
const responseData = ref<ProductCardForSearch[] | null>(null)

const totalOrderAmount = computed(() => basket.value ? basket.value.reduce((s, i) => s + (i.price * i.quantity), 0) : 0)

async function getData(params: number[]) {
  getInfoProduct<ProductCardForSearch[]>(
    { where: { id: { in: params } }, ...productCardParamsForSearchSelect },
    { many: true },
    {
      key: 'basket_item__' + params.join(','),
      server: false,
      onResponse({ response }) {
        responseData.value = response._data
      }
    }
  )
}

function bastetItemData(id:number): ProductCardForSearch | null {
    if (!responseData.value) return null
    return responseData.value.find(_ => _.id === id) as ProductCardForSearch
}

onBeforeMount(() => {
    getData(basket.value.map(_ => _.id)),
    window.addEventListener('showModalBasketProduct', updateStage)
})

watch(() => basket.value.length, (newV,oldV) => {
    if (newV > oldV) {
        getData(basket.value.map(_ => _.id))
    }
})
</script>
