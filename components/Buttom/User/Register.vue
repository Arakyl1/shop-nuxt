<template>
    <div>
        <form class="text-center">
            <input
            type="text"
            :class="style.input"
            placeholder="Логин"
            class="mb-6"
            autocomplete="on"
            v-model="data.username"
          />
          <input
            type="email"
            :class="style.input"
            class="mb-6"
            placeholder="Email"
            v-model="data.email"
          />
          <input
            type="password"
            :class="style.input"
            class="mb-6"
            placeholder="Пароль"
            autocomplete="on"
            v-model="data.password"
          />
          <input
            type="password"
            class="mb-8 "
            :class="style.input"
            placeholder="Повторите пароль"
            autocomplete="on"
            v-model="data.repeartPassword"
          />
          <ButtomStandart class="bg-blue-500 rounded-md text-lg text-white w-full"
          @click="createUser">
            Зарегистрироватьца
          </ButtomStandart>
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

const props = withDefaults(defineProps<{ active: boolean}>(), { active: false })

const data = ref<DataUser>(createObject())
const { register } = useAuth()

const email = computed(() => {
    return !!data.value.username.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)
})

async function createUser() {
  await register(JSON.stringify(data.value))
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
