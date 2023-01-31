<template>
    <slot v-bind="{ createReview }"></slot>
</template>

<script setup lang="ts">
async function createReview(data: object, ranting: number[] | [], id: number) {
    if (!data) return
    const res = await createCommit(data)
    if (res) {
        const averageValue = Math.round([data.ranting, ...ranting].reduce((s, m) => s + m, 0) / (ranting.length + 1))
        return await updateProduct({
            where: { id: id },
            data: { ranting: averageValue },
            select: { id: true }
        })
    } else { return res }
}
</script>