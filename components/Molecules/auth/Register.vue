<template>
  <div>
    <form class="text-center" ref="form">
      <input
        type="text"
        :class="style.input"
        placeholder="Логин"
        class="mb-4"
        required
        aria-required="true"
        autocomplete="username"
        v-model="data.username" />
      <AtomUIEmail
        placeholder="Email"
        class="text-lg w-full mb-4 px-4 py-2 rounded-md"
        aria-required="true"
        autocomplete="email"
        required
        v-model="data.email"/>
      <AtomUIPassword
        placeholder="Пароль"
        class="text-lg w-full px-4 py-2 rounded-md"
        aria-required="true"
        autocomplete="new-password"
        required
        v-model="data.password"/>
      <label class="text-xs text-white mb-2 block">Используйте цифры, буквы малые и прописные, спец. сим.</label>
      <AtomUIPassword
        placeholder="Повторите пароль"
        class="text-lg w-full px-4 py-2 rounded-md mb-8"
        aria-required="true"
        autocomplete="new-password"
        required
        v-model="data.repeartPassword"/>

      <AtomButtonStandart @click="userRegister()" class="bg-blue-500 rounded-md text-lg text-white w-full">
        Зарегистрироватьца
      </AtomButtonStandart>
    </form>
  </div>
</template>
<script setup lang="ts">
import { UserRegisterData } from "@/type/intex";

const props = withDefaults(defineProps<{ active: boolean }>(), { active: false })

type PartialNull<T> = { [P in keyof T]: T[P] | null; }

const data = ref<PartialNull<UserRegisterData>>(createObject())
const { createAlert } = useAlert()
const { register: _userRegister } = useAuth()
const form = ref<HTMLFormElement | null>(null)

async function userRegister() {
  const resValidData = checkValidData(unref(data.value), form.value ? form.value : null)
  
  if (resValidData) {
    const res = await _userRegister(data.value as UserRegisterData) || false
    if (res) {
      createAlert('Пользователь зарегистрирован')
      data.value = createObject()
    }
  }
}

function checkValidData<T extends HTMLFormElement | null>(data: PartialNull<UserRegisterData>, form: T): true | void {
  if (!form || !form.reportValidity()) return

  switch (true) {
    case data.password !== data.repeartPassword:
      return createAlert('Пароли не совпадают')
    default:
      break
  }
  return true
}

watch(() => props.active, () => {
  form.value?.reset()
})

function createObject() {
  return {
    username: null,
    email: null,
    password: null,
    repeartPassword: null
  }
}
const style = {
  input: 'text-lg w-full rounded-md border border-solid border-black-100 px-4 py-2 focus-visible:outline-yellow-500 transition'
}
</script>
