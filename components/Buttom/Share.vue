<template>
<ButtomStandart @click="copyLink">
    <IconsShare/>
</ButtomStandart>
</template>

<script setup lang="ts">
import IconsShare from '~~/components/Icon/IconsShare.vue';
import { alertContent } from "@/pinia/store";

const alertContentFun = alertContent()

async function copyLink() {
    const permissionToUseClipboard = await navigator.permissions.query({ name: "clipboard-write" })
    if (permissionToUseClipboard.state === "granted" || permissionToUseClipboard.state === "prompt") {
        navigator.clipboard.writeText(window.location.href)
        alertContentFun.updateContent('Ссылка скопирована')
    }
}
addEventListener('')
</script>