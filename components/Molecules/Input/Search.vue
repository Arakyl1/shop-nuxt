<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
    <UITFormDropdown  ref="dropdown" v-bind="{ iconLeft, text, closeDelay, triggers, position }" data-search>
        <template #trigger="{ isActive, onClick, onContextMenu, onFocus, onHover, open, close, }">
            <slot name="trigger" v-bind="{ onClick, isActive, onContextMenu, onFocus, onHover, open, close }">
                <UITFormInput :mode="'outline'" :name="inputName">
                    <template #right-content>
                        <Button
                        :mode="'blue'"
                        :text="t('BASE_BUTTON.SEARCH')"
                        class="px-2"
                        :height="'h-6'"/>
                    </template>
                </UITFormInput>
                <!-- <UIVButton v-if="selectActiveOption" :mode="'outline'" class="px-3 gap-2" @click="onClick">
                    <UIVAvatar
                        :size="'xs'"
                        :src="selectActiveOption.image"
                        :firstname="selectActiveOption.firstname"
                        :lastname="selectActiveOption.lastname"
                        :rounded="'sm'"
                    />
                    <UIVParagraph
                        :size="'xs'"
                        :weight="'medium'"
                        :text="`${selectActiveOption.firstname} ${selectActiveOption.lastname}`"
                    />
                </UIVButton> -->
            </slot>
        </template>
        <!-- eslint-disable-next-line vue/no-unused-vars -->

        <template #default>
            <UITBlockScroll :direction="'ver'">
                <ul v-if="data?.data?.length">
                    <li v-for="item in data.data" :key="item.id" class="py-1">
                        <UITBlockFlex>
                            <UITImage
                                :src="changeValueImageSize(item.image[0].link, { 'heigth': 'h_28' })"
                                :alt="item.name"
                                :rounded="'sm'"
                                :square="true"
                                class="h-7 w-7"/>
                                <UITBlockGroup class="grow">
                                    <UITButton
                                    :tag="'nuxt-link'"
                                    :to="`/catalog/${item.id}`"
                                    :appearance="'gray-icon'"
                                    :text="item.name + ' ' + item.art"
                                    class="grow text-xs"
                                    :style="{ maxWidth: '150px' }"
                                    rel="noopener"/>
                                    <p>{{ item.price}}</p>
                                    <!-- <ProductPrice
                                    :discount="item.discount > 0"
                                    :price="item.price"
                                    class="text-sm"/> -->
                                </UITBlockGroup>
                        </UITBlockFlex>
                    </li>
                </ul>
            </UITBlockScroll>
        </template>
    </UITFormDropdown>
</template>

<script setup lang="ts">
import { UITFormDropdown, UITBlockScroll, UITImage, UITBlockFlex, UITBlockGroup, UITButton, UITFormInput } from "#components";
import type { Props as PropsButton } from '@/UI/components/Button/Button.vue';
import type { Props as PropsDropDown } from '@/UI/components/Form/Dropdown.vue';
import type { InputProps } from '@/type/intex.js';
import { ref, useForm } from '#imports';

export type Props = Pick<PropsButton, 'text' | 'iconLeft'> &
    Pick<InputProps, 'placeholder'> &
    Pick<PropsDropDown, 'triggers' | 'position'> & {
        inputName?: string;
        closeDelay?: number;
        watchReset?: boolean;
    };

const props = withDefaults(defineProps<Props>(), { inputName: 'search', closeDelay: 100, watchReset: true, triggers: () => ['click'] });

defineOptions({
    name: 'Search'
});

const dropdown = ref();
const searchData = ref<string[] | null>(null);
// const searchActive = ref<boolean>(false);
// const selectActiveOption = ref<Props['data'][0] | null>(
//     props.activeOptionId ? props.data.find((_) => _.id.toString() === props.activeOptionId) || null : null
// );
const { addToWatchEventRestore } = useForm();

// function getSearchData(body: Ref<HTMLElement | null> | HTMLElement) {
//     return function (e: Event) {
//         e.stopPropagation();
//         const { target } = e;
//         const _body = unref(body);
//         if (!(_body instanceof HTMLElement) || !(target instanceof HTMLInputElement)) return null;
//         const listCheckbox: Array<string> = [];
//         const label = _body.querySelectorAll('label');
//         const reg = new RegExp(`${target.value}`, 'i');
//         searchActive.value = Boolean(target.value);
//         for (const elem of label) {
//             if (reg.test(elem.textContent?.trim() as string)) {
//                 listCheckbox.push(elem.getAttribute('for'));
//             }
//         }

//         searchData.value = [...listCheckbox];
//     };
// }

// function onChange({ target }: Event) {
//     if (!(target instanceof HTMLElement)) return;
//     const radio = target.closest('[data-radio ]')?.querySelector(`input[type='radio']`);
//     if (!radio) return null;
//     const idOption = radio.id;
//     selectActiveOption.value = props.data.find((_) => _.id.toString() === idOption) || null;
//     if (dropdown.value) {
//         dropdown.value.close();
//     }
// }

if (props.watchReset) {
    addToWatchEventRestore(() => {
        searchData.value = [];
    });
}
</script>

<style lang="css" module>
.Search_Container {
    width: 317px;
}

.Item_Container {
    padding: 0 8px;
    cursor: pointer;
}

.Item_Container label {
    padding: 9px 0;
    cursor: pointer;
}
</style>


<!-- <template>
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
            <ClientOnly>
            <Transition name="dropdown">
            
                    <Card :mode="'primary'" v-show="isActive">
                        <div class="p-3 scrollbar-v1 ver" :class="className['container']">
                            <ul v-if="data?.data?.length">
                                <li v-for="item in data.data" :key="item.id" class="py-1">
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
                                            rel="noopener"/>
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
                         <div class="border-t border-gray-300"
                            @click="updateState(false)">
                            <p class="text-center text-sm p-1 text-blue-500">Скрыть</p>
                        </div>
                    </Card>
                </Transition>
            </ClientOnly>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UITBlockFlex, UITBlockGroup, UITFormInput, UITButton } from "#components";
import { t } from "#imports";
import { useShowProps } from '~~/type/intex'
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Input from "@/components/UI/Input/Input.vue";
import Button from "components/UI/Button/index.vue";
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


const { error, data, pending, refresh } = useLazyAsyncData(() => $fetch('/api/product/get', {
    server: false,
    params: { search: inputText.value, limit: 15  },
}), {
    watch: [inputText],
    default: () => ({ data: [] })
})



onMounted(() => {
    instanse.value = getCurrentInstance()
})

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
</style> -->