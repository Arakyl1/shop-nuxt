<template>
    <UIVFlex :tag="'nav'" :class="$style.Pagination" data-pagination>
        <slot v-if="afterContent" name="after-content" v-bind="{ first, last, prev, next, pageCount, lastPageActive }">
            <UIPaginationArrow
                :aria-current="'Вернутся назад'"
                :disabled="current === 1"
                :aria-label="ariaNextLabel"
                class="-scale-100"
                @click="prev"
            />
        </slot>
        <UIVFlex :tag="'ul'" :align="'center'" class="gap-1" data-pagination-body>
            <!--First-->
            <li v-if="hasFirst">
                <slot name="bt-start" v-bind="{ first, last, prev, next, pageCount }">
                    <UIPaginationButton :page="getPage(1)" />
                </slot>
            </li>

            <li v-if="hasFirstEllipsis">
                <UIPaginationEllipses />
                <!-- <span class="pagination__ellipsis"></span> -->
            </li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number">
                <slot name="bt-content" v-bind="{ first, last, prev, next, pageCount }">
                    <UIPaginationButton :page="page" />
                </slot>
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis">
                <UIPaginationEllipses />
                <!-- <span class="pagination__ellipsis">&hellip;</span> -->
            </li>

            <li v-if="hasLast">
                <slot name="bt-last" v-bind="{ first, last, prev, next, pageCount }">
                    <UIPaginationButton :page="getPage(pageCount)" />
                </slot>
            </li>
        </UIVFlex>

        <slot v-if="beforeContent" name="before-content" v-bind="{ first, last, prev, next, pageCount }">
            <UIPaginationArrow
                :aria-label="ariaNextLabel"
                :disabled="lastPageActive"
                :aria-current="'Показать еще'"
                @click="(e) => next(e)"
            />
        </slot>
    </UIVFlex>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeMount, onUpdated, withDefaults } from 'vue';

interface Props {
    total: number; // общие количество товаров
    current?: number; // текушая страницы
    sizePage?: number; // размер страницы
    rangeBefore?: number; // количество показываемых кнопок до текушей кнопки
    rangeAfter?: number; // количество показываемых кнопок после текушей кнопки
    ariaNextLabel?: string; // aria-label для следуюшей страницы
    ariaPreviousLabel?: string; // aria-label для прошлой страницы
    ariaPageLabel?: string; // aria-label для страницы
    ariaCurrentLabel?: string; // aria-label для текушей страницы
    afterContent?: boolean; // показывать дополнительные кнопки до основных кнопок
    beforeContent?: boolean; // показывать дополнительные кнопки после основных кнопок
    btClass?: string; // CSS классы для кнопок
    kitButton?: 'set-1'; // вставляет общий набор кнопок
}

const props = withDefaults(defineProps<Props>(), {
    current: 1,
    sizePage: 24,
    rangeBefore: 1,
    rangeAfter: 1,
    ariaNextLabel: 'Следующая страница',
    ariaPreviousLabel: 'Прошлая страница',
    ariaPageLabel: 'Страница',
    ariaCurrentLabel: 'Текушая страница',
    afterContent: false,
    beforeContent: false
});

// отправляет номер страницы, а родительский элемент прослушывает это событие, уже изменяет текуший номер страницы
const emit = defineEmits(['update:current', 'change']);

const pageCount = computed(() => Math.ceil(props.total / props.sizePage));
const hasFirst = computed(() => props.current >= 2 + props.rangeBefore);
const hasLast = computed(() => props.current <= pageCount.value - (1 + props.rangeAfter));
const hasFirstEllipsis = computed(() => props.current >= props.rangeBefore + 4);
const hasLastEllipsis = computed(() => props.current < pageCount.value - (2 + props.rangeAfter));
const pagesInRange = computed(() => {
    let left = Math.max(1, props.current - props.rangeBefore);
    if (left - 1 === 2) {
        left--; // Не показывать многоточие, если скрыт один элемент
    }
    let right = Math.min(props.current + props.rangeAfter, pageCount.value);
    if (pageCount.value - right === 2) {
        right++; // Не показывать многоточие, если скрыт один элемент
    }

    const pages = [];
    for (let i = left; i <= right; i++) {
        pages.push(getPage(i));
    }
    return pages;
});
const lastPageActive = computed(() => pageCount.value === props.current);

onBeforeMount(() => {
    if (checkValidCurrent()) {
        emit('update:current', pageCount.value);
    }
});

onUpdated(() => {
    if (checkValidCurrent()) {
        emit('update:current', pageCount.value);
    }
});

function prev(event: PointerEvent) {
    changePage(props.current - 1, event);
}

function next(event: PointerEvent) {
    changePage(props.current + 1, event);
}

function first() {
    getPage(1);
}

function last() {
    getPage(pageCount.value);
}

function changePage(num: number, event: PointerEvent) {
    if (props.current === num || num < 1 || num > pageCount.value) return;

    emit('update:current', num);

    if (event && event.target && event.target instanceof HTMLElement) {
        // устанавливает фокус на активной кнопке
        nextTick(() => event.target!.focus());
    }
}

function checkValidCurrent() {
    return pageCount.value < props.current;
}

function getPage(num: number, options: { [k: string]: any } = {}) {
    return {
        number: num,
        isCurrent: props.current === num,
        click: (event: PointerEvent) => changePage(num, event),
        disabled: options?.disabled || false,
        class: options?.class || '',
        'aria-label': options['aria-label'] || getAriaPageLabel(num, props.current === num)
    };
}

function getAriaPageLabel(pageNumber: number, isCurrent: boolean) {
    if (props.ariaPageLabel && (!isCurrent || !props.ariaCurrentLabel)) {
        return `${props.ariaPageLabel} ${pageNumber}.`;
    } else if (props.ariaPageLabel && isCurrent && props.ariaCurrentLabel) {
        return `${props.ariaCurrentLabel}, ${props.ariaPageLabel} ${pageNumber}.`;
    }
    return null;
}
</script>

<style lang="scss" module>
.Pagination {
    text-align: center;
}
</style>
