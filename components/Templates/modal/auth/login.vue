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
                :text="'Login'"/>
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
import { alert as _alert } from "@/stores/alert";

// const emit = defineEmits<{
//     (e: 'response', value: ResponseAuthUser): void
// }>()

const { login: userLogin } = useAuth()
const form = ref<HTMLFormElement | null>(null)
const storeAlert = _alert()

async function onClick() {
    // if (form.value) {
    //     const formData = new FormData(form.value)
    //     const logunUserData: { [key:string]: any }  = {}

    //     for (const [key, value] of formData) {
    //         if (['username','password'].includes(key)) {
    //             logunUserData[key] = value
    //         }
    //     }

    //     if (form.value.checkValidity() && 'username' in logunUserData && 'password' in logunUserData) {
    //         const res = await userLogin(logunUserData as { username: string, password: string })
    //         if (res) {
    //             emit('response', res)
    //         }
    //     } else if(_content.value) {
    //         storeAlert.create({ text: _content.value.ALERT_AUTH_LOGIN_INVALID_DATA || null, state: 'error' })
    //     }
    // }
}


</script>