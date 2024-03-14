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
        type="text"
        :span="'Username'"
        required
        aria-required="true"
        autocomplete="username"
        aria-autocomplete="list"
        :name="modelProp('User', 'username')" />

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
        name="repeatPassword" />

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
import { alert as _alert } from "@/stores/alert";


// const data = ref<ParticalMY<UserRegisterData>>(createObject())
const { register: userRegister} = useAuth()
const form = ref<HTMLFormElement | null>(null)
const storeAlert = _alert()


onMounted(() => [
    window.addEventListener('restore', onRestore, { passive: true })
])

function onRestore() {
    resetForm(form)
}

async function onClick() {
  if (form.value instanceof HTMLFormElement) {

    const formData = new FormData(form.value)
    const registerData: { [key:string]: any }  = {}
    
    for (const [key, value] of formData) {
        if (['username','password','email','repeatPassword'].includes(key)) {
          registerData[key] = value
        }
    }
    if (!checkValidData(registerData)) return false
    
    await userRegister(registerData)
  }
}


function checkValidData(data: { [key:string]: any }): boolean{
  if (!searchInvalidElem(form)) return false
  if (data.password !== data.repeatPassword) {
    storeAlert.create({ key: 'AUTH_REGISTER_PASSWORD_DONT_MATCH', state: 'error' })
    return false
  }
  return true
}

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