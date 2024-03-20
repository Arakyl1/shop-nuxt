
<template>
    <component :is="tag" :hidden="!loader" :class="[
        animated ? 'liner__gradient-loader animate-loader-data' : baseColor,
        className['body']
    ]">_</component>
</template>

<script setup lang="ts">

interface Props {
    tag?: string,
    animated?: boolean,
    loader?: boolean,
    baseColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'div',
    baseColor: 'bg-gray-100'
})
const className = useCssModule()
</script>

<style lang="css" module>
/* purgecss ignore */
.body {
    color: var(--transparent);
    border-radius: var(--rounded-base);
    background-origin: content-box;
    width: 100%;
}
</style>
