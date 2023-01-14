<template>
<section>
    <div class="flex md:flex-wrap">
        <div :class="style.container" class="pl-0 lg:w-5/12 md:w-full md:mb-8">
            <form>
              <div @click="openModal" class="w-3/4 lg:w-full px-12 lg:px-4">
                <div v-if="!inputImageUrl"
                class="flex justify-center items-center h-full aspect-square bg-blue-100 opacity-30 rounded-md border-dashed border-2 cursor-pointer">
                  <p class=" text-black-900 text-center"
                    >Кликните, чтобы добавить фото</p>
                    
                </div>
                <img v-else :src="inputImageUrl" alt="img" class="w-full aspect-square rounded-md">
              
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  ref="inputFile"
                  hidden
                  @change="changeImage">
              </div>
            </form>
        </div>
        <div :class="style.container" class="bg-gray-100 lg:w-7/12 md:w-full">
            <form>
                <template v-for="(item, index) in dataInput" :key="index">
                    <template v-if="Array.isArray(item)">
                        <div class="flex -mx-2">
                            <input
                              v-for="elem in item"
                              :key="elem.placeholder"
                              :type="elem.type"
                              :placeholder="elem.placeholder"
                              :class="[style.input, (data[elem.mobel] === 0 || data[elem.mobel] === '') ? 'border-red-300' : '']"
                              v-model="data[elem.mobel]"
                              class="w-1/2 mx-2"
                            />
                        </div>
                    </template>
                    <div v-else-if="item.name === 'decor-line'" class="decor-line mb-4"></div>
                    <template v-else-if="item.placeholder">
                        <input
                          :type="item.type"
                          :class="[style.input, (data[item.mobel] === 0 || data[item.mobel] === '') ? 'border-red-300' : '' ]"
                          :placeholder="item.placeholder"
                          v-model="data[item.mobel]"
                          class="w-full"
                        />
                    </template>
                </template>
            </form>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
import { CreateItemMainInfo } from "@/utils/create";

const props = defineProps<{create?: boolean}>()

const emit = defineEmits<{
    (e: 'main-data', id: {}): void
}>()

const data = ref<any>(new CreateItemMainInfo())
const inputFile = ref<HTMLInputElement | null>(null)
const inputImageUrl = ref<string | ArrayBuffer | null | undefined>(null)

const validateDate = computed(() => checkNotValidAlem(data.value))
// methods
function checkNotValidAlem (object: {}): unknown {
  return Object.values(object).findIndex((el: any) => typeof el === object ? checkNotValidAlem(el) : (el === '' || el <= 0))
}

function openModal() {
  inputFile.value?.click()
}

// get image
async function changeImage(event: any) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  
  reader.onload = (event) => {
    inputImageUrl.value = event.target?.result 
  }
  reader.readAsDataURL(file)

  const image = await useFetch("/api/cloudinari/upload",
    {
      method: 'post',
      body: file,
      headers: { "Content-Type": "application/octet-stream" }
    })
  data.value.img = image.data.value[0].secretUrl
}
//watch
watch(() => props.create, () => {
    data.value = new CreateItemMainInfo()
    inputImageUrl.value = null
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
    name?: string, 
    type?: string,
    placeholder?: string,
    mobel?: string
}

const dataInput: (Model | Model[])[] = [
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