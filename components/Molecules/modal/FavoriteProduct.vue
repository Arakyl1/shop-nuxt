<template>
  <AtomModalMask :state="state" :clickFun="update">
    <AtomModalTransition :state="state" class="model-style">
      <AtomModalContent :title="'Ваши избранный'" :click-fun="update">
        <div class="grid grid-cols-3 md:grid-cols-2 gap-8 lg:gap-6 sm:gap-4" v-if="responseData?.length">
          <div v-for="item in responseData" :key="item.id" class="mb-4">
            <slot v-bind="{ item }"></slot>
          </div>
        </div>
        <p v-else class="text-2xl text-gray-700 p-5 md:text-xl sm:text-lg">Ваши избраны пусты</p>
      </AtomModalContent>
    </AtomModalTransition>
  </AtomModalMask>
</template>
<script setup lang="ts">
import { favorite as _favorire } from "@/stores/favorite";
import localState from "@/utils/localState";
import { ProductCardBase } from "~~/type/intex";


const { state, update } = localState()
const storeFavorite = _favorire()
const { data: favoriteData } = storeToRefs(storeFavorite)
const responseData = ref<ProductCardBase[] | null>(null)

async function getData(params: number[]) {
    useFetch<ProductCardBase[]>('/api/product/get', {
        server: false,
        method: 'GET',
        params: { 'where.id.in': params.join(','), 'orderBy.quantity': 'desc' },
        onResponse({ response }) {
          if (response.status <= 400) {
                if ('data' in response._data) {
                    responseData.value = response._data.data
                }
            }
        }
    })
}

onBeforeMount(() => {
  window.addEventListener('show-modal-favorite', () => update(true))
  getData([...favoriteData.value])
})
watch(() => favoriteData.value.size, (nValue, oValue) => {
  if (responseData.value) {
    if (nValue > oValue) {
      getData([...favoriteData.value])
    } else {
      const newArrId = [...favoriteData.value]
      const oldArrId = responseData.value.map(_ => _.id)
      const idRemoveItem = oldArrId.find(_ => !newArrId.includes(_))
      responseData.value = responseData.value.filter(_ => _.id !== idRemoveItem)
    }
  } else {
    getData([...favoriteData.value])
  }
})
</script>