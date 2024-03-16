<template>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"
    :height="size.split('_')[0]!"
    :width="size.split('_')[1]!"
    aria-hidden="true">
        <use :href="`#${icon}`" :type-icon="type"/>
    </svg>
</template>

<script setup lang="ts">
import { ICON_ID_NAME } from 'type/intex';

export interface Props {
    icon: ICON_ID_NAME,
    size?: `${number}_${number}`,
    type?: 'monocolor'|'outline'|'none'
}


const props = withDefaults(defineProps<Props>(), {
    size: '24_24',
    type: 'monocolor'
})
</script>