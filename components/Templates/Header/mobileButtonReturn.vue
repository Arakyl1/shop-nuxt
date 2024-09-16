<template>
    <UITBlockFlex
    :class="$style.header"
    :justify="'between'"
    class="gap-10 /md:hidden w-full">
        <UITButton
        :mode="'yellow-icon'"
        :icon-left="{ icon: 'arrow-right' }" />
        
        <UITParagraphTitle
            :text="title"
            :tag="'h3'"
            :before-content="beforeContent"
            :before-content-class="'text-xs text-medium'">
            <slot v-if="!title"/>
        </UITParagraphTitle>

        <div/>
    </UITBlockFlex>
</template>

<script setup>
import { UITBlockFlex, UITParagraphTitle, UITButton } from "#components";

defineProps({
    title: {
        type: [String, Number],
    },
    beforeContent: {
        type: [String, Number],
    },
    function: () => false,
})

</script>

<style lang="css" module>
.header {
    height: 3.625rem;
    padding: 0 1.25rem;
    border-bottom: 1px solid var(--gray-500);
    background-color: var(--white);
}
</style>