<template>
    <div :class="rootClass" :data-card="instanse?.uid" :data-uid="instanse?.uid" ref="card">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
// import { AppScreen } from 'type/type';
import { CSS_BORDER_RADIUS } from "@/type/intex";

export type Padding = `${number}rem` | `${number}rem ${number}rem`


export interface Props {
    mode?: 'primary' | 'secondary' |'outline',
    appearance?: 'warning' | 'info' | 'gray' | 'gradient' | 'white',
    content?: 'text',
    rounded?: CSS_BORDER_RADIUS,
    container?: 'xs'|'sm'|'lg'|'xl'|'2xl'|'3xl'
    padding?: Padding,
    padding1024?: Padding,
    padding768?: Padding,
    paddingMob?: Padding
}

const props = defineProps<Props>()

// const _screen = useState<AppScreen>('APP_SCREEN')
const instanse = ref()
const className = useCssModule()
const card = ref<HTMLElement | null>(null)

// const isPadding = computed(() => {
//   const sr = unref(_screen)
//   if (!sr) return
//   const breakMin = sr?.breakpointsMin

//   return sr && breakMin[1280] ? props.padding :
//     breakMin[1024] ? props.padding1024 || props.padding :
//     breakMin[768] ? props.padding768 || props.padding1024 || props.padding :
//     props.paddingMob || props.padding768 || props.padding1024 || props.padding
// })

const rootClass = computed(() => {
    return {
        [className['card']]: true,
        [className['card-' + props.container]]: props.container,
        // [className['card-padding']]:  props.padding || props.padding1024 || props.padding768 || props.paddingMob,
        [className['card-' + props.mode]]: props.mode,
        [className['card-' + props.appearance]]: props.appearance,
        [className['card-' + props.content]]: props.content,
        [`rounded-${props.rounded}`]: props.rounded,
    }
})
onMounted(() => {
    instanse.value = getCurrentInstance()
})

// defineExpose({ card })

</script>

<style lang="scss" module>
/* purgecss ignore */
.card {
    background-color: var(--white);
}

.card-outline {
    border: 1px solid var(--gray-700);
    border-radius: var(--rounded-lg);
    box-shadow: 0px 2px 3px 0px var(--gray-300);
}

.card-primary{
    border-radius: var(--rounded-lg);
    box-shadow: 0px 2px 9px 0px var(--gray-300);
}
.card-white {
    background: var(--white);
}
.card-warning {
    background: var(--invalid);
}
.card-gray{
    background: var(--gray-100)
}

.card-text > * {
    font-size: var(--text-sm) !important;
}


.card-xs {
    padding: 0.75rem;
}
.card-sm {
    padding: 1.125rem;
}

.card-lg {
    padding: 1.5rem;
}

.card-xl {
    padding: 2rem;
    border-radius: var(--rounded-xl);
}

.card-3xl {
    padding: 3rem 2rem;
}


 @media (max-width: 1024px) {
    .card-xl {
        padding: 1.5rem;
    }
}
@media (max-width: 640px) {
    .card-lg {
        padding: 1.125rem;
    }
    .card-xl {
        padding: 1rem;
    }
}
</style>
