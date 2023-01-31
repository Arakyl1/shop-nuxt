<template>
    <form>
        <input type="text" :class="style.input" class="mb-6" placeholder="Логин" v-model="data.username" />
        <input type="password" :class="style.input" class="mb-6" placeholder="Пароль" autocomplete="on"
            v-model="data.password" />
        <SharedApiLogin>
            <template #default="{ loginUser }">
                <UIStandart @click="checkValidData(loginUser)" class="bg-blue-500 rounded-md text-lg text-white w-full">
                    Войти </UIStandart>
            </template>
        </SharedApiLogin>
    </form>
</template>

<script setup lang="ts">
interface DataUser {
    username: string,
    password: string,
}

const props = defineProps<{
    functionModal?: Function,
    active?: boolean
}>()

const { createAlert } = useAlert()
const data = ref<DataUser>(createObject())

async function checkValidData(functionLogin: any) {
    switch (true) {
        case data.value.username === '' || data.value.password === '':
            return createAlert('Проверьте введеные данные')
        default:
            await functionLogin(data.value)
            break;
    }
}

function createObject() {
    return {
        username: '',
        password: '',
    }
}

watch(() => props.active, () => {
    data.value = createObject()
})
const style = {
    input: 'text-lg w-full rounded-md border border-solid border-black-100 px-4 py-2 focus-visible:outline-yellow-500 transition'
}
</script>