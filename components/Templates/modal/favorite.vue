<template>
    <Group class="gap-y-6" :class="className['body']">
        <Title :tag="'h3'" :text="'Ваши избранный'"/>
        <div class="decor-line"></div>
        <Group v-if="false">
            <div :class="className['gallery']">
                <ProductCard v-for="item in 0" :key="item" :data="item"/>
            </div>
        </Group>
        <p v-else class="text-lg text-gray-700"> У вас пока нет избранных товаров</p>
    </Group>
</template>


<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import ProductCard from '@/components/Templates/Card/Product.vue'
import { favorite as _favorire } from "@/stores/favorite";
import { ProductCardBase } from "~~/type/intex";


const storeFavorite = _favorire()
const { data: favoriteData } = storeToRefs(storeFavorite)
const responseData = ref<ProductCardBase[] | null>(null)
const className = useCssModule()

// async function getData(params: number[]) {
//     useFetch<ProductCardBase[]>('/api/product/get', {
//         server: false,
//         method: 'GET',
//         params: { 'where.id.in': params.join(','), 'orderBy.quantity': 'desc' },
//         onResponse({ response }) {
//             if (response.status <= 400) {
//                 if ('data' in response._data) {
//                     responseData.value = response._data.data
//                 }
//             }
//         }
//     })
// }


// watch(() => favoriteData.value.size, (nValue, oValue) => {
//     if (responseData.value) {
//         if (nValue > oValue) {
//             getData([...favoriteData.value])
//         } else {
//             const newArrId = [...favoriteData.value]
//             const oldArrId = responseData.value.map(_ => _.id)
//             const idRemoveItem = oldArrId.find(_ => !newArrId.includes(_))
//             responseData.value = responseData.value.filter(_ => _.id !== idRemoveItem)
//         }
//     } else {
//         getData([...favoriteData.value])
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