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
import { computed, useCssModule } from 'vue';

interface Props {
    tag?: 'h1' | 'h2' | 'h3' | 'h4';
    text?: string | number;
    afterContent?: string | number;
    beforeContent?: string | number;
    afterContentClass?: string;
    beforeContentClass?: string;
    mode?: 'primary';
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'h2'
});

const className = useCssModule();

const rootClass = computed(() => {
    return {
        [className['title']]: true,
        [className['title-' + props.mode]]: props.mode
    };
});
</script>

<style lang="scss" module>
.title {
    position: relative;
    font-weight: 700;
    color: var(--text-01);
}

.title > span {
    line-height: inherit;
    color: inherit;
}

h1 {
    font-size: var(--text-3xl);
    line-height: 38px;
}

h2 {
    font-size: var(--text-2xl);
    line-height: 34px;
}

h3 {
    font-size: var(--text-xl);
    line-height: 34px;
}

h4 {
    font-size: var(--text-lg);
    line-height: 28px;
}
</style>
