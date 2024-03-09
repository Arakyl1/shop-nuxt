<template>
    <Group class="gap-4">
        <Group v-for="item in 3" :key="item" class="gap-2 w-full">
            <Skeleton 
            :loader="true"
            :animated="true"
            class="h-5 w-3/4" />
            <Skeleton 
            :loader="true"
            :animated="true"
            class="h-10" />
        </Group>
        <div class="decor-line"></div>
        <Group class="gap-2 w-full">
            <Skeleton 
            :loader="true"
            :animated="true"
            class="h-5 w-3/4" />
            <Flex class="gap-3 w-full">     
                <Skeleton v-for="item in 2"
                :loader="true"
                :animated="true"
                class="h-10 grow" />
            </Flex>
        </Group>
        <Group class="gap-2 w-full">
            <Skeleton 
            :loader="true"
            :animated="true"
            class="h-5 w-3/4" />
            <div class="decor-line"></div>
            <Skeleton 
            :loader="true"
            :animated="true"
            class="h-10" />
        </Group>
        <Group class="gap-2 w-full" v-for="item in 4">
            <Skeleton 
            :loader="true"
            :animated="true"
            class="h-5 w-3/4" />
            <div class="decor-line"></div>
            <Skeleton v-for="item in 4"
            :loader="true"
            :animated="true"
            class="h-4 w-full" />
        </Group>
    </Group>
</template>

<script setup>
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Skeleton from "@/components/UI/Skeleton/Skeleton.vue";

</script>