<template>
    <li ref="item">
        <slot></slot>
        <div v-if="showSeparator" :class="className['separator']"></div>
    </li>
</template>

<script setup lang="ts">
//import FlexCard from "@/components/UI/FlexCard/FlexCard.vue";

// const flex = ref<InstanceType<typeof FlexCard> | null>(null)
interface Props {
     showSeparator?: boolean
}

const props = withDefaults(defineProps<Props>(), { showSeparator: false })

const item = ref<HTMLElement | null>(null)
// const className = useCssModule()

// onMounted(() => console.log(flex.value))
</script>

<style lang="css" module>
.separator {
  width: 100%;
  height: 1px;
  background-color: var(--separator-background-color);
}
</style>