<template>
    <Panel :mode="'primary'">
        <Flex class="gap-8" :align="'flex-start'">
            <div class="none --md:block">
                <Group :tag="'ul'" class="gap-3" :class="className['menu']">
                    <li v-for="item in PAGE_USER" :key="item.title">
                        <Button
                        :tag="'nuxt-link'"
                        :to="item.href"
                        :mode="'link'"
                        :text="item.title"
                        :size="'2xl'"
                        class="text-md"/>
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
    middleware: ['user']
})

const className = useCssModule()
</script>

<style lang="css" modules>
.menu {
    min-width: calc((100% / 12) * 3.5);
    max-width: calc((100% / 12) * 3.5);
}
</style>