<template>
    <div class="w-full">
        <Header :title="PAGE_META.USER_MAIN.TITLE"/>
        <Group :class="className['body']">
            <!-- <Tag
            :type="'dark'"
            :padding-size="'lg'"
            :text="common.HEADER_SPAN"
            class="text-sm--imp justify-center w-full"/> -->

            <!-- <form class="" ref="form" @input.stop="checkValidForm" @change.stop="checkValidForm">
                <Group gap="3.75rem" :gap768="'1.875rem'">
                    <Group :gap="'1.875rem'" :gap768="'1.25rem'">
                        <Title :text="common.SECTION_1_TITLE"
                        :mode="'primary'"
                        :size="'xl'"
                        v-if="screen.breakpoints.desktop" />
                        <FileImage :name="'photo'" :class="className['image']"/>
                        <Group :gap="'1.25rem'">
                            <CardGrid :size="'xs'" :gap="'1.25rem'">
                                <FormField :value-missing="common.INPUT_VALUE_MISSING">
                                    <Input
                                    :type="'text'"
                                    :name="'name'"
                                    :mode="'secondary'"
                                    :span="common.INPUT_PLACEHOLDER_NAME"
                                    :required="true" />
                                </FormField>
                                <FormField :value-missing="common.INPUT_VALUE_MISSING">
                                    <Date
                                    :name="'date_born'"
                                    :mode="'secondary'"
                                    :span="common.INPUT_PLACEHOLDER_DATE"
                                    :required="true" />
                                </FormField>
                            </CardGrid>
                            <FormField>
                                <FlexCard :gap="'1rem'">
                                    <Radio
                                    :mode="'primary'"
                                    :name="'gender'"
                                    :value="'men'"
                                    :text="common.LIST_RADIO_GENDER_MAN"
                                    checked />
                                    <Radio
                                    :mode="'primary'"
                                    :name="'gender'"
                                    :value="'wonem'"
                                    :text="common.LIST_RADIO_GENDER_WOMAN" />
                                </FlexCard>
                            </FormField>
                        </Group>
                    </Group>
                    <Group :gap="'1.875rem'" :gap768="'1.25rem'">
                        <Title
                        :text="common.SECTION_2_TITLE"
                        :mode="'primary'"
                        :size="'xl'"
                        v-if="screen.breakpoints.desktop" />

                        <Group :gap="'1.25rem'" :gap768="'1rem'">
                            <CardGrid :size="'xs'" :gap="'1.25rem'" :class="className['info']">
                                <FormField
                                :value-missing="common.INPUT_VALUE_MISSING"
                                :pattern-mismatch="common.INPUT_EMAIL_PATTERN_MISMATH">
                                    <Input
                                    :type="'email'"
                                    :name="'email'"
                                    :mode="'secondary'"
                                    :span="common.INPUT_PLACEHOLDER_EMAIL"
                                    :required="true" />
                                </FormField>
                                <div>
                                    <Paragraph
                                    :text="common.INPUT_LABEL_TEL"
                                    :size="'sm'"
                                    class="text-stone-300"
                                    :line="1"
                                    :class="className['span']"/>
                                    <Paragraph :text="data.phone" :size="'sm'" class="text-medium" :line="1" />
                                </div>
                            </CardGrid>
                            <Checkbox
                            name="subscribe"
                            :mode="'primary'"
                            :text="common.CHECKBOX_DECRIPTION" />
                        </Group>

                        <Grid :size="'xs'" :gap="'1.25rem'">
                            <FormField>
                                <Input
                                :type="'text'"
                                :name="'telegram_username'"
                                :mode="'secondary'"
                                :span="common.INPUT_PLACEHOLDER_TELEGRAM"
                                :icon=""
                                :icon-size="24"
                                :icon-clickable="true" />
                            </FormField>
                        </Grid>
                    
                    </Group>
                </Group>
            </form> -->
            
            <Transition v-show="formValid" name="fade-primary" :duration="250">
                <Grid :size="'xs'" v-if="formValid">
                    <Button
                    :text="common.BUTTON_SAVE"
                    :appearance="'green'"
                    :rounded="'base'"
                    :size="'lg'"
                    class="w-full"  />
                </Grid>
            </Transition>

            <div class="decor-line" ></div>
        </Group>
        
        <Button
        :text="common.BUTTON_LOGOUT"
        :style="'link'"
        class="text-sm text-stone-300 text-medium"  />
    </div>
</template>

<script setup lang="ts">
import Panel from "@/components/UI/Panel/Panel.vue";
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
import Header from "@/components/Templates/Header/mobileButtonReturn.vue";
import { user as _user } from '@/stores/user';
import { PAGE_USER_MAIN as common, PAGE_META } from "@/common/C";
import { setValueInput, searchInvalidElem } from '@/utils/formHelpers'


// const _SLUG = useState<string>("SLUG")
// const { getData } = useUsers(unref(_SLUG))
const form = ref<HTMLFormElement | null>(null)
const formValid = ref(false)
const storeUser = _user()
const { data } = storeToRefs(storeUser)
const className = useCssModule()
// const screen = useState<AppScreen>('APP_SCREEN')
// когда будет нормальный стор для юзера тогда, данные его можно будет достать из стора и не отправлять запрос
// const { data: userData } = await getData({ 'tab': 'user' }, {
//     transform: (e) => e?.data?.objects
// })

onMounted(() => {
    // setValueInput(form)
})


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
    margin-bottom: 1.5rem;
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