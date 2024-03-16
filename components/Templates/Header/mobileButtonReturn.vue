<template>
    <Flex
    :class="className['header']"
    :justify="'between'"
    class="gap-10 --md:hidden w-full">
        <Button
        :appearance="'black-icon'"
        :icon-left="{ icon: 'arrow-right' }" />
        
        <Title :text="title"
            :tag="'h3'"
            :before-content="beforeContent"
            :before-content-class="'text-xs text-medium'">
            <slot v-if="!title"></slot>
        </Title>

        <div></div>
    </Flex>
</template>

<script setup>
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import Title from "@/components/UI/Title/Title.vue";

const props = defineProps({
    title: {
        type: [String, Number],
    },
    beforeContent: {
        type: [String, Number],
    },
    function: () => false,
})

const className = useCssModule()
</script>

<style lang="css" module>
.header {
    height: 3.625rem;
    padding: 0 1.25rem;
    border-bottom: 1px solid var(--gray-500);
    background-color: var(--white);
}
</style>