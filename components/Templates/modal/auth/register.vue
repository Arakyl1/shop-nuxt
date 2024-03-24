<template>
  <Card
  :container="'3xl'"
  :appearance="'white'"
  :mode="'primary'"
  :rounded="'xl'"
  class="scrollbar-v1">
    <form ref="form">
      <Group class="gap-6" :align="'center'">
        <Title :tag="'h3'"
        :text="MODAl_AUTH.TITLE_REGISTER" />
        <FormField class="w-full">
          <Input
          class="w-full h-12"
          type="text"
          :span="common.USER_USERNAME.PLACEHOLDER"
          required
          aria-required="true"
          autocomplete="username"
          aria-autocomplete="list"
          :name="modelProp('User', 'username')" />
        </FormField>

        <FormField class="w-full">
          <Input
          class="w-full h-12"
          :type="'email'"
          :span="common.USER_EMAIL.PLACEHOLDER"
          required
          aria-required="true"
          autocomplete="email"
          aria-autocomplete="list"
          :name="modelProp('User', 'email')" />
        </FormField>

        <FormField class="w-full">
          <Password
          :span="common.USER_PASSWORD.PLACEHOLDER"
          autocomplete="new-password"
          class="text-lg w-full h-12"
          aria-required="true"
          :name="modelProp('User', 'password')" />
        </FormField>

        <FormField class="w-full">
          <Password
          :span="common.USER_CURRENT_PASSWORD.PLACEHOLDER"
          autocomplete="new-password"
          class="text-lg w-full h-12" 
          aria-required="true"
          name="repeatPassword" />
        </FormField>

        <Button
        :appearance="'blue'"
        class="w-full justify-center"
        :text="BASE_BUTTON.USER_REGISTER"
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
import FormField from "@/components/UI/FormField/FormField.vue";
import Password from "@/components/UI/Input/Password.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import { searchInvalidElem, getFormDataObJ, getFormDataURL } from '@/utils/formHelpers'
import { alert as _alert } from "@/stores/alert";
import { INPUT_CONTENT as common, BASE_BUTTON, MODAl_AUTH } from '@/common/C'


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
  const formDataObj = getFormDataObJ(form)
  if (!checkValidData(formDataObj)) return false

  await userRegister(getFormDataURL(form))

  // if (form.value instanceof HTMLFormElement) {

  //   const formData = new FormData(form.value)
  //   const registerData: { [key:string]: any }  = {}
    
  //   // for (const [key, value] of formData) {
  //   //     if (['username','password','email','repeatPassword'].includes(key)) {
  //   //       registerData[key] = value
  //   //     }
  //   // }
  //   if (!checkValidData(registerData)) return false
    
  //   await userRegister(registerData)
  // }
}

function checkPassword(data: { [key:string]: any }): boolean {
  if (data?.password !== data?.repeatPassword) {
    storeAlert.create({ key: 'AUTH_REGISTER_PASSWORD_DONT_MATCH', state: 'error' })
    return false
  }
  return true
}


function checkValidData(data: { [key:string]: any }): boolean{
  return !!searchInvalidElem(form) && checkPassword(data)
}
</script>