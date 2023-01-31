<template>
  <div>
    <form class="text-center">
      <input type="text" :class="style.input" placeholder="Логин" class="mb-4" autocomplete="on"
        v-model="data.username" />
      <SharedUIEmail @input-email="(e) => { data.email = e }" placeholder="Email" :class="[style.input]" class="mb-4" />
      <SharedUIPassword @password="(e) => { data.password = e }" placeholder="Пароль" :class="[style.input]" />
      <label class="text-xs text-white mb-2 block">Используйте цифры, буквы малые и прописные, спец. сим.</label>
      <input type="password" class="mb-8 " :class="style.input" placeholder="Повторите пароль" autocomplete="on"
        v-model="data.repeartPassword" />
      <SharedApiRegister>
        <template #default="{ createUser }">
          <UIStandart @click="checkValidData(createUser)" class="bg-blue-500 rounded-md text-lg text-white w-full">
            Зарегистрироватьца
          </UIStandart>
        </template>
      </SharedApiRegister>
    </form>
  </div>
</template>
<script setup lang="ts">
interface DataUser {
  username: string,
  email: string,
  password: string,
  repeartPassword: string
}

const props = withDefaults(defineProps<{ active: boolean }>(), { active: false })
const data = ref<DataUser>(createObject())
const { createAlert } = useAlert()

function checkValidData(functionCreate: any) {
  switch (true) {
    case data.value.username === '':
      return createAlert('Некорретное имя')
    case data.value.email === '':
      return createAlert('Некорректный адрес почты')
    case data.value.password === '':
      return createAlert('Пароль слишком прост')
    case data.value.password !== data.value.repeartPassword:
      return createAlert('Пароли не совпадают')
    default:
      functionCreate(data.value)
      break;
  }
}

watch(() => props.active, () => {
  data.value = createObject()
})

function createObject() {
  return {
    username: '',
    email: '',
    password: '',
    repeartPassword: ''
  }
}
const style = {
  input: 'text-lg w-full rounded-md border border-solid border-black-100 px-4 py-2 focus-visible:outline-yellow-500 transition'
}
</script>
