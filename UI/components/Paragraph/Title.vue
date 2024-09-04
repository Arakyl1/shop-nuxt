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
import  { defaultAttrforUI} from "../../type/index";
import type { CSS_COLOR, CSS_FONT_WEIGHT } from "../../type/index";

interface Props {
    tag?: 'h1' | 'h2' | 'h3' | 'h4';
    text?: string | number;
    afterContent?: string | number;
    beforeContent?: string | number;
    afterContentClass?: string;
    beforeContentClass?: string;
    color?: CSS_COLOR,
    weignt?: CSS_FONT_WEIGHT,
    mode?: 'primary';
}

const props = withDefaults(defineProps<Props>(), {
    tag: 'h2',
    color: defaultAttrforUI.titleDefaultColor
});

const className = useCssModule();

const rootClass = computed(() => {
    return {
        [`color-${props.color}`]: props.color,
        [`textW-${props.weignt}`]: props.weignt,
        [className['title']]: true,
        [className['title-' + props.mode]]: props.mode
    };
});
</script>

<style lang="scss" module>
.title {
    position: relative;
}

.title > span {
    line-height: inherit;
    color: inherit;
}
</style>
