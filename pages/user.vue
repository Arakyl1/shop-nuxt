<template>
    <Panel :mode="'primary'">
        <Flex class="gap-8" :align="'flex-start'">
            <div class="none /md:block w-1/4">
                <Group :tag="'ul'" class="gap-3" :class="className['menu']">
                    <li v-for="item in PAGE_USER" :key="item.title">
                        <Button
                        :tag="'nuxt-link'"
                        :to="item.href"
                        :mode="'link'"
                        :text="item.title"
                        class="text-md"
                        :active="route.path === item.href"
                        :style="{ '--color': 'var(--gray-500)', '--color-active': 'var(--black-500)'}"/>
                    </li>
                </Group>
            </div>
            
            <NuxtPage :transition="{ 'mode': 'in-out', name: 'blur' }"/>
        </Flex>
    </Panel>
</template>

<script setup lang="ts">
import Panel from "@/components/UI/Panel/Panel.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import { PAGE_USER } from '@/utils/router'
import { PAGE_META } from '@/common/C'

definePageMeta({
    middleware: ['1-auth','2-page-user-route']
})

const route = useRoute()
const className = useCssModule()
</script>

<style lang="css" modules>
.menu {
    min-width: calc((100% / 12) * 3.5);
    max-width: calc((100% / 12) * 3.5);
}
</style>