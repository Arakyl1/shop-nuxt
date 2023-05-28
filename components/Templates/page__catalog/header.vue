<template>
    <div>
        <div class="flex justify-between pb-6 pt-4 flex-wrap">
            <h2 class="text-3xl md:text-2xl sm:text-xl sm:w-full">Каталог товаров</h2>
            <div class="flex items-start sm:text-right sm:w-full justify-end">
                <p class="text-gray-300 mr-1 sm:text-sm">Показывать:
                    <span class="text-blue-500 ml-1 sm:text-sm">по</span>
                </p>
                <ClientOnly>
                    <AtomOtherSelectingNumberDisplayedItems
                        class="p-0 px-1 focus-visible:outline-none text-blue-500 cursor-pointer sm:text-sm"
                        @select-number="(e) => paramsLimitUpdate(e)" :data="selectValue"
                        :valueD="parseInt($route.query.limit as string)" />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const selectValue = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60]

function paramsLimitUpdate(event: string) {
    return navigateTo({
        path: route.path,
        query: {
            ...route.query,
            page: 1,
            limit: event,
        }
    })
}

</script>
