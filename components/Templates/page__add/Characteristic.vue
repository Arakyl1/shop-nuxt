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
            <template v-if="dataChare">
                <form class="pt-4">
                    <input
                      type="text"
                      :class="style.input"
                      class="w-full mb-4"
                      placeholder="Название раздела"
                      v-model.trim="dataChare.name"
                    />
                    <template v-if="dataChare.content.length > 0">
                        <div v-for="(item, index) in dataChare.content"
                        :key="index"
                        class="flex items-center mb-4">
                        <input
                          type="text"
                          :class="style.input"
                          placeholder="Характеристика"
                          v-model="dataChare.content[index].name"
                        />
                        <input
                          type="text"
                          class="mx-4"
                          :class="style.input"
                          placeholder="Значение"
                          v-model="dataChare.content[index].value"
                        />
                        <AtomButtonStandart class="p-0 group is-icon-black" @click="removeItem(index)">
                          <IconClose class="h-6 w-6"/>
                        </AtomButtonStandart>
                        </div>
                    </template>
                </form>
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
            <template v-if="data.length">
                <div class="pt-4 ">
                    <div class="mb-4" v-for="item, index in data" :key="item.name">
                      <div class="flex mb-2">
                        <h2 class="text-2xl xl:text-xl grow">{{ item.name }}</h2>
                        <AtomButtonStandart class="p-0 ml-2 group is-icon-black" @click="makeEditingActive(index)">
                          <IconEdit class="h-6 w-6 "/>
                        </AtomButtonStandart>
                        <AtomButtonStandart class="p-0 ml-2 group is-icon-black" @click="removeGroup(index)">
                          <IconDelete class="h-7 w-7"/>
                        </AtomButtonStandart>
                      </div>
                      <div class="decor-line mb-2"></div>
                      <div class="flex mb-0" v-for="el in item.content" :key="el.name">
                        <p class="text-lg grow xl:text-base">{{ el.name }}</p>
                        <p class="text-lg grow text-right xl:text-base">{{ el.value }}</p>
                      </div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { CharacteristicBlock } from '~~/type/intex';

const props = defineProps<{ create?: boolean}>()
const emit = defineEmits<{
    (e: 'characteristic', id: CharacteristicBlock[]): void
}>()

const data = ref<CharacteristicBlock[]>([])
const dataChare = ref<CharacteristicBlock | null>(null)
const editActive = ref<boolean>(false)
const indexEditGroup = ref<number | null>(null)
const { createAlert } = useAlert()


const arrayButtom = {
  create: [
    { style: 'bg-blue-500', function: () => { dataChare.value = { name: '', content: [] } }, text: 'Добавить раздел' },
    { style: 'bg-red-500', function: () => { dataChare.value = null }, text: 'Удалить раздел' }
  ],
  edit: [
    { style: 'bg-blue-500', function: () => { dataChare.value?.content.push({ name: '', value: '' }) }, text: 'Добавить поле' },
    { style: 'bg-black-300', function: () => { dataChare.value?.content.pop() }, text: 'Удалить последнее поле' },
  ]
}

const checkDataChare = computed(() => (dataChare.value
  ? (dataChare.value.name !== '' && dataChare.value.content.length > 0)
  ? dataChare.value.content.findIndex((el) => el.name === '' || el.value === '')
  :null
  : null))
const checkDataLength = computed(() => data.value.length)


function createSection() {
  if (checkDataChare.value === -1 && dataChare.value) {
    data.value.push(dataChare.value)
    dataChare.value = null
  }
  if (checkDataChare.value !== null && checkDataChare.value >= 0) {
    createAlert('Не все поля заполенены')
  }
}

function removeItem(elemIndex: number) {
    if (dataChare.value) {
      dataChare.value.content.splice(elemIndex,1)
    }
}
function makeEditingActive(groupIndex:number) {
  indexEditGroup.value = groupIndex
  const group = data.value.slice(groupIndex, groupIndex + 1)
  dataChare.value = group[0]
  if (group[0]) {
    editActive.value = true
  }
}

function applyEditGroup() {
  if (checkDataChare.value === -1 && dataChare.value && indexEditGroup.value !== null) {
    data.value.splice(indexEditGroup.value, 1, dataChare.value)  
    dataChare.value = null
    editActive.value = false
  }
  if (checkDataChare.value !== null && checkDataChare.value >= 0) {
    createAlert('Не все поля заполенены')
  }
}

function removeGroup(indexGroup:number) {
  data.value.splice(indexGroup,1)
}
// watch
watch(() => checkDataLength.value, () => {
    emit('characteristic', data.value)
})

watch(() => props.create, () => {
    data.value = []
    dataChare.value = null
})

const style = {
    input: 'px-2 pb-1.5 pt-1 border border-gray-300 border-solid rounded focus-visible:outline-0 focus:outline-0 grow'
}
</script>