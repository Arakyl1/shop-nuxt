<template>
    <section class="w-9/12 bg-gray-100 p-8 xl:p-6 lg:w-10/12 md:w-full">
        <div>
            <div class="flex -mx-2">
                <template v-for="item in arrayButtom.create" :key="item">
                    <AtomButtonStandart
                    class="text-white font-medium mx-2"
                    :class="item.style"
                    @click="item.function"
                    >{{ item.text }}</AtomButtonStandart>
                </template>
            </div>
            <template v-if="characteristicSection">
                <div class="pt-4">
                    <input
                      type="text"
                      :class="style.input"
                      class="w-full mb-4"
                      placeholder="Название раздела"
                      :tabindex="characteristicSection.title === '' ? 0 : -1"
                      v-model.trim="characteristicSection.title"
                    />
                    
                        <div v-for="(item, index) in characteristicSection.children"
                        :key="index"
                        class="flex items-center mb-4">
                        <input
                          type="text"
                          placeholder="Характеристика"
                          autocapitalize="words"
                          :class="style.input"
                          :tabindex="characteristicSection.children[index].name === '' ? 0 : -1"
                          v-model="characteristicSection.children[index].name"
                        />
                        <input
                          type="text"
                          class="mx-4"
                          :class="style.input"
                          placeholder="Значение"
                          :tabindex="characteristicSection.children[index].value === '' ? 0 : -1"
                          v-model="characteristicSection.children[index].value"
                        />
                        <AtomButtonStandart
                          class="p-0 group is-icon-black"
                          tabindex="-1"
                          @click="removeItem(index)">
                          <CreateIcon name="close_20_20" :att="{ class: 'fill-red-500' }"/>
                        </AtomButtonStandart>
                        </div>
                    
                  </div>
                <div class="flex -mx-2">
                    <template v-for="item in arrayButtom.edit" :key="item">
                        <AtomButtonStandart
                        class="text-white font-medium mx-2"
                        :class="item.style"
                        @click="item.function"
                        >{{ item.text }}
                        </AtomButtonStandart>
                    </template>
                    <AtomButtonStandart
                      class="text-white font-medium mx-2 bg-yellow-500"
                      @click="editActive ? applyEditGroup() : createSection()"
                      >{{ editActive ? 'Применить изменения' : 'Создать раздел' }}
                    </AtomButtonStandart>
                </div>
            </template>
            
                <div class="pt-4 ">
                    <div class="mb-4" v-for="item, index in data" :key="item.title">
                        <div class="flex mb-2">
                        <h2 class="text-2xl xl:text-xl grow">{{ item.title }}</h2>
                        <AtomButtonStandart class="p-0 ml-2 group is-icon-black" @click="makeEditingActive(index)">
                          <CreateIcon name="edit_20_20" :att="{ class: 'stroke-yellow-500' }"/>
                          
                        </AtomButtonStandart>
                        <AtomButtonStandart class="p-0 ml-2 group is-icon-black" @click="removeGroup(index)">
                          <CreateIcon name="delete_20_20" :att="{ class: 'stroke-red-500' }"/>
                        </AtomButtonStandart>
                      </div>
                      <div class="decor-line mb-2"></div>
                        <div class="flex mb-0" v-for="el in item.children" :key="el.name">
                          <p class="text-lg grow xl:text-base">{{ el.name }}</p>
                          <p class="text-lg grow text-right xl:text-base">{{ el.value }}</p>
                        </div>
                    </div>
                </div>
        </div>
    </section>
</template>

<script setup lang="ts" generic="T extends itemJSONData">
import CreateIcon from "@/content/icons/create";
import { alert as _alert } from "@/stores/alert";
import { Content } from "~~/type/intex";

export type itemJSONData = { char: { title: string, data: { name: string, value: string }[] }[] }

