<template>
    <div>
        <div class="flex justify-between pb-6 pt-4 flex-wrap">
            <h2 class="text-3xl md:text-2xl sm:text-xl sm:w-full">Каталог товаров</h2>
            <div class="flex items-start sm:text-right sm:w-full justify-end">
                <p class="text-gray-300 mr-1 sm:text-sm">Показывать:
                    <span class="text-blue-500 ml-1 sm:text-sm">по</span>
                </p>
            <select class="p-0 px-1 focus-visible:outline-none text-blue-500 cursor-pointer sm:text-sm" @change="paramsLimitUpdate($event)"
            :value="route.query.limit">
                <option v-for="item in numders" :key="item" :value="item"
                class="text-gray-500"
                >{{  item  }}</option>
            </select>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const route = useRoute()

const numders = [
    6, 12, 18, 24, 30, 36, 42, 48, 54, 60
]


function paramsLimitUpdate(e) {
   return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: 1,
            limit: e.target.value,
        }
    })
}

</script>