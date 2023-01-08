<template>
<form>
    <!-- <input
      type="text"
      :class="style.input"
      class="mb-6"
      placeholder="Логин"
      v-model="data.username"
    />
    <input
      type="password"
      :class="style.input"
      class="mb-6"
      placeholder="Пароль"
      autocomplete="on"
      v-model="data.password"
    />
    <ButtomStandart
    @click="loginUser"
    class="bg-blue-500 rounded-md text-lg text-white w-full">
        Войти
    </ButtomStandart> -->
</form>
</template>

<script setup lang="ts">
import { alertContent } from "@/pinia/store";

// interface DataUser {
//     username: string,
//     password: string,
// }

// const props = defineProps<{
//     functionModal: Function,
//     active: boolean
// }>()


// const data = ref<DataUser>(createObject())
// const alertFun = alertContent()

// function createObject() {
//     return {
//         username: '',
//         password: '',
//     }
// }

// async function loginUser() {
//     if (data.value.username && data.value.password) {
//         const { login } = useAuth();
//         try {
//            await login(data.value)
//            props.functionModal()
//         } catch (error: string) {
//             alertFun.updateContent(error)
//         }
//         return
//     }
//     alertFun.updateContent('Проверьте введеные данные')
// }

// watch(() => props.active, () => {
//     data.value = createObject()
// })
// const style = {
//     input: 'text-lg w-full rounded-md border border-solid border-black-100 px-4 py-2 focus-visible:outline-yellow-500 transition'
// }
</script>