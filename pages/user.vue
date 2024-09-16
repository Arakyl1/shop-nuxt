<template>
    <div></div>
    <!-- <Panel :mode="'primary'">
        <Flex class="gap-8" :align="'flex-start'">
            <div class="none /md:block w-1/4">
                <ListLinks :data="PAGE_USER"/>
            </div>
            
            <NuxtPage :transition="{ name: 'blur' }" mode="out-in"/>
        </Flex>
    </Panel> -->
</template>

<script setup lang="ts">
// import Panel from "@/components/UI/Panel/Panel.vue";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Group from "@/components/UI/Group/Group.vue";
// import ListLinks from "@/components/UI/List/Links.vue";
// import { PAGE_USER } from '@/utils/router'
import { t } from "#imports";

definePageMeta({
    middleware: ['1-auth','2-page-user-route']
})

const route = useRoute()
</script>

<style lang="css" modules>
.menu {
    min-width: calc((100% / 12) * 3.5);
    max-width: calc((100% / 12) * 3.5);
}
</style>