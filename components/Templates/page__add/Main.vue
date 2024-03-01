<template>
  <Grid :container="'xs'" class="gap-8">
      <Group class="gap-6">
        <CardGridScroll v-if="image && image.length" :data="image"
        :container="'xs'"
        class="w-full"
        @change.stop="toDoImageMain">
          <template #default="{ elem, indexActiveButton }">
            <Flex
            :justify="'center'"
            :class="className['img-item']"
            class="w-full relative aspect-ratio">
              <div :class="className['bt-remove']">
                <Button
                :appearance="'gray-icon'"
                :iconLeft="{ 'key': 'close', 'size': '20_20' }"
                @click.stop="removeItem(index)"/>
              </div>
              <div :class="className['info-img']">
                <Flex class="gap-x-4">
                  <Transition name="path">
                    <div v-if="indexMainImage === -1">
                      <p class="text-white truncate bg-yellow-500 px-2 py-1 rounded-lg text-sm"
                      >{{ common.MESSAGE_SELECT_MAIN_PHOTO }}</p>
                    </div>
                  </Transition>
                  <Checkbox v-bind="{ [dataKey('index')]: indexActiveButton }" :checked="indexActiveButton === indexMainImage"/>
                </Flex>
              </div>
              <img :src="changeValueImageSize(elem.link, { 'heigth': 'h_480' })" alt="Фото товар">
            </Flex>
          </template>
          <template #footer="{ updateScrolLeft,  indexActiveButton }">
            <ControlElements
            :data="image?.length || 0"
            :indexActiveButton="indexActiveButton"
            :updateScroll="updateScrolLeft"
            :itemClass="'aspect-ratio'"
            class="gap-x-3">
              <template #default="{ item }">
                <Flex :justify="'center'" class="rounded-lg p-0.5 aspect-ratio" :class="className['control-img']">
                  <img :src="changeValueImageSize(image[(item - 1)].link, { 'heigth': 'h_48' })" alt=""
                  class="rounded-lg">
                </Flex>
              </template>
            </ControlElements>
          </template>
        </CardGridScroll>
        <FileImage v-else
        :input-image="null"
        :multiple="true"
        class="w-full"
        @link-img="(e) => {image = e.map(_ => ({ link: _.secretUrl, main: false })) }">
          <Flex :justify="'center'">
            <div :class="className['file']">
              <p class=" text-black-900 text-center">{{ commonInput.FILE_ADD_IMAGE.PLACEHOLDER  }}</p>
            </div>
          </Flex>
        </FileImage>
        <slot></slot>
      </Group>
      <Card container="xl" :rounded="'xl'" :appearance="'gray'">
        <Group class="gap-y-5">
          <template v-if="dataSelect">
            <template v-for="(item,index) in dataSelect" :key="index">
              <Select  v-if="item"
              :data="item"
              :name="'CATEGOR__' + index"
              :model-value="activeId[index] || undefined"
              @update:model-value="(e) => addCategor(e, index)"
              class="w-full"/>
            </template>
          </template>
          <template v-for="item in dataInput" :key="item.toString()">
            <Grid v-if="Array.isArray(item)" :container="'xs'" class="gap-5 w-full">
              <FormField v-for="elem in item"
              :key="elem.placeholder"
              :valueMissing="elem.valueMissing"
              class="grow">
                <Input 
                :type="elem.type"
                :placeholder="elem.placeholder"
                :name="elem.name"
                :required="true"
                class="w-full"/>
              </FormField>
            </Grid>
            <div v-else-if="'decorLine' in item" class="decor-line"></div>
            <FormField v-else-if="'type' in item"
            :valueMissing="item.valueMissing"
            class="w-full">
              <Input
              :type="(item.type as 'text')"
              :placeholder="item.placeholder"
              :name="item.name"
              :required="true"
              class="grow"/>
            </FormField>
          </template>
        </Group>
      </Card>
    </Grid>
</template>
<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Grid from "@/components/UI/Grid/Grid.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import FormField from "@/components/UI/FormField/FormField.vue";
import Input from "@/components/UI/Input/Input.vue";
import Checkbox from "@/components/UI/Checkbox/Checkbox.vue";
import Select from "@/components/UI/Select/SelectRelative.vue";
import CardGridScroll from '@/components/UI/CardGridScroll/CardGridScroll.vue'
import FileImage from "@/components/UI/File/Image.vue";
import ControlElements from "@/components/Templates/ControlElements/Item.vue";
import { Attribute, Prisma , Image as PrismaImage } from "@prisma/client";
import { INPUT_CONTENT as commonInput, PAGE_ADD as common } from "@/common/C";
import { CategorDataItem, LoginJSONData, _HTMLInputElement } from "@/type/intex";
import { alert as _alert } from "@/stores/alert";
import selectCategorHelper from "@/utils/selectCategorHelper";

type AttributeType = Attribute['type']

const props = defineProps<{
  downloadJsonData: LoginJSONData | null
}>()

const emit = defineEmits<{
  (e: 'image-data', data: typeof image.value): void
}>()


