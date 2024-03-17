<template>
    <NuxtPage></NuxtPage>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['account-reviews']
})
</script>