<template>
    <Button
    @click.prevent="page.click"
    :aria-label="page['aria-label']"
    :aria-current="page.isCurrent"
    :disabled="(disabled || page.disabled) && page.isCurrent"
    :appearance="'white'"
    :text="page.number"
    :square="true"
    :active="page.isCurrent"
    class="h-12 justify-center text-base button-control-basic"
    />
</template>

<script setup>
import Button from "@/components/UI/Button/Button.vue"
// базовая кнопка пагинации

const props = defineProps({
    // props.page interface Page {
    //     number: number,                  - номер старницы, если пердать "0",       
    //     isCurrent: boolean,              - текушая ли страница          
    //     click: (...arg: any[]) => any,   - фукция изменения номера сраницы 
    //     disabled: false,                 - актива ли кнопка       
    //     class: string,                   - кастомные классы 
    //     'aria-label': string
    // }

    page: {
        type: Object,
        required: true
    },
    // сделать круглую кнопку
    rounded: {
        type: Boolean,
        default: false
    },
    // оключить кнопку
    disabled: {
        type: Boolean,
        default: false
    },
})


</script>
