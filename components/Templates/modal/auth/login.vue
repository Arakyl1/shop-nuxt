<template>
    <Card
    :container="'3xl'"
    :appearance="'white'"
    :mode="'primary'"
    :rounded="'xl'"
    class="scrollbar-v1">
        <form ref="form">
            <Group class="gap-y-6" :align="'center'">
                <Title :tag="'h3'" :text="'Login'"/>
                <Input class="w-full h-12"
                :span="'username'"
                required
                aria-required="true"
                autocomplete="username"
                aria-autocomplete="list"
                :name="modelProp('User', 'username')" />

                <Password
                :span="'password'"
                autocomplete="current-password"
                class="text-lg w-full h-12"
                aria-required="true"
                :name="modelProp('User', 'password')"/>

                <Button
                :appearance="'blue'"
                class="text-md w-full justify-center h-12"
                :text="'Login'"
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
import { resetForm, searchInvalidElem } from "#imports";


const { login: userLogin } = useAuth()
const form = ref<HTMLFormElement | null>(null)

onMounted(() => [
    window.addEventListener('restore', onRestore, { passive: true })
])

function onRestore() {
    resetForm(form)
}

async function onClick() {
    if (!form.value) return

    const formData = new FormData(form.value)
    const loginUserData: { [key:string]: any }  = {}
    
    for (const [key, value] of formData) {
        if (['username','password'].includes(key)) {
            loginUserData[key] = value
        }
    }
    if (searchInvalidElem(form) && !('username' in loginUserData) && !('password' in loginUserData)) return

    await userLogin(loginUserData as { username: string, password: string })  
}


</script>