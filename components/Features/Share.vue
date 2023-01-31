<template>
    <slot v-bind="{ copyLink }"></slot>
</template>

<script setup lang="ts">
const { createAlert } = useAlert()

async function copyLink() {
    const permissionToUseClipboard = await navigator.permissions.query({ name: "clipboard-write" })
    if (permissionToUseClipboard.state === "granted" || permissionToUseClipboard.state === "prompt") {
        navigator.clipboard.writeText(window.location.href)
        createAlert('Ссылка скопирована')
    }
}
</script>