<template>
<div></div>
<!-- <Panel :mode="'primary'">
        <Flex class="gap-8" :align="'flex-start'">
            <div class="">
                <ListLinks :data="PAGE_ADMIN"/>
            </div>
        </Flex>
    </Panel> -->
</template>

<script setup lang="ts">
// import Panel from "@/components/UI/Panel/Panel.vue";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import ListLinks from "@/components/UI/List/Links.vue";
import { t } from "#imports";
import { PAGE_ADMIN } from '@/utils/router'

definePageMeta({
    title: t('PAGE_META.ADMIN.TITLE')
})
const route = useRoute()
</script>