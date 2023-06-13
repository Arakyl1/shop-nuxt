<template>
  <section>
    <div class="flex md:flex-wrap">
      <div :class="style.container" class="pl-0 5/12 md:w-full md:mb-8 relative">
        <MoleculesSladerBase @change.stop="toDoImageMain"
        v-if="image.create && Array.isArray(image.create) && image.create.length"
         :data="image.create && Array.isArray(image.create) ? image.create : []" >
          <template #item="{ elem, index }">
            <div class="flex justify-center items-center h-full relative">
              <div class="absolute top-8 right-8">
                <AtomButtonStandart class="after:content-none p-0.5 border border-gray-500" @click.stop="removeItem(index)">
                  <IconClose class="group is-icon-black h-7 w-7"/>
                </AtomButtonStandart>
              </div>
              <div class="absolute bottom-6 right-4 translate-y-1/2" >
                <div class="flex items-center">
                  <Transition name="path">
                    <div v-if="indexMainImage === -1">
                      <p class="text-white truncate bg-yellow-500 py-1 px-4 rounded-md mr-4">Выбере главное изображение</p>
                    </div>
                  </Transition>
                  <input
                    type="checkbox"
                    class="w-8 h-8 cursor-pointer rounded-md"
                    v-bind="{ [dataKey('index')]: index }"
                    :checked="index === indexMainImage">
                </div>
              </div>
              <img :src="changeValueImageSize(elem.link, { 'heigth': 'h_480', })" alt="Фото товар" class="max-w-[80%] max-h-[80%]">
            </div>
          </template>
          <template #bottom="{ updateScrolLeftSlader, indexActiveButton }" v-if="image.create && image.create.length > 1">
            <MoleculesSladerControlItem
              :data="image.create"
              :index-active-button="indexActiveButton"
              :update-scrol-left-slader="updateScrolLeftSlader"
              :item-class="'aspect-square mx-2 flex-1 max-w-[3rem] max-h-[3rem]'"
              ><template
                #default="{ item, index }">
                <div>
                  <div class="border-2 rounded-lg transition p-0.5 aspect-square flex justify-center items-center"
                    :class="[index === indexActiveButton ? 'border-yellow-500 ' : 'border-blue-300']">
                    <img :src="changeValueImageSize(item.link, { 'heigth': 'h_48' })" alt="" class="rounded-md max-h-[95%] max-w-[95%]">
                  </div>
                </div>
              </template>
            </MoleculesSladerControlItem>
          </template>
        </MoleculesSladerBase>
        <AtomDownloadImg v-else
          :input-image="null"
          :multiple="true"
          @link-img="(e: any) => { image.create = e.map(_ => ({
            [modelProp('Image','link')]: _.secretUrl,
            [modelProp('Image', 'main')]: false
          })) }">
          <template #default>
            <div
              class="flex justify-center items-center h-full aspect-square bg-blue-100 opacity-30 rounded-md border-dashed border-2 cursor-pointer">
              <p class=" text-black-900 text-center">Кликните, чтобы добавить фото</p>

            </div>
          </template>
        </AtomDownloadImg>
      </div>
      <ul :class="style.container" class="bg-gray-100 w-7/12 md:w-full">
          <li v-for="item in dataInput" :key="item.toString()">
            <template v-if="Array.isArray(item)">
              <p class="flex -mx-2">
                <input v-for="elem in item"
                :key="elem.placeholder"
                :type="elem.type"
                :placeholder="elem.placeholder"
                :name="elem.name || undefined"
                :class="[style.input]"
                v-bind="'arrt' in elem ? elem.arrt : null"
                required
                class="w-1/2 mx-2 input--validation" />
              </p>
            </template>
            
            <div v-else-if="'decorLine' in item" class="decor-line mb-4"></div>
            <template v-else-if="'type' in item ">
              <p>
                <input :type="item.type"
                  :class="[style.input]"
                  :placeholder="item.placeholder"
                  :name="item.name || undefined"
                  v-bind="'arrt' in item ? item.arrt : null"
                  required
                  class="w-full input--validation" />
              </p>
            </template>
          </li>
        </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
