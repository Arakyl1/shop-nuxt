<template>
    <div></div>
     <!-- <NuxtPage :transition="{ name: 'blur' }" mode="out-in"/> -->
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ['1-auth']
})
</script>