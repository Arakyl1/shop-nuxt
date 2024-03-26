<template>
    <div class="relative"
    :data-search="instanse?.uid"
    :data-uid="instanse?.uid">
        <div @submit.prevent>
            <slot name="form" v-bind="{ onFocus, refresh }">
                <Flex :tag="'form'"  :class="className['form']" >
                    <Input
                    v-model="inputText"
                    :mode="'none'"
                    :placeholder="common.INPUT_PLACEHOLDER"
                    @focus.capture="onFocus"
                    @keyup.enter="refresh"
                    :style="{ '--focus-shadow': 'none' }"/>
                    <Button
                    :appearance="'blue'"
                    :text="common.BUTTON_SEARCH"
                    class="px-2"
                    :height="'h-6'"
                    @click="refresh"/>
                </Flex>
            </slot>
        </div>
        <div :class="className['body']">
            <Transition name="dropdown">
                <ClientOnly>

                    <Card :mode="'primary'" v-show="isActive">
                        <div class="p-3 scrollbar-v1 ver" :class="className['container']">
                            <ul v-if="dataSearch?.length">
                                <li v-for="item in dataSearch" :key="item.id" class="py-1">
                                    <Flex class="gap-2">
                                        <Image
                                        :src="changeValueImageSize(item.image[0].link, { 'heigth': 'h_28' })"
                                        :alt="item.name"
                                        :rounded="'sm'"
                                        :square="true"
                                        class="h-7 w-7"/>
                                        <Group class="grow">
                                            <Button :tag="'nuxt-link'"
                                            :to="`/catalog/${item.id}`"
                                            :appearance="'gray-icon'"
                                            :text="item.name + ' ' + item.art"
                                            class="grow text-xs"
                                            :style="{ maxWidth: '150px' }"
                                            target="_blank"/>
                                            <ProductPrice
                                            :discount="item.discount > 0"
                                            :price="item.price"
                                            class="text-sm"/>
                                        </Group>
                                    </Flex>
                                </li>
                            </ul>
                            <p v-else class="text-xs text-gray-700">{{ common.EMPTY_RESULT  }}</p>
                        </div>
                        <!-- <div class="border-t border-gray-300"
                            @click="updateState(false)">
                            <p class="text-center text-sm p-1 text-blue-500">Скрыть</p>
                        </div> -->
                    </Card>
                </ClientOnly>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useShowProps } from '~~/type/intex'
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Input from "@/components/UI/Input/Input.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Image from "@/components/UI/Image/Image.vue";
import ProductPrice from "@/components/Templates/Product/Price.vue";
import useShow from '@/composables/useShow';
import { watchEvent } from "@/utils/elemHelper";
import { changeValueImageSize } from "@/utils/other";
import { SEARCH_COMPONENT as common } from "@/common/C";


interface Props extends useShowProps {
    input?: string
}

const props = withDefaults(defineProps<Props>(), {
    triggers: () => ['focus', 'click' ],
    autoClose: true
})

const className = useCssModule()
const instanse = ref()
const _watchEvent = watchEvent('data-search', instanse, () => close())
const { isActive, close, onFocus } = useShow(props, _watchEvent)

const inputText = ref<string>('')


const { error, data, pending, refresh } = await useAsyncData(() => $fetch('/api/product/get', {
    method: 'GET',
    server: true,
    params: { search: inputText.value, limit: 15  },
}), {
    watch: [inputText],
})

const dataSearch = computed(() => data.value && 'data' in data.value ? data.value.data : [])

onMounted(() => {
    instanse.value = getCurrentInstance()
})
// async function getSearch(searchText: string) {
//     if (pending.value || searchText.length < 2) { return }
//    useFetch('/api/product/get', {
//         method: 'GET',
//         server: true,
//         params: { search: searchText, limit: 15  },
//         onRequest({ response }) {
//             if (!pending.value) {
//                 pending.value = true
//             }
//         },
//         onResponse({ response }) {
//             if ('data' in response._data) {
//                 dataSearch.value = response._data.data
//             }
//             pending.value = false
//             if (searchText !== inputText.value) {   
//                 getSearch(inputText.value)
//             }
//         }
//     })
// }


</script>

<style lang="css" module>
.body {
    position: absolute;
    top: calc(100% + 1rem);
    left: 0;
    width: 100%;
    min-height: min-content;
   
    z-index: 50;
}
.container {
    overflow-y: scroll;
    max-height: 300px;
}
.form {
    border-radius: var(--rounded-xl);
    border: 1px solid var(--gray-700);
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
}
</style>