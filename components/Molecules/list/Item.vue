<template>
<div>
    <div class="decor-line"></div>
    <div class="py-5 sm:py-4">
        <div class="flex items-center">
            <h3 class="grow text-white text-xl sm:text-lg">{{ title  }}</h3>
            <IconAdd class="group is-icon-white h-5 w-5"
            @click="() => active = !active"/>
        </div>
        <ul v-show="active" class="mt-4">
            <ContentDoc :path="path" v-slot="{ doc }">
                <li v-for="item in doc.body" class="mb-1.5 text-lg sm:text-base">
                    <NuxtLink :to="item.href" class="text-gray-300"
                    > {{  item.name }}</NuxtLink>
                </li>
            </ContentDoc>
        </ul>
    </div>
</div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ path: string, title?: string }>(),  { title: 'Информация' })
const active = ref(false)
</script>