<template>
    <figure :class="[className['body'], { [`rounded-${props.rounded}`]: props.rounded }]" class="hidden">
        <figcaption v-if="captionFirst">
            {{ captionFirst }}
        </figcaption>

        <ClientOnly>
            <Transition>
                <img :src="imgSrc" @error="onError" :alt="props.alt" :class="rootClass">
            </Transition>
        </ClientOnly>

        <figcaption v-if="captionLast">
            {{ captionLast }}
        </figcaption>
    </figure>
</template>

<script setup>
// базовый компонет Image 
// через пропс проводится настройка
// через слот передаеться текс caption
// в случае не загрузки изображения устаналивает стандартое фото
// установка подписей под изображение до и после
 const props = defineProps({
    src: { type: [String, null], required: true }, // src изобраения
    alt: { // alt изображения
        type: String,
        default: () => 'image'
    },
    // установить степень скругления углов
    // к качесте значение передаеться один и ниже приведенных модификаторов
    // значение модификаторов, можно посмотреть в файле variables.scss, переменая $borderRadius
    rounded: { 
        type: String, 
        validator(value) {
            return ['none', 'xs', 'sm', 'base', 'lg', 'xl', 'full'].includes(value)
        }
    },
    square: { // сделать чтобы стороны были одинаковы
        type: Boolean,
        default: false
    },
    captionFirst: { // подпись перед изображением
        type: String
    },
    captionLast: { // подпись после изображения
        type: String,
    },
    customClass: { type: String }, // кастомные стили
    baseImage: {
        type: String,
        default: () => useRuntimeConfig().public.emptyImage
    }
})

const checkPropImage = ref(true)
const className = useCssModule()


const rootClass = computed(() => {
    return {
        [className['image']]: true,
        'aspect-ratio': props.square,
        [`rounded-${props.rounded}`]: props.rounded
    }
})


const imgSrc = computed(() => {
    return (checkPropImage.value && props.src) ? props.src : props.baseImage
})


function onError() {
    console.log(true)
    checkPropImage.value = false
}
</script>

<style lang="css" module>
.body {
    display: flex;
    overflow: hidden !important;
}

.image {
    min-width: 100%;
    min-height: 100%;
    object-fit: contain;
}
</style>