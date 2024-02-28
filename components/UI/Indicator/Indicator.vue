<template>
    <div class="relative" :data-indicator="instanse?.uid" :data-uid="instanse?.uid">
        <slot></slot>
        <div v-show="active" :class="rootClass">
            <template v-if="mode === 'secondary'">
                <template v-if="!$slots.indicator">{{ text }}</template>
                <slot v-else name="indicator"></slot>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    active?: boolean,
    text?: string|number,
    mode?: 'primary'|'secondary',
    appearance?: 'white'|'black'|'gray'|'red'|'blue'|'green'|'yellow',
}

const props = withDefaults(defineProps<Props>(), {
    active: true,
    mode: 'secondary',
    appearance: 'blue'
})

const instanse = ref()
const className = useCssModule()

const rootClass = computed(() => {
    return {
        [className['indicator']]: true,
        [className[props.mode]]: props.mode
    }
})

onMounted(() => {
    instanse.value = getCurrentInstance()
})
</script>

<style lang="css" module>
.indicator {
    position: absolute;
}
.secondary {
    border-radius: var(--rounded-lg);
    padding: 0.125rem 0.31rem;
    background-color: var(--blue-500);
    transform: translate(50%, 50%);
    bottom: 0.25rem;
    right: 0.25rem;
    color: var(--white);
    font-size: 0.75rem;
    font-weight: 700;
}
</style>