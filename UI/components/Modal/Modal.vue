<template>
    <div ref="modal" :class="$style.container">
        <Transition :name="animationModal">
            <div
                v-show="isActive"
                :class="[$style.modal, bodyClass, $style['anim-' + animationModal]]"
                tabindex="-1"
                aria-modal="true"
                role="dialog"
            >
                <slot name="body" v-bind="{ isActive, onClick }">
                    <!-- Для разных приложений эту часть можно подстраивать под необходимый дизайн -->
                    <Card v-bind="{ rounded, container }" :appearance="'white'" data-modal-body="true" :class="$style.body">
                        <Button
                            v-if="btClose"
                            :icon-left="{ icon: 'close', size: '24_24' }"
                            :class="$style['bt-close']"
                            :appearance="'gray-icon'"
                            data-modal-bt-close="true"
                            @click="onClick"
                        />
                        <slot v-bind="{ isActive, onClick }"></slot>
                    </Card>
                </slot>
            </div>
        </Transition>
        <Mask v-bind="{ appearance, animation }" :active="isActive" :fun="onClose" :position="'relative'" class="h-screen" />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import Card from '../Block/Card.vue';
import Mask from '../Mask/Mask.vue';
import Button from '../Button/Button.vue';
import type { Props as CardProps } from '../Block/Card.vue';
import type { Props as MaskProps } from '../Mask/Mask.vue';

interface Props
    extends Partial<Pick<MaskProps, 'active' | 'animation' | 'appearance' | 'fun' | 'hideScroll'>>,
        Partial<Pick<CardProps, 'mode' | 'rounded' | 'container'>> {
    btClose?: boolean;
    onClose?: (...any: any[]) => any;
    bodyClass?: string;
    animationModal?: 'modal' | 'confirm';
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'primary',
    rounded: 'xl',
    btClose: true,
    container: 'lg',
    appearance: 'dark',
    animation: 'scale',
    animationModal: 'modal',
    onClose: () => false
});

const emit = defineEmits(['close']);

const isActive = ref(props.active || false);
const modal = ref<HTMLElement | null>(null);

defineExpose({ modal, isActive, onClick });
watch(
    () => props.active,
    (newV, oldV) => {
        if (newV !== oldV) {
            isActive.value = newV;
        }
    }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onClick() {
    if (props.onClose) {
        props.onClose();
    } else {
        isActive.value = false;
        emit('close', isActive.value);
    }
}
</script>

<style lang="css" module>
.container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 0;
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
    min-height: min-content;
    max-height: 100svh;
}

.anim-modal {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

.anim-confirm {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

.body {
    position: relative;
    z-index: 100;
    overflow: hidden;
    min-height: 150px;
    transition: all ease-in-out 0.5s;

    /* padding-right: 0.5rem; */
}

button.bt-close {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
}

@-moz-document url-prefix() {
    .bt-close {
        right: 1rem;
    }
}

/* @media (max-width: 768px) {
    .modal {
        height: 85svh;
    }
    .body {
        height: 100%;
    }
    .anim-modal {
        transform: translateY(0);
        opacity: 1;
        position: fixed;
        left: 0;
        bottom: 0;
        top: 15svh;
        width: 100%;
    }
    .modal [data-card] {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        padding-top: 3rem;
        padding-bottom: 2rem;
        width: 100%;
    }
} */
</style>
