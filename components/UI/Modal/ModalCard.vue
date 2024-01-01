<template>
    <Transition  :duration="250" :class="className['wrapper']" mode="in-out">
        <div :class="className['container']" v-if="isActive">
            <div :class="[
                className['modal'],
                [props.mode ? className['modal--' + props.mode] : '']
            ]">
                <slot name="body">
                    <Card :container="'xl'" :rounded="'2xl'" data-modal-body="true"
                    :class="[className['body'],bodyClass]" class="scrollbar-v1">
                        <slot name="content">
                            <Button v-if="btClose"
                            :icon-left="{ key: 'close', size: '20_20' }"
                            @click="onClick"
                            :class="className['bt-close']"
                            data-modal-bt-close="true"/>
                            <slot></slot>
                        </slot>
                    </Card>
                </slot>
            </div>
            <div v-if="mask" v-show="isActive"
            :class="[className['bg-mask'], className['bg-mask--' + mask]]"
            @click="onClick"></div>
        </div>
    </Transition>
</template>

<script setup  lang="ts">
import Card from "@/components/UI/Card/Card.vue";
import Button from "@/components/UI/Button/Button.vue";

interface Props {
    active?: boolean,
    mode?: 'primary' | 'secondary',
    animation?: string,
    animatedMobaile?: string,
    btClose?: boolean,
    mask?: 'blur'|'dark'|'none',
    onClose?: (...any: any[]) => any,
    bodyClass?: string
}

const props = withDefaults(defineProps<Props>(),  {
    mode: 'primary',
    btClose: true,
    mask: 'dark',
    onClose: () => false
})

const emit = defineEmits(['close'])

// const screen = useState('APP_SCREEN')
const isActive = ref(props.active || false)
const className = useCssModule()


// const isNameAnimation = computed(() => {
//     const sc = unref(screen)
//     if (!sc) return
//     return sc.breakpointsMax[768] ? props.animatedMobaile || 'transY' : props.animation || 'zoom-out' 
// })

watch(() => props.active, (newV, oldV) => {
    if (newV !== oldV) {
        isActive.value = newV
    }
})

function onClick() {
    isActive.value = false
    emit('close', isActive.value)
}
</script>

<style lang="css" module>
.wrapper {
    position: relative;
}
.container {
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100vw;
}

.modal {
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 90vh;
    overflow: hidden;
}


.bg-mask {
    min-height: 100vh;
    width: 100vw;
    z-index: 10;
}

.bg-mask--dark {
    background: rgba(122, 122, 122, 0.40);
}

.bg-mask--blur {
    background: rgba(122, 122, 122, 0.30);
    backdrop-filter: blur(7px);
}

.bg-mask--none {
    display: none;
}

.body {
    position: relative;
    max-height: 90vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 0.5rem;
}
.bt-close {
    position: absolute;
    top: 1rem;
    right: 0;
}

@-moz-document url-prefix() {
  .bt-close{
    right: 1rem;
  }
}

@media (max-width: 768px) {
    .modal {
        position: fixed;
        left: 0;
        top: auto;
        bottom: 54px;
        transform: translateY(0);
        z-index: 30;
        width: 100%;
    }
    .modal [data-card] {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
}
</style>

<style lang="css">
/* анимация модального окна */
.zoom-out-enter-from >*:first-child,
.zoom-out-leave-to >*:first-child{
    -webkit-transform: translate(-50%, -50%) scale(1.1);
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0;
    transition: all ease-in-out 0.25s;
}


.transY-enter-active >*:first-child>*:first-child,
.transY-leave-active >*:first-child>*:first-child {
    transition: all 0.25s ease-out;
}

.transY-enter-from >*:first-child>*:first-child,
.transY-leave-to >*:first-child>*:first-child {
    opacity: 0;
    transform: translateY(120%);
}
</style>