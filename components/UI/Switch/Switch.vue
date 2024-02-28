<template>
    <div :class="rootClass"  @click.stop="onClick" tabindex="-1">
        <input :class="className['input']"
            type="checkbox" hidden
            ref="checkbox"
            role="switch"
            :name="name?.toString()"
            :value="isValue">
            <template v-if="mode === 'primary'">
                <div :class="className['switch']">
                    <div :class="className['body']"></div>
                    <div :class="className['circle']" class="shadow shadow-gray-300" @click.stop></div>
                </div>
            </template>
            <template v-else-if="mode === 'secondary'">
                <div :class="className['switch']">
                    <div :class="className['body']">
                        <div :class="className['circle']"></div>
                    </div>
                </div>
            </template>
    </div>
</template>

<script setup lang="ts">

export interface Props {
    name?: string | number,
    value?: string | number,
    mode?: 'primary' | 'secondary',
    appearance?: 'red' | 'blue' | 'dark' | 'green'
}
const props = withDefaults(defineProps<Props>(), { mode: 'secondary', appearance: 'blue' })

const checkbox = ref<HTMLInputElement | null>(null)
const className = useCssModule()
const isValue = ref(props.value)
const rootClass = computed(() => {
    return {
        [className['container']]: true,
        [className[props.mode]]: props.mode,
        [className[props.appearance]]: props.appearance
    }
})

onMounted(() => {
    if (checkbox.value instanceof HTMLInputElement && !props.value) {
        isValue.value = checkbox.value.value
    }
})

watch(() => props.value,(newV) => {
    isValue.value = newV
})

function onClick() {
    if (checkbox.value instanceof HTMLInputElement) {
        checkbox.value.click()
    }
}

// function onChange({ target }: Event) {
//     if (target instanceof HTMLInputElement) {
//         isValue.value = target.checked
//     }
// }
</script>


<style lang="css" module>
.container {
    display: inline-block;
    height: 1.25rem;
    font-size: 1.25rem;
}
.container:focus-visible {
    outline: none;
}

.switch {
    width: 100%;
    display: flex;
    align-items: center; 
    border-radius: 9999px;
    transition: var(--input-transitions--sm);
}

.body {
    width: 100%;
    border-radius: 9999px;
    transition: var(--input-transitions--sm);
}
.body:focus-visible {
    outline: none;
}
.circle {
    height: 100%;
    aspect-ratio: 1/1;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0);
    transition: var(--input-transitions--sm);
    border-radius: 9999px;
}
.circle:focus-visible {
    outline: none;
}


/* Primary style */
.primary {
    aspect-ratio: 2.15/1;
}
.primary .switch {
    aspect-ratio: 2.15/1;
    position: relative;
}
.primary .body {
    aspect-ratio: 3/1;
    background-color: var(--body-background);
}
.primary .circle {
    background-color: var(--circle-background);
    box-shadow: 0px 0.7px 2px 0px rgba(0, 0, 0, 0.24);
    border: 0.3px solid var(--gray-100);
}

.primary .input:checked ~ .switch .body {
    background-color: var(--body-background--active); 
}
.primary .input:checked ~ .switch .circle {
    transform: translateX(120%);
    background-color: var(--circle-background--active);
}
/* Secondary style */
.secondary {
    aspect-ratio: 2.6/1; 
}
.secondary .switch {
    aspect-ratio: 2.45/1;
    padding: 3px;
    background-color: var(--switch-background);
}
.secondary .body {
    aspect-ratio: 2.6/1;
    position: relative;
}
.secondary .circle {
    background-color: var(--circle-background);
}
.secondary .input:checked ~ .switch {
    background-color: var(--switch-background--active);
}
.secondary .input:checked ~ .switch .circle{
    transform: translateX(160%);
    background-color: var(--circle-background--active);
}

/* appearance style */
.blue {

    --switch-background: var(--gray-300);
    --body-background: var(--gray-300);
    --circle-background: var(--white);

    --switch-background--active: var(--blue-500);
    --body-background--active: var(--blue-500);
    --circle-background--active: var(--white);
}
.red {
    --switch-background: var(--gray-300);
    --body-background: var(--gray-300);
    --circle-background: var(--white);

    --switch-background--active: var(--red-500);
    --body-background--active: var(--red-500);
    --circle-background--active: var(--white);
}

.green {
    --switch-background: var(--gray-300);
    --body-background: var(--gray-300);
    --circle-background: var(--white);

    --switch-background--active: var(--valid);
    --body-background--active: var(--valid);
    --circle-background--active: var(--white);
}
.dark {
    --switch-background: var(--gray-300);
    --body-background: var(--gray-300);
    --circle-background: var(--white);

    --switch-background--active: var(--black-700);
    --body-background--active: var(--black-700);
    --circle-background--active: var(--white);
}
</style>
