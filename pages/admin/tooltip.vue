<template>
    <Panel>
        <Flex class="gap-8" :align="'flex-start'">
            <div class="none /md:block w-1/4">
                <ListLinks :data="PAGE_ADMIN_TOOLTIP"/>
            </div>
            <div class="w-1/2">
                <NuxtPage :transition="{ 'mode': 'in-out', name: 'blur' }"/>
            </div>
        </Flex>
    </Panel>
</template>

<script setup lang="ts">
import Panel from "@/components/UI/Panel/Panel.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import ListLinks from "@/components/UI/List/Links.vue";
import { PAGE_META as META } from "@/common/C";
import { PAGE_ADMIN_TOOLTIP } from '@/utils/router'

definePageMeta({
    title: META.ADMIN__TOOLTIP.TITLE,
    middleware: ['admin-tooltip']
})
const route = useRoute()
</script>