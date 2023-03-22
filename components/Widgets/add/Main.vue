<template>
  <section>
    <div class="flex md:flex-wrap">
      <div :class="style.container" class="pl-0 5/12 md:w-full md:mb-8">
        <FeaturesDownloadImg :reset="create" @link-img="(e) => { data.img = e }">
          <template #default>
            <div
              class="flex justify-center items-center h-full aspect-square bg-blue-100 opacity-30 rounded-md border-dashed border-2 cursor-pointer">
              <p class=" text-black-900 text-center">Кликните, чтобы добавить фото</p>

            </div>
          </template>
        </FeaturesDownloadImg>
      </div>
      <div :class="style.container" class="bg-gray-100 w-7/12 md:w-full">
        <form>
          <template v-for="item in dataInput" :key="item">
            <template v-if="Array.isArray(item)">
              <div class="flex -mx-2">
                <input v-for="elem in item" :key="elem.placeholder" :type="elem.type" :placeholder="elem.placeholder"
                  :class="[style.input, (data[elem.mobel] === 0 || data[elem.mobel] === '') ? 'border-red-300' : '']"
                  v-model="data[elem.mobel]" class="w-1/2 mx-2" />
              </div>
            </template>
            <div v-else-if="'name' in item" class="decor-line mb-4"></div>
            <template v-else-if="item.placeholder">
              <input :type="item.type"
                :class="[style.input, (data[item.mobel] === 0 || data[item.mobel] === '') ? 'border-red-300' : '']"
                :placeholder="item.placeholder" v-model="data[item.mobel]" class="w-full" />
            </template>
          </template>
        </form>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ListProduct } from "@/utils/create";

const props = defineProps<{ create?: boolean }>()
const emit = defineEmits<{
  (e: 'main-data', id: {}): void
}>()

const data = ref<any>(ListProduct())

const validateDate = computed(() => checkNotValidAlem(data.value))

// methods
function checkNotValidAlem(object: {}): unknown {
  return Object.values(object).findIndex((el: any) => typeof el === object ? checkNotValidAlem(el) : (el === '' || el <= 0))
}

//watch
watch(() => props.create, () => {
  data.value = ListProduct()
})

watch(() => validateDate.value, (number) => {
  if (number === -1) {
    emit('main-data', data.value);
  }
})

const style = {
  container: 'w-1/2 px-8 pt-8 pb-2 xl:px-6 xl:pt-6 xl:pb-0',
  label: 'inline-block mb-3 text-2xl',
  input: 'px-2 pb-1.5 pt-1 mb-6 border border-gray-300 border-solid rounded focus-visible:outline-0'
}

interface Model {
  type: string,
  placeholder: string,
  mobel: string
}

const dataInput: (Model | Model[] | { name: string})[] = [
  {
    type: 'text',
    placeholder: 'Название товара',
    mobel: 'name'
  },
  {
    type: 'text',
    placeholder: 'Код продукта',
    mobel: 'art'
  },
  {
    type: 'text',
    placeholder: 'Производитель',
    mobel: 'maker'
  },
  [
    {
      type: 'text',
      placeholder: 'Категория',
      mobel: 'categor'
    },
    {
      type: 'text',
      placeholder: 'Подкатегория',
      mobel: 'subcategor'
    }
  ],
  {
    name: 'decor-line'
  },
  [
    {
      type: 'text',
      placeholder: 'Артикул',
      mobel: 'itemArt'
    },
    {
      type: 'text',
      placeholder: 'Код модели',
      mobel: 'itemMod'
    }
  ],
  {
    name: 'decor-line'
  },
  [
    {
      type: 'number',
      placeholder: 'Цена',
      mobel: 'price'
    },
    {
      type: 'number',
      placeholder: 'Количество товара на складе',
      mobel: 'quantity'
    }
  ]
]
</script>