<template>
    <Card
    :container="'3xl'"
    :appearance="'white'"
    :mode="'primary'"
    :rounded="'xl'"
    class="scrollbar-v1">
        <form ref="form">
            <Group class="gap-6" :align="'center'">
                <Title :tag="'h3'" :text="MODAl_AUTH.TITLE_LOGIN"/>
                <Input class="w-full h-12"
                :span="common.USER_USERNAME.PLACEHOLDER"
                required
                aria-required="true"
                autocomplete="username"
                aria-autocomplete="list"
                :name="modelProp('User', 'username')" />

                <Password
                :span="common.USER_CURRENT_PASSWORD.PLACEHOLDER"
                autocomplete="current-password"
                class="text-lg w-full h-12"
                aria-required="true"
                :name="modelProp('User', 'password')"/>

                <Button
                :appearance="'blue'"
                class="w-full justify-center"
                :text="BASE_BUTTON.USER_LOGIN"
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
import { resetForm, searchInvalidElem } from "@/utils/formHelpers";
import { INPUT_CONTENT as common, BASE_BUTTON, MODAl_AUTH } from '@/common/C'
import { default as useAuth } from '@/composables/useAuth'


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