const props = defineProps<{ create?: boolean, doowloadJsonData: T | null }>()
const emit = defineEmits<{
    (e: 'characteristic', id: typeof data.value): void
}>()


type CharacteristicSection = { title: string, children: { name:string, value: string }[] }
const data = ref<CharacteristicSection[]>([])
const characteristicSection = ref<CharacteristicSection|null>(null)
const editActive = ref<boolean>(false)
const indexEditGroup = ref<number | null>(null)
const storeAlert = _alert()
const _content = useState<Content | null>('CONTENT_APP')

const checkDataChare = computed(() => {
  let _d = characteristicSection.value
  if (_d && _d.title !== '' && _d.children.length > 0) {
    return _d.children.findIndex(_ => _.name === '' || _.value === '')
  } else { return null }
})

// watch
watch(() => data.value.length, () => {
    emit('characteristic', data.value)
})

watch(() => props.create, () => {
    data.value = []
    characteristicSection.value = null
})

watch(() => props.doowloadJsonData, (newV) => {
  if (newV) {
    ParceJSONData(newV)
  }
})


function ParceJSONData<T extends itemJSONData>(jsondata:T) {
  for (const item of jsondata.char) {
    const section: CharacteristicSection = {
      title: '',
      children: []
    }
    if ('title' in item) {
      section.title = item.title
      if ('data' in item) {
        const filData = item.data.filter(_ => _.name && _.value)
        if (filData.length) {
          section.children = filData
          data.value.push(section)
        }
      }
    }
  }
}

function createSection() {
  if (checkDataChare.value === -1 && characteristicSection.value) {
    data.value.push(characteristicSection.value)
    characteristicSection.value = null
  }
  if (checkDataChare.value !== null && checkDataChare.value >= 0 && _content.value) {
    storeAlert.create({ text: _content.value.ALERT_PRODUCT_CREATE_INVALID_DATA || '', state: 'error' })
  }
}

function removeItem(elemIndex: number) {
  if (characteristicSection.value) {
    characteristicSection.value = {
      ...characteristicSection.value,
      children: characteristicSection.value.children.filter((_,i) => i !== elemIndex)
    }
  }
}


function makeEditingActive(groupIndex:number) {
  if (data.value.length) {
    indexEditGroup.value = groupIndex
    const group = data.value.slice(groupIndex, groupIndex + 1)
    characteristicSection.value = group[0]
    if (group[0]) {
      editActive.value = true
    }
  }
}

function applyEditGroup() {
  if (data.value.length) {
    if (checkDataChare.value === -1 && characteristicSection.value && indexEditGroup.value !== null) {
      const indexActive = indexEditGroup.value
      const replaceItme = characteristicSection.value
      data.value = data.value.map((_, i) => i === indexActive ? replaceItme : _)
      characteristicSection.value = null
      editActive.value = false
    }
    if (checkDataChare.value !== null && checkDataChare.value >= 0 && _content.value) {
      storeAlert.create({ text: _content.value.ALERT_PRODUCT_CREATE_INVALID_DATA || '', state: 'error' })
    }
  } 
}

function removeGroup(indexGroup:number) {
  if (data.value.length) {
    data.value = data.value.filter((_,i) => indexGroup !== i)
  }
}

function addItem(): void {
  if (characteristicSection.value) {
    characteristicSection.value.children.push({ name: '', value: ''})
  }
}

const arrayButtom = {
  create: [
    { style: 'bg-blue-500', function: () => {
      characteristicSection.value = { title: '', children: [] } },
      text: 'Добавить раздел' },
    { style: 'bg-red-500', function: () => { characteristicSection.value = null }, text: 'Удалить раздел' }
  ],
  edit: [
    { style: 'bg-blue-500', function: () => addItem(), text: 'Добавить поле' },
  ]
}


const style = {
    input: 'px-2 pb-1.5 pt-1 border border-gray-300 border-solid rounded focus-visible:outline-0 focus:outline-0 grow'
}
</script>