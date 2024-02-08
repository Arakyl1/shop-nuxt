<template>
    <div :class="rootClass" data-test="true">
        <slot v-if="$slots.default"></slot>
        <template v-else-if="data && data.length">
            <div v-for="item in data" :key="item.id">
                <slot v-bind="{ item }">
                    <p>{{ item.name }}</p>
                </slot>
            </div>
        </template>
    </div>
</template>

<script setup>
// отображает сетку карточек, например можно ипользовать в каталоге,
// сетка адаптивная под разные экраны, есть базовые контейнеры 
// через пропс можно менять: размер сетки и отспупы между карточками
const props = defineProps({
    data: Object,
    default: [],
    validator(value) {
        return isArray(value)
    },
    // размер базовых контейнера
    size: {
        type: String,
        default: 'sm',
        validator(value) {
            return ['xs', 'sm', 'lg', 'xl',].includes(value)
        },
    },
    // при желание если базовых контейнеров не достаточно или где-то
    // нужно поменять количество карточек на каком-то экране, или изменить отступ
    // эт можно сделать с помощью пропсов, которые расположены ниже
    // количество карточек при ширине экрана более > 1024px
    default: {
        type: Number 
    },
    // количество карточек при ширине экрана до > 1024px
    1024: {
        type: Number
    },
    // количество карточек при ширине экрана до > 768px
    768: {
        type: Number,
    },
    // количество карточек при ширине экрана до > 600px
    600: {
        type: Number,
    },
    // ширига отступа между карточками при ширине экрана более > 1024px
    // можно передать как "1rem" так и "1rem 0.5rem"
    gapdefault: {
        type: String,
    },
    // ширига отступа между карточками при ширине экрана до > 1024px
    gap1024: {
        type: String,
    },
    // ширига отступа между карточками при ширине экрана до > 768px
    gap768: {
        type: String,
    },
    // ширига отступа между карточками при ширине экрана до > 400px
    gapmob: {
        type: String,
    },
})


const className = useCssModule()
const _screen = useState('APP_SCREEN')

// контейнеры "xs" and "xl" написо времено
// для моих задач нужен был только "sm" и "lg"
// если у вас есть более подходящий контейнер, который часто переиспользуеться
// смело вносите его данные, так же в scss переменную "$sizeGallery" (находится ниже, в блоке style)
// нужно добавить имя контейнера, при условии что его там нет 
const configBasicContainer = {
    xs: {
        default: { col: 2, gap: "1rem" },
        1024: { col: 2, gap: "1rem" },
        768: { col: 1, gap: "1rem" },
        mob: { col: 1, gap: "1rem" },
    },
    sm: {
        default: { col: 3, gap: "1.25rem" },
        1024: { col: 3, gap: "1.25rem" },
        768: { col: 2, gap: "1.25rem" },
        mob: { col: 1, gap: "1.25rem" },
    },
    lg: {
        default: { col: 4, gap: "1.385rem" },
        1024: { col: 3, gap: "1.25rem" },
        768: { col: 2, gap: "1.125rem" },
        mob: { col: 1, gap: "1rem" },
    },
    xl: {
        default: { col: 5, gap: "1rem" },
        1024: { col: 4, gap: "1rem" },
        768: { col: 3, gap: "1rem" },
        mob: { col: 2, gap: "1rem" },
    },
}


const data = computed(() => {
    const sr = unref(_screen)
    if (props.size && props.size in configBasicContainer && sr) {
        const breakMin = sr?.breakpointsMin
       return breakMin[1280] ? checkCustomParams('default', configBasicContainer[props.size].default) :
        breakMin[1024] ? checkCustomParams(1024, configBasicContainer[props.size][1024]) :
        breakMin[768] ? checkCustomParams(768, configBasicContainer[props.size][768]) :
        checkCustomParams('mob', configBasicContainer[props.size]['mob'])
    } else {
        return 0
    }
})


const rootClass = computed(() => {
    return [
        className['gallery']
    ]
})

function checkCustomParams(key, data) {
    return {
        col: props[key] ? props[key] : data.col,
        gap: props['gap'+ key] ? props['gap'+ key] : data.gap
    }
}

</script>

<style lang="scss" module>
.gallery {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(v-bind('data?.col'), minmax(0, 1fr));
    gap: v-bind('data?.gap');
}
.gallery > li {
    display: inline-flex;
}
.gallery:empty {
    display: none;
}
</style>