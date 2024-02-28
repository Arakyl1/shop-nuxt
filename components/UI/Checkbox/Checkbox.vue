<template>
    <div :class="className['root']" >
        <input type="checkbox"
        :checked="Boolean(checked)"
        ref="checkbox"
        :class="className['input']"
        v-bind="{ ...attr?.attr! }"
        hidden>
        <div :class="rootClass" @click.stop="onClick"
        :tabindex="attr?.disabled ? -1 : 1"
        @keyup.stop.enter="checkbox?.click()">
                <CreateIcon :name="icon" :class="className['svg']" />
        </div>
        <Paragraph v-if="text"
            :for="attr?.attr?.id"
            :tag="'label'"
            :text="text"
            :line="1"
            :class="className['text']"
            class="cursor-pointer"
            @click="checkbox?.click()"/>
    </div>
</template>


<script setup lang="ts">
import { default as CreateIcon, NameIcon } from "@/utils/icon/create";
import Paragraph from "@/components/UI/Paragraph/Paragraph.vue";

export interface Props {
    mode?: 'primary' | 'secondary' | 'outline',
    icon?: `${NameIcon}_${number}_${number}`,
    text?: string | number,
    checked?: boolean,
}

const props = withDefaults(defineProps<Props>(),{ icon: 'checkbox-1_15_15', checked: false })
const checkbox = ref<HTMLInputElement | null>(null)
const className = useCssModule()
const attr = useAttrs()
const observer = ref<MutationObserver | null>(null)

const rootClass = computed(() => {
   return [
       [className['checkbox']],
       [ props.mode ? className['checkbox-' + props.mode] : '' ],
   ]
})

onMounted(() => {
    if (checkbox.value instanceof HTMLInputElement) {
        observer.value = new MutationObserver((mutationList, observer) => {
            const _elem = mutationList[0].target as HTMLInputElement
            _elem.checked = props.checked 
        })
        observer.value.observe(checkbox.value, { attributes: true })
    }
})

onBeforeUnmount(() => {
    if (checkbox.value && observer.value) {
        observer.value.disconnect()
    }
})


function onClick() {
    if (checkbox.value instanceof HTMLInputElement) {
        checkbox.value.click()
    }
}
</script>

<style lang="css" module>
.root{
    display: flex;
    align-items: center;
    gap: 0 0.5rem;
    height: 1.25rem;
}

.checkbox{
    position: relative;
    height: 100%;
    aspect-ratio: 1;
    border-radius: var(--checkbox-rounded);
    border: 2px solid var(--checkbox-border-color);
}
.text {
    font-size: 1em;
}
.svg {
    height: 100%;
    width: 100%;
}
.svg > g{
    stroke-width: 2px;
}
.checkbox:hover {
    border-color: var(--checkbox-border-color--hover);
}
.checkbox:hover .svg > g {
    stroke: var(--checkbox-border-color--hover);
}
.input:checked ~ .checkbox {
    border-color: var(--checkbox-border-color--active);
    background-color: var(--checkbox-background-color--active);
}
.input:checked ~ .checkbox .svg > g {
    stroke: var(--checkbox-stroke-color--active);
}
</style>