const className = useCssModule()
const { download: _downloadImage } = useImage()
const storeAlert = _alert()
type ImageCreateData = Pick<PrismaImage, 'link' | 'main'>
const image = ref<ImageCreateData[] | null>(null)
const { activeId, dataSelect, updateActiveId, resetSelect, addCategor } = selectCategorHelper()



onMounted(() => {
  window.addEventListener('restore', onRestore)
}) 

onBeforeUnmount(() => {
  window.removeEventListener('restore', onRestore)
})

watch(() => props.downloadJsonData, (newV) => {
  if (newV) { parseJSONData(newV) }
})


watch(() => image.value && image.value.length, (newV) => {
  if (newV && newV > 0) { emit('image-data', image.value) }
})


// methods
const indexMainImage = ref<number>(-1)

type DataKey = 'index'
const dataKey = <T extends DataKey>(key: T) => `data-${key}`

function toDoImageMain({ target, type, }: Event) {

  if (type === 'change' && image.value &&
  target instanceof HTMLInputElement) {
    
    const elem = target.closest('[data-index]') 
    if (elem) {
      
      const _elem = elem as _HTMLInputElement<DataKey>
        const valueIndex: number = parseInt(_elem.dataset.index)
        const valueChecked: boolean = target.checked
      
      if (!isNaN(valueIndex) && valueIndex !== -1) {
        image.value = image.value.map((_, i) => ({ ..._, main: i === valueIndex }))
        indexMainImage.value = valueChecked ? valueIndex : -1
        emit('image-data', image.value)
      }
    }
  }
}

function removeItem(index: number) {
  if (image.value) {
    image.value.splice(index, 1)
  }
}

async function parseJSONData<T extends { [k: string]: any }>(data: T ) {
    const categor = 'categor' in data ? data.categor.split('/').map(_ => _.trim()) : null

    if (categor) { updateActiveId(categor) }
  
    if (Object.prototype.hasOwnProperty.call(data, 'image') && Array.isArray(data.image) && data.image.length) {
      const imageRes = []
      storeAlert.create({ key: 'DOWNLOAD_IMAGE', state: 'loader' })
      for (const item of data.image) {
        const res = await _downloadImage(item.link)
        if (res) {
          imageRes.push({ link: res[0].secretUrl, main: false })
        }
      }
      if (imageRes.length) {
        image.value = [...imageRes]
      }
    }

}

function onRestore() {
  image.value = null
  resetSelect()
  indexMainImage.value = -1
}


interface Model {
  type: string,
  placeholder: string,
  name: string,
  valueMissing: string,
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
    placeholder: commonInput.PRODUCT_CREATE_NAME.PLACEHOLDER,
    valueMissing: commonInput.PRODUCT_CREATE_NAME.VALUE_MISSING,
    name: modelProp('ProductCard', 'name'),
    arrt: { 'minlength': 6 }
  },
  {
    type: 'text',
    placeholder: commonInput.PRODUCT_CREATE_CODE.PLACEHOLDER,
    valueMissing: commonInput.PRODUCT_CREATE_CODE.VALUE_MISSING,
    name: modelProp('ProductCard', 'art'),
    arrt: { 'minlength': 6 }
  },
  {
    type: 'text',
    placeholder: commonInput.PRODUCT_CREATE_MAKER.PLACEHOLDER,
    valueMissing: commonInput.PRODUCT_CREATE_MAKER.VALUE_MISSING,
    name: "maker"
  },
  {
    decorLine: true
  },
  [
    {
      type: 'text',
      placeholder: commonInput.PRODUCT_CREATE_ARTICLE.PLACEHOLDER,
      valueMissing: commonInput.PRODUCT_CREATE_ARTICLE.VALUE_MISSING,
      name: modelProp('ProductCard', 'itemArt'),
      arrt: { 'minlength': 6 }
    },
    {
      type: 'text',
      placeholder: commonInput.PRODUCT_CREATE_MODEL.PLACEHOLDER,
      valueMissing: commonInput.PRODUCT_CREATE_MODEL.VALUE_MISSING,
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
      placeholder: commonInput.PRODUCT_CREATE_PRICE.PLACEHOLDER,
      valueMissing: commonInput.PRODUCT_CREATE_PRICE.VALUE_MISSING,
      name: modelProp('ProductCard', 'price'),
      arrt: { min: 0, step: 0.01 }
    },
    {
      type: 'number',
      placeholder: commonInput.PRODUCT_CREATE_QUANTITY.PLACEHOLDER,
      valueMissing: commonInput.PRODUCT_CREATE_QUANTITY.VALUE_MISSING,
      name: modelProp('ProductCard', 'quantity'),
      arrt: { min: 0 }
    }
  ]
]
</script>

<style lang="css" module>
.file {
 display: flex;
 justify-content: center;
 align-items: center;
 width: 70%;
 aspect-ratio: 1/1;
 background-color: var(--blue-100);
 opacity: 0.3;
 border-radius: var(--rounded-xl);
 border: 2px dashed var(--blue-500);
 cursor: pointer;
}

.img-item > img {
  max-width: 80%;
  height: 80%;
}
.bt-remove {
  position: absolute;
  top: 2rem;
  right: 2rem;
}
.info-img {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
.control-img {
  border: 2px solid var(--yellow-500);
  width: 4rem;
}
.control-img > img {
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
}
</style>

