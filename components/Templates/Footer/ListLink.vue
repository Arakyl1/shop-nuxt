<template>
    <UITBlockGroup class="gap-5" v-if="data" >
        <UITParagraphTitle :text="data!.title" :tag="'h4'" class="text-white" />
        <UITBlockGroup class="gap-2.5">
            <UITButton v-for="item in data!.links" :key="item.id" :mode="'link'" tag="nuxt-link" :text="item.title"
                :to="item.href" :style="{ '--color': 'var(--gray-300)' }" class="text-md" />
        </UITBlockGroup>
    </UITBlockGroup>
</template>

<script setup lang="ts" generic="T extends { title: string, links: { id: string | number, href: string, title: string | number }[] }">
import { UITBlockGroup, UITParagraphTitle, UITButton } from "#components";
defineProps<{ data: T }>()

</script>