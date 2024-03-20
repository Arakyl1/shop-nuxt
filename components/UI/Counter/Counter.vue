<template>
    <div ref="counter" :class="[className['body'], className[mode]]">
        <button
        class="w-4 aspect-ratio relative"
        :class="{ 'no-drop': minValue === count }"
        data-attribute="minus"
        @click="() => !props.readonly ? minus() : null" >
            <span ></span>
        </button>

        <p class="text-md"
        :class="[minValue === maxValue ? 'text-gray-500' : 'text-blue-300', className['value']]"
        >{{ count }}</p>

        <button 
        class="w-4 aspect-ratio relative"
        :class="{ 'no-drop': maxValue === count }"
        data-attribute="plus"
        @click="() => !props.readonly ? plus() : null">
            <span></span>
            <span data-vertical ></span>
        </button>
    </div>
</template>
<script setup lang="ts">

interface Props {
    value?: number
    maxValue?: number,
    minValue?: number,
    mode?: 'primary',
    readonly?: boolean
}
const props = withDefaults(defineProps<Props>(),{
    minValue: 1,
    maxValue: 1,
    value: 1,
    mode: 'primary',
    readonly: false
})

const emit = defineEmits<{
    (e: 'update:value', value: number): void
}>()

const count = ref(props.value ? props.value : 1)
const className = useCssModule()
const activePointer = ref<boolean>(false)
const counter = ref<HTMLElement | null>(null)
const timer = ref()
const timerPointer = ref()


onMounted(() => {
    if (props.readonly && counter.value instanceof HTMLElement) {
        counter.value.addEventListener('pointerdown', onPointerDown)
        counter.value.addEventListener('pointerup', onPointerUp)
    }
})

onBeforeUnmount(() => {
    if (props.readonly && counter.value instanceof HTMLElement) {
        counter.value.removeEventListener('pointerdown', onPointerDown)
        counter.value.removeEventListener('pointerup', onPointerUp)
    } 
})

watch(() => count.value, (newCount) => emit('update:value', newCount))

function minus() {
    count.value = count.value > props.minValue ? count.value - 1  : count.value 
}

function plus() {
    count.value = count.value < props.maxValue ? count.value + 1  : count.value
}

function activeCounter(key:string, time: number = 400) {
    switch (key) {
        case 'minus': {
            minus()
            break;
        }
        case 'plus': {
            plus()
            break;
        }
    } 
    if (activePointer.value) {
        timerPointer.value = setTimeout(()=> {
            activeCounter(key, time > 50 ? time - 50 : time)
        }, time)
    }
}

function onPointerDown({ target }: PointerEvent) {
    if (target instanceof HTMLElement) {
        const _target = target.closest('[data-attribute]')
        if (!_target) return null
        const valueAttr = (_target as HTMLElement).dataset.attribute as string
        timer.value = setTimeout(() => {
            activePointer.value = true
            activeCounter(valueAttr)
        }, 1000)
    }
}

function onPointerUp({ target }: PointerEvent) {
    clearTimeout(timerPointer.value)
    clearTimeout(timer.value)
    activePointer.value = false
}
</script>

<style lang="css" module>
/* purgecss ignore */
.body {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: all ease-in-out 0.3s;
}

.primary {
    padding: 0.75rem 1rem;
    background-color: var(--white);
    border: 1px solid var(--gray-300);
    border-radius: var(--rounded-lg);
}
.primary > button > span {
    width: 100%;
    height: 1px;
    background-color: var(--black-500);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.primary > button > span[data-vertical] {
    transform: translate(-50%, -50%) rotate(90deg); 
}

@media (max-width: 640px) {
    .primary > button {
        height: 0.75rem;
    }
    .value {
        font-size: var(--text-base);
    }
}
</style>