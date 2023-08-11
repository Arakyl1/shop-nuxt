<template>
    <div>
        <div class="flex justify-between pb-6 pt-4 flex-wrap">
            <h2 class="text-3xl md:text-2xl sm:text-xl sm:w-full">Каталог товаров</h2>
            <div class="flex items-start sm:text-right sm:w-full justify-end">
                <p class="text-gray-300 mr-1 sm:text-sm">Показывать:
                    <span class="text-blue-500 ml-1 sm:text-sm">по</span>
                </p>
                <ClientOnly>
                    <select @change="onChange" :value="'limit' in $route.query ? $route.query.limit : ''"
                        class="p-0 px-1 focus-visible:outline-none text-blue-500 cursor-pointer sm:text-sm">
                        <option disabled value="" class="text-gray-500">Sel..</option>
                        <option v-for="item in selectValue" :key="item" :value="item" class="text-gray-500">{{ item }}
                        </option>
                    </select>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()

const selectValue = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60]

function onChange({ target }: Event) {
    const _target = target as HTMLElement
    if (_target.tagName === 'SELECT') {
        const value = (_target as HTMLSelectElement).value
        if (value !== '') {
            return navigateTo({
                path: route.path,
                query: {
                    ...route.query,
                    page: 1,
                    limit: value,
                }
            })
        }
    }
}

</script>
