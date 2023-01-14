<template>
<div>
    <div>
        <div class="pb-3">
            <h4 :class="[style.title]">Категория</h4>
            <div v-if="categor">
              <select
              class="w-full"
              :class="[style.input]"
              :value="route.query.categor ? route.query.categor : 'Категория'"
              @change="routePushQueryCategor">
                <option value="Категория" class="text-gray-500">Категория</option>
                <option v-for="item in categor" :key="item" :value="item"
                class="text-gray-500">
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="pb-3">
            <h4 class="text-lg mb-1">Подкатегория</h4>
            <div>
              <select
              class="p-2 rounded-md text-gray-300 w-full focus-visible:outline-none" >

                <template v-if="subcategor">
                    <option v-for="item in subcategor.children" :key="item.name"
                    class="text-gray-300">
                      {{ item.name }}
                    </option>
                </template>
                <option v-else class="text-gray-300">Подкатегория</option>
              </select>
            </div>
        </div>
        <div class="decor-line"></div>
        <div class="py-3">
            <h4 :class="[style.title]">Цена</h4>
            <form class="flex w-full items-center">
                    <input
                      class="w-[45%]"
                      :class="[style.input, { 'outline outline-1 outline-red-500': checkValidPrice.from }]"
                      v-model="filterList.price.from"
                      type="number"
                      placeholder="От"
                    />
                <p class="grow text-center">:</p>
                    <input
                      class="w-[45%] p-2"
                      :class="[style.input, { 'outline outline-1 outline-red-500': checkValidPrice.to}]"
                      v-model="filterList.price.upTo"
                      type="number"
                      placeholder="До"
                    />
            </form>
        </div>
       <CatalogFilterElem
       :content="makerList"
       :title="'Бренд'"
       :add-class="style.title"
       @maker-data="addData($event, 'maker')" :reset="reset"/>
       <div class="decor-line"></div>
       <div class="py-3">
          <h4 :class="[style.title]">Рейтинг</h4>
          <OtherElseStar :quantity-star="filterList.ranting" @number-star="(e) => { filterList.ranting = e }"
            class="justify-between"/>
       </div>
       <ContentDoc path="/filter-list/other" v-slot="{ doc }">
          <CatalogFilterElem
            :content="doc.body"
            :title="'Другое'"
            :add-class="style.title"
            @maker-data="addData($event, 'actual')" :reset="reset"/>
       </ContentDoc>
       <ContentDoc path="/filter-list/other-service" v-slot="{ doc }">
          <CatalogFilterElem
            :content="doc.body"
            :title="'Доставка и наличие'"
            :add-class="style.title"
            @maker-data="addData($event, 'other')" :reset="reset"/>
      </ContentDoc> 
    </div>
    <div class="flex mt-4">
      <ButtomStandart class="bg-blue-500 text-white grow text-lg mr-4 py-3 xl:py-2"
      @click="sendParams">
        Показать
      </ButtomStandart>
      <ButtomStandart class="bg-blue-500 aspect-square p-3.5 "
      @click="resetSearchData">
        <IconReload class="w-6 h-6 xl:w-5 xl:h-5" :addClass="'fill-white'"/>
      </ButtomStandart>
    </div>
</div>
</template>
<script setup lang="ts">
import { CreateFilterList } from "@/utils/create";

const props = defineProps<{
  makerList: {
    name: string,
    value: string }[] | undefined
}>()

const emit = defineEmits<{
  (e: 'option-seacrh', id: object):void
}>()

const route = useRoute()
const router = useRouter()
const { data } = await useAsyncData('select', () => queryContent('/select').only(['select']).findOne())

const filterList = ref(new CreateFilterList(route))

const reset = ref(false)

const style = {
  title: 'text-lg mb-1',
  input: 'p-2 rounded-md focus-visible:outline-none text-gray-500'
}

const categor = computed(() => data.value ? data.value.select.map(el => el.name) : "")
const subcategor = computed(() => data.value ? data.value.select.find(el => el.name === route.query.categor) : "")
const checkValidPrice = computed(() => {
  return {
    from: +filterList.value.price.from < 0 ||
    +filterList.value.price.upTo !== 0 ?
    +filterList.value.price.from > +filterList.value.price.upTo :
    false,
    to: +filterList.value.price.upTo < 0 
  }
})


const optionSearch = computed(() => {
  const option = {
    price: <{ gte?: number, lte?: number}>{},
    ranting: { gte: 0 },
  }
  
  if (route.query.categor) {
    option.categor = route.query.categor
  } else {
    option.NOT = []
    option.NOT.push({ categor: '' })
  }
 
  if (filterList.value.ranting > 0) {
    option.ranting.gte = filterList.value.ranting
  }

  if (+filterList.value.price.from > 0) {
    option.price.gte = +filterList.value.price.from
  }
  if(+filterList.value.price.upTo > 0) {
      option.price.lte = +filterList.value.price.upTo
    }

  addOption(filterList.value.actual, option)

  addOption(filterList.value.other, option)

  if (filterList.value.maker.length) {
    option.maker = { in: filterList.value.maker }
  }
  return option
})

const searchParameters = computed(() => {
  let a= '';
  for (const i in route.query) {
    if (Object.prototype.hasOwnProperty.call(route.query, i)) {
      const elem = route.query[i];
      a += `_${elem}`
    }
  }
  return a
})

// methods

function routePushQueryCategor(event: Event) {
  const params = { ...route.query, page: 1, categor: event.target.value }
  if (params.categor === "Категория") {
    delete params.categor
  }

  route.query.categor !== params.categor ? router.push({ query: params }): ''
}

function addData(el: any, way: any) {
  filterList.value[way] = el
}

function addOption(data: string[], option: object){
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      option[elem] = true
    }
  }
}

function resetSearchData() {
  filterList.value = new CreateFilterList(route)
  reset.value = !reset.value
  searchProduct()
}

function sendParams() {
  if (parseInt(route.query.page) > 1) {
    return navigateTo({
      path: route.path,
      query: { ...route.query, page: 1 }
    })
  } else {
    searchProduct()
  }
}

function searchProduct() {
  emit('option-seacrh', optionSearch.value)
  // emit('option-seacrh', optionSearch.value)
}

searchProduct()

watch(() => searchParameters.value, () => {
  searchProduct()
})
</script>

