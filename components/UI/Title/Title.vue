<template>
    <component :is="tag" :class="rootClass">
        <span v-if="afterContent" :class="[afterContentClass]">{{ afterContent }}</span>
        <span v-else-if="$slots.afterContent" :class="[afterContentClass]">
            <slot name="after-content"></slot>
        </span>
        <span v-if="text">{{ text }}</span>
        <span v-else-if="$slots.default">
            <slot name="default"></slot>
        </span>


        <span v-if="beforeContent" :class="[beforeContentClass]">{{ beforeContent }}</span>
        <span v-else-if="$slots.beforeContent" :class="[beforeContentClass]">
            <slot name="before-content"></slot>
        </span>

    </component>
</template>

<script setup lang="ts">

interface Props {
    tag?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6',
    text?: string | number,
    afterContent?: string | number,
    beforeContent?: string | number,
    afterContentClass?: string,
    beforeContentClass?: string,
    size?: 'lg'|'2xl'|'4xl'|'5xl',
    mode?: 'primary'|'secondary'|'link'|'none'
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'h2',
    size: '4xl',
})


const title = useCssModule()

const rootClass = computed(() => {
    return {
        [title['title']]: true,
        ['text-' + props.size]: props.size,
        [title['title-' + props.mode]]: props.mode
    }
})

</script>

<style lang="scss" module>
.title {
    position: relative;
}
.title span {
    color: inherit;
}

.title-primary {
    font-weight: 600;
    color: var(--dark-600);
}

.title-secondary {
    font-weight: 700;
    color: var(--rose-500);
}

</style>
