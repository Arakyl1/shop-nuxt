<template>
  <section>
    <div class="flex md:flex-wrap">
      <div :class="style.container" class="pl-0 5/12 md:w-full md:mb-8 relative">
        <MoleculesSladerBase @change.stop="toDoImageMain"
          v-if="image"
          :data="image">
          <template #item="{ elem, index }">
            <div class="flex justify-center items-center h-full relative aspect-square">
              <div class="absolute top-8 right-8">
                <AtomButtonStandart class="after:content-none p-0.5 border border-gray-500"
                  @click.stop="removeItem(index)">
                  <CreateIcon name="close_20_20" :att="{ class: 'fill-gray-500' }" />
                </AtomButtonStandart>
              </div>
              <div class="absolute bottom-4 right-4 translate-y-1/2">
                <div class="flex items-center">
                  <Transition name="path">
                    <div v-if="indexMainImage === -1">
                      <p class="text-white truncate bg-yellow-500 py-0 px-2 rounded-md mr-4 text-sm">Выбере главное изображение
                      </p>
                    </div>
                  </Transition>
                  <input type="checkbox" class="w-6 h-6 cursor-pointer rounded-md" v-bind="{ [dataKey('index')]: index }"
                    :checked="index === indexMainImage">
                </div>
              </div>
              <img :src="changeValueImageSize(elem.link, { 'heigth': 'h_480' })" alt="Фото товар"
                class="max-w-[80%] max-h-[80%]">
            </div>
          </template>
          <template #bottom="{ updateScrolLeftSlader, indexActiveButton }" v-if="image && image.length > 1">
            <MoleculesSladerControlItem :data="image.length" :index-active-button="indexActiveButton"
              :update-scrol-left-slader="updateScrolLeftSlader"
              :item-class="'aspect-square mx-2 flex-1 max-w-[3rem] max-h-[3rem]'"><template #default="{ item }">
                <div>
                  <div class="border-2 rounded-lg transition p-0.5 aspect-square flex justify-center items-center"
                    :class="[(item - 1) === indexActiveButton ? 'border-yellow-500 ' : 'border-blue-300']">
                    <img :src="changeValueImageSize(image[(item - 1)].link, { 'heigth': 'h_48' })" alt=""
                      class="rounded-md max-h-[95%] max-w-[95%]">
                  </div>
                </div>
              </template>
            </MoleculesSladerControlItem>
          </template>
        </MoleculesSladerBase>
        <AtomFormDoowloadImage v-else :input-image="null" :multiple="true" @link-img="(e) => {
          image = e.map(_ => ({ link: _.secretUrl, main: false }))
        }">
          <template #default>
            <div
              class="flex justify-center items-center h-full aspect-square bg-blue-100 opacity-30 rounded-md border-dashed border-2 cursor-pointer">
              <p class=" text-black-900 text-center">Кликните, чтобы добавить фото</p>

            </div>
          </template>
        </AtomFormDoowloadImage>
        <slot name="other-content">
        </slot>
      </div>
      <ul :class="style.container" class="bg-gray-100 w-7/12 md:w-full" ref="inputlist">
        <li>
          <select v-model="categorId" :name="('CATEGOR' as AttributeType)" :class="[style.input]"
            class="w-full input--validation">
            <option v-for="categor in categorList" :key="categor.id" :value="categor.value">{{ categor.value }}</option>
          </select>

        </li>
        <li>
          <select v-if="subcategorData" v-model="subcategorId" :name="('SUBCATEGOR' as AttributeType)"
            :class="[style.input]" class="w-full input--validation">
            <option v-for="subcategor in subcategorData.children" :key="subcategor.id" :value="subcategor.value">{{
              subcategor.value }}</option>
          </select>
        </li>
        <li>
          <select v-if="groupData" :name="('CLASS' as AttributeType)" :class="[style.input]"
            class="w-full input--validation" v-model="groupId">
            <option v-for="group in groupData.children" :key="group.id" :value="group.value">{{ group.value }}</option>
          </select>
        </li>
        <li v-for="item in dataInput" :key="item.toString()">
          <template v-if="Array.isArray(item)">
            <p class="flex -mx-2">
              <input v-for="elem in item" :key="elem.placeholder" :type="elem.type" :placeholder="elem.placeholder"
                :name="elem.name || undefined" :class="[style.input]" v-bind="'arrt' in elem ? elem.arrt : null" required
                class="w-1/2 mx-2 input--validation" />
            </p>
          </template>

          <div v-else-if="'decorLine' in item" class="decor-line mb-4"></div>
          <template v-else-if="'type' in item">
            <p>
              <input :type="item.type" :class="[style.input]" :placeholder="item.placeholder"
                :name="item.name || undefined" v-bind="'arrt' in item ? item.arrt : null" required
                class="w-full input--validation" />
            </p>
          </template>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Attribute, Prisma , Image } from "@prisma/client";
import { RecordOption, CategorDataItem, LoginJSONData } from "~~/type/intex";
import CreateIcon from "@/content/icons/create";
type AttributeType = Attribute['type']

const props = defineProps<{
  create?: boolean,
  categorList: CategorDataItem[] | null,
  doowloadJsonData: LoginJSONData | null
}>()
const emit = defineEmits<{
  (e: 'image-data', data: typeof image.value): void
}>()

