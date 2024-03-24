<template>
    <div :class="[className[props.mode], className['panel']]">
        <slot></slot>
        <div v-if="mode === 'view'"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    mode: {
        type: String,
        validator(value) {
            return ['view', 'primary', 'card', 'none'].includes(value)
        }
    }
})

const className = useCssModule()
</script>

<style lang="css" module>
.panel {
    min-height: 70vh;
}
.panel:empty {
    height: 70vh;
}
.view {
    display: flex;
    flex-direction: column;
    gap: 6.25rem;
    padding-top: 0.5rem;
}
.view:empty {
    height: 70vh;
}
.primary {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
    padding: 3.125rem 0 6.25rem 0;
}
@media (max-width: 768px) {
    .view {
        gap: 5.25rem;
    }  
}

@media (max-width: 640px) {
    .view {
        gap: 4.75rem;
    }  
}
</style>