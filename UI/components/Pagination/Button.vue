<template>
    <UButton
        :aria-label="page['aria-label']"
        :aria-current="page.isCurrent"
        :disabled="(disabled || page.disabled) && page.isCurrent"
        :mode="'blue'"
        :text="page.number"
        :square="true"
        :active="page.isCurrent"
        class="justify-center textS-sm"
        @click.prevent="page.click"
    />
</template>

<script setup lang="ts">
import { type Props as ButtonProps, default as UButton } from '../Button/Button.vue';
// props.page interface Page {
//     number: number,                  - номер старницы,
//     isCurrent: boolean,              - текушая ли страница
//     click: (...arg: any[]) => any,   - фукция изменения номера сраницы
//     disabled: false,                 - активна ли кнопка
//     class: string,                   - кастомные классы
//     'aria-label': string
// }
interface Props extends Pick<ButtonProps, 'rounded' | 'disabled'> {
    page: {
        number: number;
        isCurrent: boolean;
        click: (...arg: any[]) => any;
        disabled: false;
        class: string;
        'aria-label': string;
    };
}

defineProps<Props>();
</script>
