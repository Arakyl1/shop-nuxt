<template>
    <Flex class="w-full gap-1" >
        <Input type="number"
            v-bind="{ ...attr }"
            :name="section.from.name"
            :placeholder="section.from.placeholder"
            :step="section.from.step"
            :min="section.to.min"
            :max="section.from.max"
            :class="className['item']"
            :data-to="value.to || false"
            @input="(e) => (value.from = (e.target as HTMLInputElement).valueAsNumber)" />
        <p class="text-center grow">:</p>
        <Input type="number"
            v-bind="{ ...attr }"
            :placeholder="section.to.placeholder"
            :name="section.to.name"
            :step="section.to.step"
            :min="value.from > 0 ? value.from : section.to.min"
            :max="section.to.max"
            :class="className['item']"
            :data-from="value.from || false"
            @input="(e) => (value.to = (e.target as HTMLInputElement).valueAsNumber)" />
    </Flex>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import {default as Input, Props as InputProps } from "@/components/UI/Input/Input.vue";

interface Props extends Pick<InputProps, 'readonly'|'required'|'disabled'|'mode'> {
    section: {
        title: string
        from: { name: string, min: number, max: number, placeholder: string, step: number }
        to: { name: string, min: number, max: number, placeholder: string, step: number }
    }
}

const props = defineProps<Props>()
const value = ref<{ from: number, to: number }>({ from: 0, to: 0 })
const className = useCssModule()

const attr = computed(() => Object.fromEntries(Object.entries(props).filter((_) => _[0] !== 'section')))

</script>

<style lang="css" module>
/* purgecss ignore */
.item {
    max-width: 47%;
    width: 100%;
}
</style>