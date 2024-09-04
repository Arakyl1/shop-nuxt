<template>
    <picture :class="rootClass">
        <ClientOnly>
            <img
                :src="imgSrc"
                :alt="props?.alt || 'image'"
                :class="[$style.Image, { [props.customClass!]: props.customClass }]"
                @error="onError"
            />
        </ClientOnly>
    </picture>
</template>

<script setup lang="ts">
import { computed, ref, useCssModule } from '#imports';
import { ClientOnly } from "#components";

import { type CSS_BORDER_RADIUS } from '../../type/index';

export interface Props {
    src?: string;
    alt?: string;
    square?: boolean;
    rounded?: CSS_BORDER_RADIUS;
    customClass?: string;
    defaultImage?: string;
}

const props = withDefaults(defineProps<Props>(), {
    alt: 'image',
    square: true,
    rounded: 'lg',
    defaultImage: '/img/fake/product.png'
});

const checkPropImage = ref(true);
const className = useCssModule();

const rootClass = computed(() => {
    return {
        [className['Body']]: true,
        'aspect-ratio': props.square,
        [`rounded-${props.rounded}`]: props.rounded
    };
});

const imgSrc = computed(() => {
    return checkPropImage.value && props?.src ? props.src : props.defaultImage;
});

function onError() {
    checkPropImage.value = false;
}
</script>

<style lang="css" module>
.Body {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--base-03);
}

.Image {
    min-width: 100%;
    min-height: 100%;
    object-fit: contain;
}
</style>
