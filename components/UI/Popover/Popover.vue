<template>
    <div ref="popover" :data-popover="instanse.uid" :data-uid="instanse?.uid" :class="className['popover']">
        <transition :name="animated">
            <div v-show="active && (isActive || always)" :class="[rootClass, className['desktop']]">
                <template v-if="label">{{ label }}</template>
                <template v-else-if="$slots.content">
                    <slot name="container" v-bind="{ isActive, close, onClick }" >
                        <Card :container="container" :mode="'outline'" :class="className['card']">
                            <slot name="content" v-bind="{ isActive, close, onClick }" />
                        </Card>
                    </slot>
                </template>
            </div>
        </transition>
        <Transition :name="animatedMobaile" :class="className['mobile']" :duration="250">
            <div v-show="active && (isActive || always)">
                <div :class="[rootClass]">
                    <template v-if="label">{{ label }}</template>
                    <template v-else-if="$slots.content">
                        <slot name="container" v-bind="{ isActive, close, onClick }" >
                            <Card :container="container" :mode="'outline'" :class="className['card']">
                                <slot name="content" v-bind="{ isActive, close, onClick }" />
                            </Card>
                        </slot>
                    </template>
                </div>
                <div :class="[className['bg-mask'], className['bg-mask--blur']]" @click="close"></div>
            </div>
        </Transition>
        <div :class="className['trigger']"
            @click="(e) => isActive ? close(e) : onClick(e)">
            <slot v-bind="{ isActive, close, onClick }"/>
        </div>
    </div>
</template>

<script setup>
import { watchEvent } from "@/utils/elemHelper";
import Card from "@/components/UI/Card/Card.vue";

const props = defineProps({
    // Активна popover или нет
    active: {
        type: Boolean,
        default: true
    },
    // Тип popover
    type: {
        type: String,
        default: 'primary',
        validator(value) {
            return ['primary', 'secondary', 'info', 'success', 'error', 'disabled', 'dark'].includes(value)
        }
    },
    // Текст подсказки
    label: String,
    // Задержка подсказки перед ее появлением
    delay: {
        type: Number,
        default: 0
    },
    // Задержка подсказки перед ее исчезновением
    closeDelay: {
        type: Number,
        default: 0
    },
    // Типы событий которые будут активировать popover
    // Список событий 'click'
    triggers: {
        type: Array,
        default: ['click'],
    },
    // Popover будет активен всегда
    always: Boolean,
    container: {
        type: String,
        default: 'm'
    },
    // Popover будет иметь анимацию
    // По умолчанию затухания
    animated: {
        type: String,
        default: 'fade'
    },
    // Popover будет иметь анимацию для мобильных
    // По умолчанию затухания
    animatedMobaile: {
        type: String,
        default: 'transY'
    },
    autoClose: {
        type: Boolean,
        default: true
    },
    contentClass: String,
})


const emit = defineEmits(['open', 'close'])


const popover = ref(null)
const className = useCssModule()
const instanse = ref()
const watchElement = watchEvent('data-popover', instanse, () => close())
const { isActive, close, onClick } = useShow(props, watchElement)


const rootClass = computed(() => {
    return [
        className['content'],
        {
            [className['content--' + props.type]]: props.type,
        }
    ]
})

onMounted(() => {
    instanse.value = getCurrentInstance()
})

watch(() => isActive.value, (newV) => {
    emit(newV ? 'open' : 'close')
})

</script>

<style lang="css" module>
/* purgecss ignore */
.popover {
    display: inline-flex;
    position: relative;
    font-size: var(--text-sm);
}

.content.desktop {
    position: absolute;
    z-index: 20;
    bottom: -0.75rem;
    left: 0;
    transform: translateY(100%);
}

.bg-mask {
    position: fixed !important;
    height: 100vh;
    width: 100vw;
    left: 0;
    bottom: 0;
    z-index: 20;
}

.bg-mask--blur {
    background: rgba(122, 122, 122, 0.30);
    backdrop-filter: blur(7px);
}

.bg-mask--none {
    display: none;
}

.trigger {
    z-index: 10;
}

.desktop {
    display: block;
}

.mobile {
    display: none;
}

.card {
    box-shadow: 0 4px 35px -18px var(--stone-200);
    background-color: var(--white);
}

@media (max-width: 768px) {
    .desktop {
        display: none;
    }

    .mobile {
        display: block;
    }

    .content {
        position: fixed;
        left: 0;
        bottom: 54px;
        transform: translateY(0);
        z-index: 30;
        width: 100%;
    }

    .card {
        border-bottom-left-radius: 0  !important;
        border-bottom-right-radius: 0  !important;
        width: 100%;
   }
}
</style>

<style lang="css">
.transY-enter-active > div >*:first-child,
.transY-leave-active > div >*:first-child {
    transition: all 0.25s ease-out;
}

.transY-enter-from > div >*:first-child,
.transY-leave-to > div >*:first-child {
    opacity: 0;
    transform: translateY(120%);
}
</style>