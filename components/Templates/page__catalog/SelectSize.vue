<template>    
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
                    class="text-base w-full h-6 py-0.5 px-1"
                    :class="[ activeOption?.value ? 'justify-between' : 'justify-end']"
                    @click="onClick"/>
                </template>
            </Select>
        </ClientOnly>
    </Flex>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
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
