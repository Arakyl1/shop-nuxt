<template>
    <div class="scrollbar" :class="direction">
        <slot name="container">
            <div :class="$style.Scroll_Wrapper">
                <slot/>
            </div>
        </slot>
    </div>
</template>

<script setup lang="ts">
interface Props {
    direction?: 'ver' | 'hoz';
}

withDefaults(defineProps<Props>(), { direction: 'ver' });
</script>

<style lang="css" module>
.Scroll_Wrapper {
    padding-right: 3px;
}
</style>
