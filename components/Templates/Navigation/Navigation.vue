<template>
    <Group :tag="'ul'" class="gap-3 w-full">
        <li v-for="item in data" :key="item.title">
            <Button :tag="'nuxt-link'" :to="item.href" :mode="'link'" :text="item.title" class="text-md"
                :active="route.path === item.href"
                :style="{ '--color': 'var(--gray-500)', '--color-active': 'var(--black-500)' }" />
        </li>
    </Group>
</template>

<script setup lang="ts">
import Panel from "@/components/UI/Panel/Panel.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue"

interface Props {
    data: Array<{ title: string, href: string }>
}

const props = defineProps<Props>()

const route = useRoute()
</script>