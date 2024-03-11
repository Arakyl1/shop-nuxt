<template>
  <Card
  :container="'3xl'"
  :appearance="'white'"
  :mode="'primary'"
  :rounded="'xl'"
  class="scrollbar-v1">
    <form ref="form">
      <Group class="gap-y-6" :align="'center'">
        <Title :tag="'h3'"
        :text="'Register'" />

        <Input
        class="w-full h-12"
        type="email"
        :span="'Username'"
        required
        aria-required="true"
        autocomplete="username"
        aria-autocomplete="list"
        :name="modelProp('User', 'username')"
        @invalid.capture="() => { console.log('invliad') }" />

        <Input
        class="w-full h-12"
        :type="'email'"
        :span="'Email'"
        required
        aria-required="true"
        autocomplete="email"
        aria-autocomplete="list"
        :name="modelProp('User', 'email')" />

        <Password
        :span="'Password'"
        autocomplete="new-password"
        class="text-lg w-full h-12"
        aria-required="true"
        :name="modelProp('User', 'password')" />

        <Password
        :span="'Repeat password'"
        autocomplete="new-password"
        class="text-lg w-full h-12" 
        aria-required="true"
        :name="modelProp('User', 'password')" />

        <Button
        :appearance="'blue'"
        class="text-md w-full justify-center h-12"
        :text="'Register'"
        @click="onClick"/>
      </Group>

    </form>
    <slot></slot>
  </Card>
</template>

<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
import Group from "@/components/UI/Group/Group.vue";
import Input from "@/components/UI/Input/Input.vue";
import Password from "@/components/UI/Input/Password.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import { searchInvalidElem } from '@/utils/formHelpers'


import { UserRegisterData } from "@/type/intex";
import { alert as _alert } from "@/stores/alert";

// const emit = defineEmits<{
//   (e: 'response', value: ResponseAuthUser): void
// }>()

type ParticalMY<T> = { [P in keyof T]: T[P] | null; }

// const data = ref<ParticalMY<UserRegisterData>>(createObject())
const { register: _register } = useAuth()
const form = ref<HTMLFormElement | null>(null)
// const storeAlert = _alert()

async function onClick() {
  if (form.value instanceof HTMLFormElement) {
    searchInvalidElem(form.value)
  }
  // const resValidData = checkValidData(unref(data.value), form.value ? form.value : null)

  // if (resValidData) {
  //   const res = await _register(data.value as UserRegisterData) || false
  //   if (res) {
  //     emit('response', res)
  //     if (_content.value) {
  //       storeAlert.create({ text: _content.value.ALERT_AUTH_REGISTER_SUCCESS || null, state: 'success' })
  //     }
  //     data.value = createObject()
  //   }
  // }
}


// function checkValidData<
//   T extends HTMLFormElement | null,
//   U extends typeof data.value>(data: U, form: T): true | void {
//   if (!form || !form.reportValidity()) return
//   if (data.password !== data.repeartPassword && _content.value) {
//     storeAlert.create({ text: _content.value.ALERT_AUTH_REGISTER_PASSWORD_DONT_MATCH || null, state: 'error' })
//     return
//   }
//   return true
// }

// watch(() => props.active, () => {
//   form.value?.reset()
// })

// function createObject() {
//   return {
//     username: null,
//     email: null,
//     password: null,
//     repeartPassword: null
//   }
// }
</script>