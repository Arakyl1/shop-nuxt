<template>
    <div></div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";

const storeUser = _user()
const { data: userData } = storeToRefs(storeUser)
</script>