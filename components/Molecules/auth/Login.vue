<template>
    <form ref="form">
            <input type="text"
                class="mb-6"
                placeholder="Логин"
                :class="style.input"
                required
                aria-required="true"
                autocomplete="username"
                v-model="data.username"/>
            <AtomUIPassword
                placeholder="Пароль"
                autocomplete="current-password"
                class="text-lg w-full px-4 py-2 rounded-md mb-6"
                required
                aria-required="true"
                v-model="data.password"/>
            <AtomButtonStandart @click="onClick()"
            class="bg-blue-500 rounded-md text-lg text-white w-full"
            >Войти </AtomButtonStandart>
    </form>
</template>

<script setup lang="ts">
import { UserLoginData } from "@/type/intex";
import { Prisma } from "@prisma/client";

type UserKey = Prisma.UserScalarFieldEnum

const props = defineProps<{
    functionModal?: () => void,
    active?: boolean
}>()

const { createAlert } = useAlert()
const { login: userLogin } = useAuth()
const form = ref<HTMLFormElement | null>(null)
const data = ref<UserLoginData>(createObject())


async function onClick() {
    if (form.value) {
        if (data.value.password !== '' && data.value.username !== '') {
            await userLogin(data.value)
        } else {
            createAlert('Проверьте введеные данные')
        }
    }
}

function createObject() {
    return {
        [modelProp('User', 'username')]: '',
        [modelProp('User','password')]: '',
    }
}

watch(() => props.active, () => {
    data.value = createObject()
})
const style = {
    input: 'text-lg w-full rounded-md border border-solid border-black-100 px-4 py-2 focus-visible:outline-yellow-500 transition'
}

</script>