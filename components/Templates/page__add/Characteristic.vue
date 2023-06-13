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
                <div class="pt-4">
                    <input
                      type="text"
                      :class="style.input"
                      class="w-full mb-4"
                      placeholder="Название раздела"
                      :tabindex="dataChare.title === '' ? 0 : -1"
                      v-model.trim="dataChare.title"
                    />
                    <template v-if="dataChare &&
                      'content' in dataChare &&
                      'create' && dataChare.content &&
                      Array.isArray(dataChare.content.create)
                      ">
                        <div v-for="(item, index) in dataChare.content.create"
                        :key="index"
                        class="flex items-center mb-4">
                        <input
                          type="text"
                          placeholder="Характеристика"
                          autocapitalize="words"
                          :class="style.input"
                          :tabindex="dataChare.content.create[index].name === '' ? 0 : -1"
                          v-model="dataChare.content.create[index].name"
                        />
                        <input
                          type="text"
                          class="mx-4"
                          :class="style.input"
                          placeholder="Значение"
                          :tabindex="dataChare.content.create[index].value === '' ? 0 : -1"
                          v-model="dataChare.content.create[index].value"
                        />
                        <AtomButtonStandart
                          class="p-0 group is-icon-black"
                          tabindex="-1"
                          @click="removeItem(index)">
                          <IconClose class="h-6 w-6"/>
                        </AtomButtonStandart>
                        </div>
                    </template>
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
            <template v-if="'create' in data && Array.isArray(data.create)">
                <div class="pt-4 ">
                    <div class="mb-4" v-for="item, index in data.create" :key="item.title">
                      <template v-if="item.content && 'create' in item.content && Array.isArray(item.content.create)">
                        <div class="flex mb-2">
                        <h2 class="text-2xl xl:text-xl grow">{{ item.title }}</h2>
                        <AtomButtonStandart class="p-0 ml-2 group is-icon-black" @click="makeEditingActive(index)">
                          <IconEdit class="h-6 w-6 "/>
                        </AtomButtonStandart>
                        <AtomButtonStandart class="p-0 ml-2 group is-icon-black" @click="removeGroup(index)">
                          <IconDelete class="h-7 w-7"/>
                        </AtomButtonStandart>
                      </div>
                      <div class="decor-line mb-2"></div>
                        <div class="flex mb-0" v-for="el in item.content.create" :key="el.name">
                          <p class="text-lg grow xl:text-base">{{ el.name }}</p>
                          <p class="text-lg grow text-right xl:text-base">{{ el.value }}</p>
                        </div>
                      </template>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import { Prisma } from '@prisma/client';


const props = defineProps<{ create?: boolean}>()
const emit = defineEmits<{
    (e: 'characteristic', id: Prisma.CharacteristicCreateNestedManyWithoutProductCardInput): void
}>()

const data = ref<Prisma.CharacteristicCreateNestedManyWithoutProductCardInput>({ 'create': []})
const dataChare = ref<Prisma.CharacteristicCreateWithoutProductCardInput|null>(null)
const editActive = ref<boolean>(false)
const indexEditGroup = ref<number | null>(null)
const { createAlert } = useAlert()


const arrayButtom = {
  create: [
    { style: 'bg-blue-500', function: () => {
      dataChare.value = {
        [modelProp('Characteristic','title')]: '',
        [modelProp('Characteristic','content')]: { 'create': [] }
      }},
      text: 'Добавить раздел' },
    { style: 'bg-red-500', function: () => { dataChare.value = null }, text: 'Удалить раздел' }
  ],
  edit: [
    { style: 'bg-blue-500', function: () => addItem(), text: 'Добавить поле' },
    { style: 'bg-black-300', function: () => deleteLastItem(), text: 'Удалить последнее поле' },
  ]
}

const checkDataChare = computed(() => {
  let _d = dataChare.value
  if (_d && _d.content && 'create' in _d.content && Array.isArray(_d.content.create)) {
    if (_d.title !== '' && _d.content.create.length > 0) {
       return _d.content.create.findIndex(_ => _.name === '' || _.value === '')
    } else { return null }
  } else { return null }
})

const checkDataLength = computed(() => Array.isArray(data.value.create) ? data.value.create.length : 0)


function createSection() {
  if (checkDataChare.value === -1 && dataChare.value && Array.isArray(data.value.create)) {
    data.value.create.push(dataChare.value)
    dataChare.value = null
  }
  if (checkDataChare.value !== null && checkDataChare.value >= 0) {
    createAlert('Не все поля заполенены')
  }
}

function removeItem(elemIndex: number) {
  check(dataChare.value, (data) => data.splice(elemIndex,1))
}
type checkArg = NonNullable<NonNullable<typeof dataChare.value>['content']>['create'][]
function check<T extends typeof dataChare.value>(obj: T, f: (arg: checkArg) => any): void {
  if (obj && obj.content && obj.content.create && Array.isArray(obj.content.create)) {
    f(obj.content.create)
  }
}


function makeEditingActive(groupIndex:number) {
  if ('create' in data.value, Array.isArray(data.value.create)) {
    indexEditGroup.value = groupIndex
    const group = data.value.create.slice(groupIndex, groupIndex + 1)
    dataChare.value = group[0]
    if (group[0]) {
      editActive.value = true
    }
  }
}

function applyEditGroup() {
  if ('create' in data.value, Array.isArray(data.value.create)) {
    if (checkDataChare.value === -1 && dataChare.value && indexEditGroup.value !== null) {
      data.value.create.splice(indexEditGroup.value, 1, dataChare.value)  
      dataChare.value = null
      editActive.value = false
    }
    if (checkDataChare.value !== null && checkDataChare.value >= 0) {
      createAlert('Не все поля заполенены')
    }
  } 
}

function removeGroup(indexGroup:number) {
  if ('create' in data.value, Array.isArray(data.value.create)) {
    data.value.create.splice(indexGroup,1)
  }
}

function addItem(): void {
  check(dataChare.value, (data) => {
    data.push({
        [modelProp('CharacteristicItem','name')]: '',
        [modelProp('CharacteristicItem','value')]: ''
      })
  })
}

function deleteLastItem(): void {
  check(dataChare.value, (data) => data.pop())
}


// watch
watch(() => checkDataLength.value, () => {
    emit('characteristic', data.value)
})

watch(() => props.create, () => {
    data.value = { 'create': []}
    dataChare.value = null
})

const style = {
    input: 'px-2 pb-1.5 pt-1 border border-gray-300 border-solid rounded focus-visible:outline-0 focus:outline-0 grow'
}
</script>