type ImageCreateData = Pick<Image, 'link' | 'main'>
const { doowload: _doowloadImage } = useImage()
const image = ref<ImageCreateData[] | null>(null)
const categorId = ref<string | null>(null)
const subcategorId = ref<string | null>(null)
const groupId = ref<string | null>(null)
const inputlist = ref<HTMLElement | null>(null)

const subcategorData = computed(() => props.categorList && categorId.value ?
  props.categorList.filter(_ => _.value === categorId.value!)[0] :
  null)
const groupData = computed(() => subcategorData.value && subcategorId.value ?
  subcategorData.value.children.filter(_ => _.value === subcategorId.value!)[0] :
  null)


// methods
const indexMainImage = ref<number>(-1)

type DataKey = 'index'
const dataKey = <T extends DataKey>(key: T) => `data-${key}`

function toDoImageMain({ target, type, }: Event) {

  if (type === 'change' && image.value &&
    (target as HTMLElement).tagName === 'INPUT') {

    interface ModifiedHTMLElement extends HTMLInputElement {
      dataset: DOMStringMap & RecordOption<DataKey, string>
    }
    let elem = target as ModifiedHTMLElement
    let valueIndex: number = +elem.dataset.index
    let valueChecked: boolean = elem.checked

    if (valueIndex !== -1) {
      image.value = image.value.map((_, i) => i === valueIndex ?
        ({ ..._, main: true }) :({ ..._, main: false }))
      indexMainImage.value = valueChecked ? valueIndex : -1
      emit('image-data', image.value)
    }
  }

}


function removeItem(index: number) {
  if (image.value) {
    image.value.splice(index, 1)
  }
}


async function parceDoowloadJSONData<T extends { [kek: string]: any }>(data: T, listHTMLelem: HTMLElement | null) {
  if (listHTMLelem) {
    const fullCategor = 'categor' in data && isString(data.categor) ? data.categor.split('/') || [0, 0, 0] : [0, 0, 0]
    const listInput = listHTMLelem.querySelectorAll('input')
    for (const item of listInput) {
      const name = item.name
      if (Object.prototype.hasOwnProperty.call(data, name)) {
        item.value = data[name]
      }
    }
    if (fullCategor[0] && isString(fullCategor[0])) {
      categorId.value = fullCategor[0].trim()
      if (fullCategor[1] && isString(fullCategor[1])) {
        subcategorId.value = fullCategor[1].trim()
        if (fullCategor[2] && isString(fullCategor[2])) {
          groupId.value = fullCategor[2].trim()
        }
      }
    }
    if (Object.prototype.hasOwnProperty.call(data, 'image') && Array.isArray(data.image)) {
      const imageRes = []
      for (const item of data.image) {
        const res = await _doowloadImage(item.link)
        if (res) {
          imageRes.push({ link: res[0].secretUrl, main: false })
        }
      }
      if (imageRes.length) {
        image.value = [...imageRes]
      }
    }
  }

}
watch(() => props.doowloadJsonData, (newV) => {
  if (newV) { parceDoowloadJSONData(newV, unref(inputlist)) }
})
//watch
watch(() => props.create, () => {
  if (image.value) {
    image.value = null
    categorId.value = null
    subcategorId.value = null
    groupId.value = null
    indexMainImage.value = -1
    window.scroll({ top: 0, behavior: 'smooth' })
  }
})

watch(() => image.value && image.value.length, (newV) => {
  if (newV && newV > 0) { emit('image-data', image.value) }
})

const style = {
  container: 'w-1/2 px-8 pt-8 pb-2 xl:px-6 xl:pt-6 xl:pb-0',
  label: 'inline-block mb-3 text-2xl',
  input: 'px-2 pb-1.5 pt-1 mb-6 rounded invalid:outline-invalid'
}

interface Model {
  type: string,
  placeholder: string,
  name: string
  arrt?: {
    min?: number,
    max?: number,
    step?: number,
    maxlength?: number,
    minlength?: number
  }
}

const dataInput: (Model | Model[] | { decorLine: boolean })[] = [
  {
    type: 'text',
    placeholder: 'Название товара',
    name: modelProp('ProductCard', 'name'),
    arrt: { 'minlength': 6 }
  },
  {
    type: 'text',
    placeholder: 'Код продукта',
    name: modelProp('ProductCard', 'art'),
    arrt: { 'minlength': 6 }
  },
  {
    type: 'text',
    placeholder: 'Производитель',
    name: "maker"
  },
  {
    decorLine: true
  },
  [
    {
      type: 'text',
      placeholder: 'Артикул',
      name: modelProp('ProductCard', 'itemArt'),
      arrt: { 'minlength': 6 }
    },
    {
      type: 'text',
      placeholder: 'Код модели',
      name: modelProp('ProductCard', 'itemMod'),
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
      name: modelProp('ProductCard', 'price'),
      arrt: { min: 0, step: 0.01 }
    },
    {
      type: 'number',
      placeholder: 'Количество товара на складе',
      name: modelProp('ProductCard', 'quantity'),
      arrt: { min: 0 }
    }
  ]
]
</script>
