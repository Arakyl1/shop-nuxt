<template>
    <div :class="rootClass" :data-card="instanse!.uid">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
// import { AppScreen } from 'type/type';

export type Padding = `${number}rem` | `${number}rem ${number}rem`

export interface Props {
    mode?: 'primary' | 'secondary' |'outline',
    appearance?: 'warning' | 'info' | 'grey' | 'gradient' | 'white',
    content?: 'text',
    rounded?: 'none'|'xs'|'sm'|'base'|'lg'|'xl'|'2xl'|'full',
    container?: 'xs'|'sm'|'m'|'lg'|'l'|'xl'|'2xl'|'3xl'
    padding?: Padding,
    padding1024?: Padding,
    padding768?: Padding,
    paddingMob?: Padding
}

const props = defineProps<Props>()

// const _screen = useState<AppScreen>('APP_SCREEN')
const instanse = getCurrentInstance()
const className = useCssModule()

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
        [`rounded-${props.rounded}-imp`]: props.rounded,
    }
})

</script>

<style lang="scss" module>
.card {
    
    background-color: var(--white);
}

.card-outline {
    border: 1px solid var(--grey-700);
    border-radius: 10px;
    box-shadow: 0px 1px 3px 0px var(--grey-300);
}

.card-primary{
    border-radius: var(--rounded-lg);
    box-shadow: 0px 2px 9px 0px var(--grey-600);
}
.card-white {
    background: var(--white);
}
.card-warning {
    background: var(--card-bg-warning);
}
.card-grey{
    background: var(--grey-300)
}

.card-gradient{
    background: linear-gradient(128deg, #BCFF9C 7.35%, #DCF99D 40.83%, #D3E4A1 65.25%, #F3E09C 159.64%), #FFF;
}

.card-text > * {
    font-size: var(--text-sm) !important;
}

// .card-padding {
//     padding: v-bind('isPadding');
// }

.card-xs {
    padding: 0.75rem;
}
.card-sm {
    padding: 1.125rem;
}
.card-m {
    padding: 1.25rem;
}
.card-lg {
    padding: 1.5rem;
}
.card-l {
    padding: 1.875rem;
}
.card-xl {
    padding: 2.25rem;
}
.card-2xl {
    padding: 1.875rem 1.25rem;
}
.card-2xl {
    padding: 2.5rem;
}



@media (max-width: 620px) {
    .card-lg {
        padding: 1.125rem;
    }
}
</style>
