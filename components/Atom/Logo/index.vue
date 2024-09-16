<template>
    <div class="h-9">
        <img src="@/assets/img/logo.png" :alt="`Logo market place ${config.public.NAME_APP}`" >
    </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
</script>