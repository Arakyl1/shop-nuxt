<template>
  <div>
    <AtomModalTransition :active="stage" class="model-style">
      <AtomModalContent :title="'Ваши избранный'" :text-default="'Ваши избраны пусты'" :hude-window="updateStage">
        <div class="grid grid-cols-3 md:grid-cols-2 -mx-4 sm:-mx-2" v-if="dataList">
          <div v-for="item in dataList" :key="item.id" class="mb-4 slader__item">
            <slot v-bind="{ item }"></slot>
          </div>
        </div>
      </AtomModalContent>
    </AtomModalTransition>
  </div>
</template>
<script setup lang="ts">
import { showContent } from "~~/utils/ShowContent";
import { type _ProductCardBase, productCardBaseParamsSelect } from '~~/type/intex';

const { stage, updateStage } = showContent();
const { favorite: _favoriteStore } = useStore()
const { favorite } = _favoriteStore()
const { getInfo: getInfoProduct } = useProduct()
const dataList = ref<_ProductCardBase[] | null>(null)

async function getData(params: number[]) {
  getInfoProduct<_ProductCardBase[]>(
    { where: { id: { in: params } }, ...productCardBaseParamsSelect },
    { many: true },
    {
      key: 'favorite_item__' + params.join(','),
      server: false,
      onResponse({ response }) {
        dataList.value = response._data
      }
    }
  )
}

onBeforeMount(() => {
  window.addEventListener('showModalFavoriteProduct', updateStage)
  getData([...favorite.value])
})
watch(() => favorite.value.size, (nValue, oValue) => {
  if (dataList.value) {
    if (nValue > oValue) {
      getData([...favorite.value])
    } else {
      const newArrId = [...favorite.value]
      const oldArrId = dataList.value.map(_ => _.id)
      const idRemoveItem = oldArrId.find(_ => !newArrId.includes(_))
      dataList.value = dataList.value.filter(_ => _.id !== idRemoveItem)
    }
  }
})
</script>
