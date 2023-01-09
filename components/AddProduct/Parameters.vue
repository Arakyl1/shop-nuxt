<template>
<section class="bg-gray-100 p-8 xl:p-6 lg:p-4">
    <div class="flex flex-wrap">
        <div :class="style.item">
            <h3 class="text-3xl xl:text-2xl lg:text-xl">Описание товара</h3>
            <div class="decor-line my-6 xl:my-4"></div>
            <form class="form">
              <textarea
                class="bg-white p-6 w-full h-80 border border-gray-300 border-solid rounded focus-visible:outline-0"
                v-model="description"
              ></textarea>
            </form>
        </div>
        <div :class="style.item">
            <h3 class="text-3xl xl:text-2xl lg:text-xl">Дополнительные опции</h3>
            <div class="decor-line my-6 xl:my-4"></div>
            <form class="flex flex-wrap">
              <p
                class="inline-block grow mb-4"
                v-for="item in dataOption"
                :key="item.id"
              >
                <input
                  type="checkbox"
                  :id="item.id"
                  :value="item.id"
                  v-model="data"
                  class="h-5 w-5 lg:w-4 lg:h-4"
                />
                <label class="pr-3 pl-2 text-xl align-bottom xl:text-lg lg:text-base" :for="item.id">{{ item.name }}</label>
              </p>
            </form>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">

interface Params {
    top?: boolean,
    sale?: boolean,
    news?: boolean,
    delivery?: boolean,
    pickUp?: boolean,
    underTheOrder?: boolean,
    description?: string
}

const props = defineProps<{create?: boolean}>()
const emit = defineEmits<{
    (e: 'parameter', id: object[]):void
}>()

const data = ref<[]>([])
const validData = ref<Params>({})
const description = ref<string>()

const dataOption = ref([
  { id: 'top', name: 'Топ' },
  { id: 'sale', name: 'Скидка' },
  { id: 'news', name: 'Новый' },
  { id: 'delivery', name: 'Доставка' },
  { id: 'pickUp', name: 'Самовывоз' },
  { id: 'underTheOrder', name: 'Под заказ' }
])

// methods
function createData () {
  validData.value = {}
  data.value.forEach((el) => {
    validData.value[el] = true
  })
  validData.value.description = description.value
}

onBeforeUpdate(() => {
  createData()
})

onUpdated(() => emit('parameter', validData.value))

// watch
watch(() => props.create, () => {
  data.value = []
  description.value = ''
})
// style
const style = {
    item: 'p-8 w-full w-1/2 xl:p-6 lg:p-4 md:w-full md:p-2'
}
</script>