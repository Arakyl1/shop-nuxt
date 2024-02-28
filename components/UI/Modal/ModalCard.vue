<template>
    <div :class="className['container']" ref="modal">
        <Transition :name="animationModal" >
            <div v-show="isActive" :class="[
                className['modal'],
                bodyClass,`rounded-${rounded || 'xl'}`,
                className['anim-' + animationModal]
                ]"
            tabindex="-1"
            aria-modal="true"
            role="dialog">
                <slot name="body">
                    <Card
                    :container="container"
                    :rounded="rounded"
                    :content="content"
                    data-modal-body="true"
                    :class="[className['body']]"
                    class="scrollbar-v1">
                        <Button v-if="btClose"
                        :icon-left="{ key: 'close', size: '20_20' }"
                        @click="onClick"
                        :appearance="'gray-icon'"
                        :class="className['bt-close']"
                        data-modal-bt-close="true"/>
                        <slot></slot>
                    </Card>
                </slot>
            </div>
        </Transition>
        <Mask
            :active="isActive"
            :appearance="appearance"
            :animation="animation"
            :animation-mobile="animationMobile"
            :fun="onClose"
            :position="'relative'"/>
    </div>
</template>

<script setup  lang="ts">
import Button from "@/components/UI/Button/Button.vue";
import { default as Card, type Props as CardProps } from "@/components/UI/Card/Card.vue";
import { default as Mask, type Props as MaskProps } from "@/components/UI/Mask/Mask.vue";

interface Props
    extends Partial<Pick<MaskProps, 'active'|'animation'| 'animationMobile'|'appearance'|'fun'|'hideScroll'>>,
    Partial<Pick<CardProps, 'container'|'content'|'mode'|'rounded'>>
{
    btClose?: boolean,
    onClose?: (...any: any[]) => any,
    bodyClass?: string,
    animationModal?: 'modal' | 'confirm'
}

const props = withDefaults(defineProps<Props>(),  {
    mode: 'primary',
    container: 'xl',
    rounded: 'xl',
    content: 'text',
    btClose: true,
    appearance: 'dark',
    animation: 'scale',
    animationModal: 'modal',
    onClose: () => false
})

const emit = defineEmits(['close'])

// const screen = useState('APP_SCREEN')
const isActive = ref(props.active || false)
const className = useCssModule()
const modal = ref<HTMLElement | null>(null)

defineExpose({ modal })
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
/* .wrapper {
    position: relative;
} */
.container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 0px;
    z-index: 999;
}

.modal {
    position: absolute;
    top: 50vh;
    left: 50vw;
    z-index: 100;
    overflow: hidden;
    height: min-content;
    
}
.modal > *:first-child {
    max-height: 85vh;
}
.anim-modal {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}
.anim-confirm {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
}

.body {
    position: relative;
    min-height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
    /* padding-right: 0.5rem; */
    z-index: 100;
}
.bt-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
}

@-moz-document url-prefix() {
  .bt-close{
    right: 1rem;
  }
}

@media (max-width: 768px) {
    .anim-modal {
        transform: translateY(0);
        opacity: 1;
        position: fixed;
        left: 0;
        bottom: 0;
        top: auto;
        width: 100%;
    }
    .modal [data-card] {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
}
</style>
