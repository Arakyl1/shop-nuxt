<template>
    <section class="w-9/12 bg-gray-100 p-8 xl:p-6 lg:w-10/12 md:w-full">
        <div>
            <div class="flex -mx-2">
                <template v-for="item in arrayButtom.create" :key="item">
                    <ButtomStandart
                    class="text-white font-medium mx-2"
                    :class="item.style"
                    @click="item.function"
                    >{{ item.text }}</ButtomStandart>
                </template>
            </div>
            <template v-if="dataChare">
                <form class="pt-4">
                    <input
                      type="text"
                      :class="style.input"
                      class="w-full"
                      placeholder="Название раздела"
                      v-model.trim="dataChare.name"
                    />
                    <template v-if="dataChare.content.length > 0">
                        <div v-for="(item, index) in dataChare.content"
                        :key="index"
                        class="grid grid-cols-2 gap-x-4">
                        <input
                          type="text"
                          :class="style.input"
                          placeholder="Характеристика"
                          v-model="dataChare.content[index].name"
                        />
                        <input
                          type="text"
                          :class="style.input"
                          placeholder="Значение"
                          v-model="dataChare.content[index].value"
                        />
                        </div>
                    </template>
                </form>
                <div class="flex -mx-2">
                    <template v-for="item in arrayButtom.edit" :key="item">
                        <ButtomStandart
                        class="text-white font-medium mx-2"
                        :class="item.style"
                        @click="item.function"
                        >{{ item.text }}
                        </ButtomStandart>
                    </template>
                </div>
            </template>
            <template v-if="data.length">
                <div class="pt-4">
                    <div class="mb-2" v-for="item in data" :key="item">
                      <h2 class="text-2xl mb-2 xl:text-xl">{{ item.name }}</h2>
                      <div class="decor-line mb-2"></div>
                      <div class="flex mb-0" v-for="el in item.content" :key="el">
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

const props = defineProps<{ create?: boolean}>()
const emit = defineEmits<{
    (e: 'characteristic', id: object[]): void
}>()

const data = ref<object[]>([])
const dataChare = ref<any>(null)


const arrayButtom = {
  create: [
    { style: 'bg-blue-500', function: addSection, text: 'Добавить раздел' },
    { style: 'bg-red-500', function: () => { dataChare.value = null }, text: 'Удалить раздел' }
  ],
  edit: [
    { style: 'bg-blue-500', function: addField, text: 'Добавить поле' },
    { style: 'bg-black-300', function: removeField, text: 'Удалить последнее поле' },
    { style: 'bg-yellow-500', function: createSection, text: 'Создать раздел' }
  ]
}

computed
const checkDataChare = computed(() => (dataChare.value
  ? (dataChare.value.name !== '' && dataChare.value.content.length > 0)
  ? dataChare.value.content.findIndex((el) => el.name === '' || el.value === '')
  :null
  : null))
const checkDataLength = computed(() => data.value.length)

function addSection() {
    dataChare.value = { name: '', content: [] }
}
function addField() {
 dataChare.value.content.push({ name: '', value: '' })
}
function removeField() {
    dataChare.value.content.pop()
}
function createSection() {
    if (checkDataChare.value === -1) {
        const item = dataChare.value ? dataChare.value : {}
        data.value.push(item)
        dataChare.value = null
    }
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
    input: 'px-2 pb-1.5 pt-1 mb-4 border border-gray-300 border-solid rounded focus-visible:outline-0 focus:outline-0'
}
</script>