<template>
   
    <Flex :justify="'between'" >
        <Title :tag="'h2'" :text="'Каталог товаров'" class="grow"/>
        <Flex>
            <p class="text-gray-300">Показывать:
                <span class="text-blue-500 px-1">по</span>
            </p>
            <ClientOnly>
                <Select :data="data" class="w-16" @change="onChange" :model-value="(sizeValue as number)">
                    <template #trigger="{ activeOption, isActive, onClick }">
                        <Button :text="activeOption?.value"
                        :appearance="'blue-icon'"
                        :rounded="'lg'"
                        :icon-transition="'select-icon'"
                        :icon-right="{ key: isActive ? 'arrow' : 'arrow', size: '25_25' }"
                        class="text-base w-full h-6"
                        :class="[ activeOption?.value ? 'justify-between' : 'justify-end']"
                        :style="{ padding: '0.125rem 0.25rem' }"
                        @click="onClick"/>
                    </template>
                </Select>
            </ClientOnly>
        </Flex>
    </Flex>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Title from "@/components/UI/Title/Title.vue";
import Select from "@/components/UI/Select/SelectRelative.vue";
import Button from "@/components/UI/Button/Button.vue";

const route = useRoute()
const sizeValue = ref('limit' in route.query ? route.query.limit : 12)


const selectValue = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60]
const data = computed(() => selectValue.map(_ => ({ id: _, value: _ })))

function onChange({ target }: Event) {
    const _target = target as HTMLElement
    if (_target.tagName === 'SELECT') {
        const value = (_target as HTMLSelectElement).value
        if (value !== '') {
            return navigateTo({
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