// import type { ImageInfo } from "@/type/intex";
import { Prisma } from "@prisma/client";
import { RecordOption } from "~~/type/intex";


const props = defineProps<{ create?: boolean }>()
const emit = defineEmits<{
  (e: 'image-data', data: Prisma.ImageCreateNestedManyWithoutProductInput): void
}>()

const image = ref<Prisma.ImageCreateNestedManyWithoutProductInput>({ create: undefined })
// methods
const indexMainImage = ref<number>(-1)

type DataKey = 'index'
const dataKey =<T extends DataKey>(key:T) => `data-${key}`

function toDoImageMain({ target, type, }: Event) {
  
  if (type === 'change' &&
  (target as HTMLElement).tagName === 'INPUT' &&
  image.value.create &&
  Array.isArray(image.value.create)) {

    interface ModifiedHTMLElement extends HTMLInputElement {
        dataset: DOMStringMap & RecordOption<DataKey, string>
    }
    let elem = target as ModifiedHTMLElement
    let valueIndex: number = +elem.dataset.index
    let valueChecked: boolean = elem.checked

    if (valueIndex !== -1 ) {
      image.value.create = image.value.create.map((_,i) => i === valueIndex ?
        ({ ..._, [modelProp('Image', 'main')]: valueChecked }) :
        ({ ..._, [modelProp('Image', 'main')]: false }))
        indexMainImage.value = valueChecked ? valueIndex : -1
      emit('image-data', image.value)
    }
  }
  
}


function removeItem(index:number) {
  if (image.value.create && Array.isArray(image.value.create)) {
    image.value.create.splice(index, 1)
  }
}
//watch
watch(() => props.create, () => {
  if (image.value.create && Array.isArray(image.value.create)) {
    image.value.create = []
  }
})


const style = {
  container: 'w-1/2 px-8 pt-8 pb-2 xl:px-6 xl:pt-6 xl:pb-0',
  label: 'inline-block mb-3 text-2xl',
  input: 'px-2 pb-1.5 pt-1 mb-6 rounded invalid:outline-invalid'
}

interface Model {
  type: string,
  placeholder: string,
  name: Prisma.ProductCardScalarFieldEnum | null
  arrt?: {
    min?: number,
    max?: number,
    step?: number,
    maxlength?: number,
    minlength? : number
  }
}

const dataInput: (Model | Model[] | { decorLine: boolean })[] = [
  {
    type: 'text',
    placeholder: 'Название товара',
    name: modelProp('ProductCard','name'),
    arrt: { 'minlength': 6 }
  },
  {
    type: 'text',
    placeholder: 'Код продукта',
    name: modelProp('ProductCard','art'),
    arrt: { 'minlength': 6 }
  },
  {
    type: 'text',
    placeholder: 'Производитель',
    name: modelProp('ProductCard','maker'),
  },
  [
    {
      type: 'text',
      placeholder: 'Категория',
      name: modelProp('ProductCard','categor')
    },
    {
      type: 'text',
      placeholder: 'Подкатегория',
      name: null
    }
  ],
  {
    decorLine: true
  },
  [
    {
      type: 'text',
      placeholder: 'Артикул',
      name: modelProp('ProductCard','itemArt'),
      arrt: { 'minlength': 6 }
    },
    {
      type: 'text',
      placeholder: 'Код модели',
      name: modelProp('ProductCard','itemMod'),
      arrt: { 'minlength': 6 }
    }
  ],
  {
    decorLine: true
  },
  [
    {
      type: 'number',
      placeholder: 'Цена',
      name: modelProp('ProductCard','price'),
      arrt: { min: 0,  }
    },
    {
      type: 'number',
      placeholder: 'Количество товара на складе',
      name: modelProp('ProductCard','quantity'),
      arrt: { min: 0 }
    }
  ]
]
</script>