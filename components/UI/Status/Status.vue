<template>
    <p v-if="status"
        :class="{
            [bgColorByStatus[status]]: status,
            [className['status']]: true
        }">
        {{ status ? textByStatus[status] : '' }}
    </p>
</template>
<script setup lang="ts">

export interface Props {
    status?: 'news' | 'discount' | null
}

const props = defineProps<Props>()
const textByStatus = {
    news: 'news',
    discount: 'sell'
}
const bgColorByStatus = {
    news: 'bg-yellow-500',
    discount: 'bg-red-500' 
}

const className = useCssModule()
</script>

<style lang="css" module>
.status {
    color: var(--white);
    text-transform: uppercase;
    position: absolute;
    padding: 0.25rem 0.75rem;
    border-radius: var(--rounded-base);
    z-index: 20;
}
.status[data-left] {
    left: 0rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>