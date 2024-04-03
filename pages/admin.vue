<template>
    <NuxtPage :transition="{ 'mode': 'in-out', name: 'blur' }"/>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['1-auth']
})
</script>