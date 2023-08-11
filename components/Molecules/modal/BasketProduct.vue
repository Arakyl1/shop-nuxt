<template>
    <AtomModalMask :state="state" :clickFun="update">
        <AtomModalTransition class="model-style" :state="state">
            <AtomModalContent :title="'Ваша корзина'" :click-fun="update">
                <div class="flex flex-col" v-if="basketData.length">
                    <ul>
                        <li v-for="(item, index) in basketData" :key="item.data.id">
                            <slot v-bind="{ basketData: item, index, resData: item.data }"></slot>
                        </li>
                    </ul>
                    <div class="decor-line"></div>
                    <div class="py-2">
                        <p class="text-xl sm:text-base font-medium text-blue-500 text-right">Общая сумма заказа: {{
                            transformPrice('ru', { currency: 'BYN', style: 'currency' }, totalOrderAmount)
                        }}</p>
                    </div>
                </div>
                <p v-else class="text-2xl text-gray-700 p-5 md:text-xl sm:text-lg">Ваша корзина пуста</p>
            </AtomModalContent>
        </AtomModalTransition>
    </AtomModalMask>
</template>

<script setup lang="ts">
import { basket as _basket } from "@/stores/basket";
import localState from "@/utils/localState";

const { state, update } = localState()
const storeBasket = _basket()
const { data: basketData, localData: basketLocalData } = storeToRefs(storeBasket)

const totalOrderAmount = computed(() => basketData.value ? basketData.value.reduce((s, i) => s + ((i.data.price * ((100 - i.data.discount) / 100)) * i.quantity), 0) : 0)

async function getData(params: number[]) {
    useFetch('/api/product/get', {
        server: false,
        method: 'GET',
        params: { 'where.id.in': params.join(','), 'orderBy.quantity': 'desc' },
        onResponse({ response }) {
            if (response.status <= 400) {
                if ('data' in response._data) {
                    type FF = Parameters<typeof storeBasket['updateData']>
                    const FF: FF[0][] = []
                    for (let i = 0, l = response._data.data.length; i < l; i++) {
                        const item = response._data.data[i];
                        const findRes = findItemLocal(item.id)
                        if (findRes) {
                            FF.push({ quantity: findRes.quantity, data: item } as never)
                        }
                    }
                    storeBasket.updateData(FF as never)
                }
            }
        }
    })
}


function transformPrice(reg:string, option: object, price:number):string {
    return new Intl.NumberFormat(reg, { minimumFractionDigits: 0, ...option }).format(price)
}

function findItemLocal(id:number) {
   return basketLocalData.value.find(_ => _.id === id)
}

onBeforeMount(() => {
    if (basketLocalData.value.length) {
        getData(basketLocalData.value.map(_ => _.id));
        window.addEventListener('show-modal-basket', () => update(true))   
    }
})

watch(() => basketLocalData.value.length, (newV, oldV) => {
    if (oldV === 0) {
        getData(basketLocalData.value.map(_ => _.id));
    }
})
</script>
