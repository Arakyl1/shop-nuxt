<template>
    <Group class="gap-y-6" :class="className['body']">
        <Title :tag="'h3'" :text="'Ваша корзина'"/>
        <div class="decor-line"></div>
        <Group v-if="true" class="gap-y-3 grow w-full">
            <Group class="grow w-full">
                <article class="py-4 w-full">
                    <Flex class="gap-6">
                         <Image alt="image product" class="h-12" :square="true"
                        :src="changeValueImageSize('/ddd.jpg', { 'heigth': 'h_56', 'bgrem': 'co_white,e_make_transparent:1' })"/>
                    
                        <div class="grow">
                            <Button :to="`/catalog/data.id`"
                            :text="'data.name'"
                            :mode="'link'"
                            class="text-md"/>
                            <p class="text-gray-500 text-md ">data.art</p>
                        </div>
                        <div class="">
                            <ProductPrice
                            class="text-base"
                            :price="0"
                            :discount="false" />
                        </div>
                        <div class="">
                            <Counter :value="45" :readonly="true"/>
                        </div>
                        <Button
                        :appearance="'gray-icon'"
                        :icon-left="{ key: 'close', 'size': '16_16' }"
                        @click.stop="() => false"/>
                    </Flex>
                </article>
            </Group>
            <div class="decor-line"></div>
            <p class="text-md font-medium text-blue-500"
            >Общая сумма заказа: {{ transformPrice('ru', { currency: 'BYN', style: 'currency' }, totalOrderAmount) }}</p>
        </Group>
        <p v-else class="text-lg text-gray-700">Ваша корзина пуста</p>
    </Group>
</template>

<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Image from "@/components/UI/Image/Image.vue";
import Password from "@/components/UI/Input/Password.vue";
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import ProductPrice from "@/components/Templates/Product/Price.vue";
import Counter from "@/components/UI/Counter/Counter.vue";
// import { basket as _basket } from "@/stores/basket";
// import localState from "@/utils/localState";

// const { state, update } = localState()
// const storeBasket = _basket()
// const { data: basketData, localData: basketLocalData } = storeToRefs(storeBasket)

//const totalOrderAmount = computed(() => basketData.value ? basketData.value.reduce((s, i) => s + ((i.data.price * ((100 - i.data.discount) / 100)) * i.quantity), 0) : 0)
const totalOrderAmount = 0
const className = useCssModule()
// async function getData(params: number[]) {
//     useFetch('/api/product/get', {
//         server: false,
//         method: 'GET',
//         params: { 'where.id.in': params.join(','), 'orderBy.quantity': 'desc' },
//         onResponse({ response }) {
//             if (response.status <= 400) {
//                 if ('data' in response._data) {
//                     type FF = Parameters<typeof storeBasket['updateData']>
//                     const FF: FF[0][] = []
//                     for (let i = 0, l = response._data.data.length; i < l; i++) {
//                         const item = response._data.data[i];
//                         const findRes = findItemLocal(item.id)
//                         if (findRes) {
//                             FF.push({ quantity: findRes.quantity, data: item } as never)
//                         }
//                     }
//                     storeBasket.updateData(FF as never)
//                 }
//             }
//         }
//     })
// }


function transformPrice(reg:string, option: object, price:number):string {
    return new Intl.NumberFormat(reg, { minimumFractionDigits: 0, ...option }).format(price)
}

// function findItemLocal(id:number) {
//    return basketLocalData.value.find(_ => _.id === id)
// }

// onBeforeMount(() => {
//     if (basketLocalData.value.length) {
//         getData(basketLocalData.value.map(_ => _.id));
//     }
//     window.addEventListener('show-modal-basket', () => update(true))   
// })

// watch(() => basketLocalData.value.length, (newV, oldV) => {
//     if (oldV === 0) {
//         getData(basketLocalData.value.map(_ => _.id));
//     }
// })
</script>


<style lang="css" module>
.body {
    /* max-width: 900px; */
    width: 940px;
    aspect-ratio: 5/3;
    /* min-width: 100%; */
}
</style>