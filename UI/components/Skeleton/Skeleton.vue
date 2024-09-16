
<template>
    <component
:is="tag" :hidden="!loader" :class="[
        animated ? 'liner__gradient-loader animate-loader-data' : `bg-${baseColor}`,
        $style.body, `rounded-${rounded}`, `SkeM_${mode}`
    ]">_</component>
</template>

<script setup lang="ts">
import { defaultAttrforUI, type CSS_BORDER_RADIUS, type SkeletonMode } from "../../type/index";
interface Props {
    tag?: string,
    animated?: boolean,
    rounded?: CSS_BORDER_RADIUS,
    mode?: SkeletonMode;
    loader?: boolean,
    baseColor?: string
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'div',
    baseColor: defaultAttrforUI.skeletonBaseColor,
    mode: defaultAttrforUI.skeletonDefaultMode,
    rounded: defaultAttrforUI.skeletonDefaultRounded
})
// const className = useCssModule()
</script>

<style lang="css" module>
/* purgecss ignore */
.body {
    color: var(--transparent);
    background-origin: content-box;
    width: 100%;
}
</style>
