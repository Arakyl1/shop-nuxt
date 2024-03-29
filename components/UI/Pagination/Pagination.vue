<template>
    <nav class="pagination" :class="[]" data-pagination>
        <slot v-if="afterContent" name="after-content" v-bind="{ first, last, prev, next, pageCount, lastPageActive }">
            <ButtonArrow
            :aria-current="'Вернутся назад'"
            :disabled="current === 1"
            :aria-label="ariaNextLabel"
            @click="prev"
            class="h-12 -scale-100"/>
        </slot>
        <ul class="pagination__list " data-pagination-body>
            <!--First-->
            <li v-if="hasFirst">
                <slot name="bt-start" v-bind="{ first, last, prev, next, pageCount }">
                    <PaginationButton :page="getPage(1)" />  
                </slot>
            </li>

            <li v-if="hasFirstEllipsis">
                <span class="pagination__ellipsis ">&hellip;</span>
            </li>

            <!--Pages-->
            <li v-for="page in pagesInRange" :key="page.number">
                <slot name="bt-content" v-bind="{ first, last, prev, next, pageCount }">
                    <PaginationButton :page="page" />
                </slot>
            </li>

            <!--Last-->
            <li v-if="hasLastEllipsis">
                <span class="pagination__ellipsis ">&hellip;</span>
            </li>

            <li v-if="hasLast">
                <slot name="bt-last" v-bind="{ first, last, prev, next, pageCount }">
                    <PaginationButton :page="getPage(pageCount)" />
                </slot>
            </li>

        </ul>

        <slot v-if="beforeContent" name="before-content" v-bind="{ first, last, prev, next, pageCount }">
            <ButtonArrow
            :aria-label="ariaNextLabel"
            :disabled="lastPageActive"
            :aria-current="'Показать еще'"
            @click="(e) => next(e)"
            class="h-12"/>
        </slot>
    </nav>
</template>
  
<script setup>
import PaginationButton from "./Button.vue";
import ButtonArrow from '@/components/Templates/Button/ButtonArrow.vue'


// базовый компонет пагинации
const props = defineProps({
    total: Number, // общие количество товаров
    current: {  // текушая страницы
        type: Number,
        default: 1
    },
    sizePage: { // размер страницы
        type: Number,
        default: 24
    },
    rangeBefore: { // количество показываемых кнопок до текушей кнопки
        type: Number,
        default: 1
    },
    rangeAfter: { // количество показываемых кнопок после текушей кнопки
        type: Number,
        default: 1
    },
    ariaNextLabel: {
        type: String,
        default: 'Следующая страница'
    }, // aria-label для следуюшей страницы
    ariaPreviousLabel: {
        type: String,
        default: 'Прошлая страница'
    },  // aria-label для прошлой страницы
    ariaPageLabel: {
        type: String,
        default: 'Страница'
    },  // aria-label для страницы
    ariaCurrentLabel: {
        type: String,
        default: 'Текушая страница'
    },  // aria-label для текушей страницы
    afterContent: { type: Boolean, default: false }, // показывать дополнительные кнопки до основных кнопок
    beforeContent: { type: Boolean, default: false }, // показывать дополнительные кнопки после основных кнопок
    btClass: { type: String, default: '' }, // CSS классы для кнопок
    // вставляет общий набор кнопок
    kitButton: {
        type: String,
        validator(value) {
            return [].includes(value)
        }
    },
    // вставляет набор кнопок до основных кнопок
    kitButtonAfter: {
        type: String,
        validator(value) {
            return [].includes(value)
        }
    },
    // вставляет набор кнопок после основных кнопок
    kitButtonBefore: {
        type: String,
        validator(value) {
            return [].includes(value)
        }
    },
    firstSet: { type: String },

    container: {
        type: String,
        default: 'lg',
        validator(value) {
            return ['xs', 'sm', 'lg'].includes(value)
        }
    },
})

// отправляет номер страницы, а родительский элемент прослушывает это событие, уже изменяет текуший номер страницы
const emit = defineEmits(['update:current', 'change'])


const pageCount = computed(() => Math.ceil(props.total / props.sizePage))
const hasFirst = computed(() => props.current >= 2 + props.rangeBefore)
const hasLast = computed(() => props.current <= pageCount.value - (1 + props.rangeAfter))
const hasFirstEllipsis = computed(() => props.current >= props.rangeBefore + 4)
const hasLastEllipsis = computed(() => props.current < pageCount.value - (2 + props.rangeAfter))
const pagesInRange = computed(() => {

    let left = Math.max(1, props.current - props.rangeBefore)
    if (left - 1 === 2) {
        left-- // Не показывать многоточие, если скрыт один элемент
    }
    let right = Math.min(props.current + props.rangeAfter, pageCount.value)
    if (pageCount.value - right === 2) {
        right++ // Не показывать многоточие, если скрыт один элемент
    }

    const pages = []
    for (let i = left; i <= right; i++) {
        pages.push(getPage(i))
    }
    return pages
})
const lastPageActive = computed(() => pageCount.value === props.current)


onBeforeMount(() => {
    if (checkValidCurrent()) {
        emit('update:current', pageCount.value)
    }
})

onUpdated(() => {
    if (checkValidCurrent()) {
        emit('update:current', pageCount.value)
    }
})



function prev(event) {
    changePage(props.current - 1, event)
}

function next(event) {
    changePage(props.current + 1, event)
}

function first() {
    getPage(1)
}

function last() {
    getPage(pageCount)
}

function changePage(num, event) {
    
    if (props.current === num || num < 1 || num > pageCount.value) return

    emit('update:current', num)

    if (event && event.target && event.target instanceof HTMLElement) {
        // устанавливает фокус на активной кнопке
        nextTick(() => event.target.focus())
    }
}

function checkValidCurrent() {
    return pageCount.value < props.current
}

function getPage(num, options = {}) {
    return {
        number: num,
        isCurrent: props.current === num,
        click: (event) => changePage(num, event),
        disabled: options.disabled || false,
        class: options.class || '',
        'aria-label':
            options['aria-label'] ||
            getAriaPageLabel(num, props.current === num)
    }
}

function getAriaPageLabel(pageNumber, isCurrent) {
    if (props.ariaPageLabel && (!isCurrent || !props.ariaCurrentLabel)) {
        return `${props.ariaPageLabel} ${pageNumber}.`
    } else if (props.ariaPageLabel && isCurrent && props.ariaCurrentLabel) {
        return (`${props.ariaCurrentLabel}, ${props.ariaPageLabel} ${pageNumber}.`)
    }
    return null
}

</script>       

<style lang="scss">
.pagination {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
}

.pagination__list {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 1rem;
}

.pagination__ellipsis {
    color: var(--dark-600);
    pointer-events: none;
    cursor: not-allowed;
    text-align: center;
    border: none;
    padding: 0 0.5rem;
}


@media (max-width: 620px) {
    .pagination,
    .pagination__list {
        gap: 0.25rem !important;
    }
}


// @media (max-width: 1024px) {
//     .container--lg .set-1__bt {
//         width: 45%;
//     }
// }
// @media (max-width: 768px){
//     .container--lg .set-1__bt {
//         width: 50%;
//     }
// }

// @media (max-width: 620px) {
//     .container--lg .set-1__bt--desktop {
//         display: none;
//     }

//     .container--lg .set-1__bt--mobaile {
//         display: block;
//         width: 100% !important;
//         margin-bottom: 1.5rem;
//     }

//     .pagination-set-1 {
//         margin-bottom: 1.25rem;
//         justify-content: center !important;
//         flex-direction: column;
//     }
// }
</style>