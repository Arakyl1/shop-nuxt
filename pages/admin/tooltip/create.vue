<template>
    <div/>
    <!-- <form ref="form" class="w-2/4">
        <Group class="gap-6 w-full">
            <Title :tag="'h3'" :text="common.TITLE"/>
            <FormField class="w-full">
                <Input :name="modelProp('Tooltip', 'name')"
                :span="commonInput.TOOLTIP_CREATE_NAME.PLACEHOLDER"/>
            </FormField>
            <Textarea
            class="h-40"
            :mode="'secondary'"
            :name="modelProp('Tooltip', 'text')"
            :required="true"
            :placeholder="commonInput.TOOLTIP_CREATE_DESCRIPTION.PLACEHOLDER"/>
            <div class="decor-line"></div>
            <Flex :justify="'end'" class="w-full">
                <Button
                :appearance="'green'"
                class="px-10"
                :text="BASE_BUTTON.TOOLTIP_CREATE"
                @click="onClick"
                @keyup.enter.stop="onClick"/>
            </Flex>
        </Group>
    </form> -->
</template>

<script setup lang="ts">
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Group from "@/components/UI/Group/Group.vue";
// import Title from "@/components/UI/Title/Title.vue";
// import Button from "components/UI/Button/index.vue";
// import Input from "@/components/UI/Input/Input.vue";
// import FormField from "@/components/UI/FormField/FormField.vue";
// import Textarea from "@/components/UI/Textarea/Textarea.vue";
import { resetForm, searchInvalidElemInForm, getFormDataURL, isThisForm } from "@/utils/formHelpers";
import { t } from "#imports";

definePageMeta({
    title: t('PAGE_META.ADMIN__TOOLTIP.TITLE'),
})

const { create } = useTooltip()
const form = ref<HTMLFormElement | null>(null)

async function onClick() {
    if (isThisForm(form) && searchInvalidElemInForm(form)) {
        const body = getFormDataURL(form)
        const res = await create(body)
        if (res) resetForm(form)
    }
}
</script>