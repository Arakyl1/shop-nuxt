<template>
<div>
    <div class="h-full border-l border-blue-100 p-4 min-w-[40vw] lg:min-w-[65vw]">
        <ul class="flex flex-wrap flex-col h-full">
            <HeaderSelectAditionalItem v-for="item in subcategor.children" :item="item" :key="item.name"
            class="w-1/2"/>
        </ul>
    </div>
</div>
</template>
<script setup lang="ts">
defineProps<{ subcategor: { name: string, children: []} }>()
</script>