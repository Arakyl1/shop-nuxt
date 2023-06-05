<template>
    <select class="p-2 rounded-md text-gray-300 w-full focus-visible:outline-none" :value="option ? option : ''">
        <option class="text-gray-300"></option>
        <template v-for="item in list" :key="item">
            <slot>
                <option class="text-gray-300" >
                    {{ item }}
                </option>
            </slot>
        </template>
    </select>
</template>
<script setup lang="ts">
const props = defineProps<{ list: (string | number)[], option?: string }>()
</script>