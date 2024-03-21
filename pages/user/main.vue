<template>
    <div class="w-full">
        <!-- <Header :title="PAGE_META.USER_MAIN.TITLE"/> -->
        <Group :class="className['body']" class="gap-10">
            <!-- <Tag
            :type="'dark'"
            :padding-size="'lg'"
            :text="common.HEADER_SPAN"
            class="text-sm--imp justify-center w-full"/> -->
            <form ref="form" class="w-full">
                <Group class="w-full gap-12">
                    <Group class="w-full gap-7">
                        <Title :text="common.SECTION_1_TITLE" :tag="'h3'" class="text-bold"/>
                        <Group class="gap-5 w-full">

                            <Grid :container="'xs'" class="w-full gap-5">
                                 <FormField >
                                    <Input
                                    :name="modelProp('User','name')"
                                    :mode="'primary'"
                                    :span="INPUT_CONTENT.USER_NAME.PLACEHOLDER"
                                    :required="true"
                                    autocomplete="name"/>
                                </FormField>
                                <FormField>
                                    <Date
                                    :name="'date_born'"
                                    :mode="'primary'"
                                    autocapitalize="bday"
                                    :span="INPUT_CONTENT.USER_DATE.PLACEHOLDER"/>
                                </FormField>
                            </Grid>
                            <Flex class="gap-4">
                                <Radio v-for="item in radioList"
                                :key="item.key"
                                :mode="'primary'"
                                :name="'gender'"
                                :value="item.key"
                                :style="{ 'fontSize': '1.25rem' }"
                                :text="item.label"
                                checked/>
                            </Flex>
                        </Group>
                    </Group>
                    
                    <Group class="w-full gap-7">
                        <Title :text="common.SECTION_2_TITLE" :tag="'h3'" class="text-bold"/>
                        <Group class="gap-5 w-full">
                            <Grid :container="'xs'" class="w-full gap-5">
                                <FormField :pattern-mismatch="INPUT_CONTENT.USER_EMAIL.PATTERN_MISMATCH">
                                    <Input
                                    :type="'email'"
                                    :name="modelProp('User','email')"
                                    :mode="'primary'"
                                    autocomplete="email"
                                    :span="INPUT_CONTENT.USER_EMAIL.PLACEHOLDER"
                                    :required="true" />
                                </FormField>
                                <FormField >
                                    <Input
                                    :name="'tel'"
                                    :mode="'primary'"
                                    autocomplete="tel"
                                    :span="INPUT_CONTENT.USER_TELEPHONE.PLACEHOLDER"
                                    :required="true" />
                                </FormField>
                            </Grid>
                            <Checkbox
                            name="subscribe"
                            :mode="'primary'"
                            :text="common.CHECKBOX_DECRYPTION"/>
                            <Grid :container="'xs'" class="w-full gap-5">
                                <Input
                                :name="'telegram_username'"
                                :mode="'primary'"
                                :span="INPUT_CONTENT.USER_TELEGRAM.PLACEHOLDER"/>
                            </Grid>
                        </Group>
                    </Group>
                </Group>
            </form>

            <Grid :size="'xs'">
                <Button
                :text="BASE_BUTTON.USER_SAVE"
                :appearance="'green'"
                :height="'h-10'"
                class="w-full px-6"
                @click="onClick"/>
            </Grid>

            <Group class="gap-5 w-full">
                <div class="decor-line"></div>
                <Button
                :text="BASE_BUTTON.USER_LOGOUT"
                :mode="'link'"
                class="text-red-500"
                @click="async() => await _logout()"/>
            </Group>          
        </Group>
    </div>
</template>

<script setup lang="ts">
import Title from "@/components/UI/Title/Title.vue";
// import FileImage from "@/components/UI/File/Image.vue";
import Input from "@/components/UI/Input/Input.vue";
import Button from "@/components/UI/Button/Button.vue";
// import Paragraph from "@/components/UI/Paragraph/Paragraph.vue";
import Date from "@/components/UI/Input/Date.vue";
import Radio from "@/components/UI/Radio/Radio.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Checkbox from "@/components/UI/Checkbox/Checkbox.vue";
import Group from "@/components/UI/Group/Group.vue";
// import Tag from "@/components/UI/Tag/Tag.vue";
import FormField from "@/components/UI/FormField/FormField.vue";
import Grid from "@/components/UI/Grid/Grid.vue";
import { user as _user } from '@/stores/user';
import Confirm from "@/components/Templates/modal/Confirm.vue";
import { PAGE_USER_MAIN as common, PAGE_META, BASE_BUTTON, INPUT_CONTENT } from "@/common/C";
import { setValueInput, searchInvalidElem, getFormData } from '@/utils/formHelpers'


const { logout: _logout } = useAuth()
const form = ref<HTMLFormElement | null>(null)
const formValid = ref(false)
const storeUser = _user()
const { data } = storeToRefs(storeUser)
const className = useCssModule()
const radioList = [
    { key: 'man', label: common.LIST_RADIO_GENDER_MAN },
    { key: 'woman', label: common.LIST_RADIO_GENDER_WOMAN },
]
// const screen = useState<AppScreen>('APP_SCREEN')
// когда будет нормальный стор для юзера тогда, данные его можно будет достать из стора и не отправлять запрос
// const { data: userData } = await getData({ 'tab': 'user' }, {
//     transform: (e) => e?.data?.objects
// })

onMounted(() => {
    // setValueInput(form)
})


async function onClick() {
    if(form.value instanceof HTMLFormElement && searchInvalidElem(form)) {
        const body = getFormData(form)
        if (!data) return

        await useFetch('/api/user/update', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        
    }
}


// async function onClick({ target }: MouseEvent) {
//     if (form.value instanceof HTMLFormElement && form.value.reportValidity()) {
//        const formData = new FormData(form.value)
//        const body: { [key:string]: any } = {}
//        for (const [key, value] of formData) {
//             if (value) {
//                 body[key] = value
//             }
//        }
//        const { data, error } = await useCustomFetch("/user/update", {
//             method: 'PATCH',
//             body: { user: { ...body } }
//        });
//        console.log(data, error)
//     }
// }

// function checkValidForm() {
//     if (form.value instanceof HTMLFormElement) {
//         const valid = form.value.checkValidity()
//         formValid.value = valid
//     }
// }


// function setValueInput() {
//     if (form.value instanceof HTMLFormElement && userData.value) {
//         const elems = form.value.elements
//         const event = new Event('input', { bubbles: false })
//         for (const elem of elems) {
//             if (elem instanceof HTMLInputElement &&
//                 elem.name in userData.value &&
//                 userData.value[elem.name] &&
//                 userData.value[elem.name] !== 'null'
//             ) {
//                 switch (elem.type) {
//                     case 'email':
//                     case 'text': {
//                         elem.value = userData.value[elem.name]
//                         elem.dispatchEvent(event)
//                         break;
//                     }
//                     case 'checkbox': {
//                         elem.checked = userData.value[elem.name]
//                     }
//                     case "radio": {
//                         if (elem.value === userData.value[elem.name]) {
//                             elem.checked = true
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

</script>

<style lang="css" module>
.body {
    width: 75%;
}
.span{
    margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
    .body{
        width: 100%;
        margin-bottom: 1.25rem;
    }
    .image {
        display: flex;
        justify-content: center;
    }
    .info >*:nth-child(2) {
        order: -1;
    }
}
</style>