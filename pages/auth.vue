<template>
    <div></div>
    <!-- <Panel :mode="'primary'" class="align-center">
        <Card
        :container="'3xl'"
        :appearance="'white'"
        :mode="'primary'"
        :rounded="'xl'"
        :class="className['card']">
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
                    class="text-md w-full justify-center"
                    :text="BASE_BUTTON.USER_LOGIN"
                    @click="onClick"/>
                </Group>
            </form>
            <slot></slot>
        </Card>
    </Panel> -->
</template>

<script setup lang="ts">
// import Panel from "@/components/UI/Panel/Panel.vue";
// import Title from "@/components/UI/Title/Title.vue";
// import Group from "@/components/UI/Group/Group.vue";
// import Input from "@/components/UI/Input/Input.vue";
// import Password from "@/components/UI/Input/Password.vue";
// import Button from "@/components/UI/Button/Button.vue";
// import Card from "@/components/UI/Card/Card.vue";
import { resetForm, searchInvalidElemInForm, searchMissingParamsInFormDataURl, getFormDataURL } from "@/utils/formHelpers";
// import { hasProperty } from "@/utils/other";
import { t } from "#imports";
import { default as useAuth } from '@/composables/useAuth'

definePageMeta({
    middleware: ['1-auth']
})

const { login: userLogin } = useAuth()
const form = ref<HTMLFormElement | null>(null)
const { addToWatchEventRestore } = useForm()

addToWatchEventRestore(onRestore)

function onRestore() {
    resetForm(form)
}

async function onClick() {
    const formData = getFormDataURL(form)
    if (!formData || !searchInvalidElemInForm(form) || searchMissingParamsInFormDataURl(formData, ['username','password'])) return
    
    await userLogin(formData)  
}

</script>

<style lang="css" module>
.card {
    width: 400px;
}
</style>