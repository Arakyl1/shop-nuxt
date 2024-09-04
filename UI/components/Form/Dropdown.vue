<template>
    <div ref="dropdown" data-dropdown>
        <div ref="trigger" class="w-full">
            <slot name="trigger" v-bind="{ isActive, close, onClick, open, onHover, onContextMenu, onFocus }">
                <Button
                    :mode="'outline'"
                    class="text-sm text-medium"
                    :class="$style.Dropdown_Botton"
                    :active="active || isActive"
                    v-bind="{ iconLeft }"
                    @click="isActive ? close() : onClick()"
                >
                    <Paragraph :size="'xs'" :text="text" />
                    <slot name="button-content-after-text" v-bind="{ active, text }"></slot>
                </Button>
            </slot>
        </div>
        <Transition name="dropdown">
            <Card
                v-show="isActive"
                ref="body"
                :class="[$style.list, mode ? $style[mode] : '']"
                :appearance="'white'"
                :rounded="rounded"
                dropdown-body
            >
                <slot v-bind="{ isActive, close, onClick, open, onHover, onContextMenu, onFocus }"></slot>
            </Card>
        </Transition>
    </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createPopper, preventOverflow } from '@popperjs/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { onMounted, ref, unref, watch } from 'vue';

import type { Props as ButtonProps } from '../Button/Button.vue';
import type { Props as CardProps } from '../Block/Card.vue';
import Button from '../Button/Button.vue';
import Card from '../Block/Card.vue';
import Paragraph from '../Paragraph/Text.vue';
import useShow from '@/composables/useShow';
import type { useShowProps, DropdownMode } from '../../type/index';
// компонент dropdown, реализует открывание и загрывание dropdown,
// открыть dropdown можно при с помошью этих событий (click, hover, focus, contextMenu)
// можно выбрать одно или несколько событий которые будут открывать dropdown
// при клике не по компоненты dropdown или другому dropdown этот будут закрываться (эт событие можно отменить)
// через слоты #default #trigger передаються функиция для разных событий для открывания или закрытия
// пример: <template #trigger={ state, onClick }> <button @click="isOpen">cat</button></template>

export interface Props extends useShowProps, Pick<ButtonProps, 'active' | 'iconLeft' | 'text'>, Partial<Pick<CardProps, 'rounded'>> {
    mode?: DropdownMode;
    position?: 'bottom-end' | 'bottom-start';
}

const props = withDefaults(defineProps<Props>(), { mode: 'primary', autoClose: true, position: 'bottom-end', rounded: 'lg' });

const dropdown = ref<HTMLElement | null>(null);
const trigger = ref<HTMLElement | null>(null);
const body = ref<HTMLElement | null>();
const popover = ref();

const { isActive, close, onClick, open, onHover, onContextMenu, onFocus } = useShow(props, undefined, dropdown);

onMounted(() => {
    const _trigger = unref(trigger);
    const _body = unref(body)?.card?.content;
    popover.value = createPopper(_trigger, _body, {
        placement: props.position,
        strategy: 'absolute',
        modifiers: [
            preventOverflow,
            {
                name: 'offset',
                options: {
                    offset: ({ placement }) => {
                        switch (true) {
                            case (placement as string).startsWith('bottom'):
                                return [0, 8];
                            case (placement as string).startsWith('top'):
                                return [0, 8];
                            default:
                                return [];
                        }
                    }
                }
            }
            // { name: 'eventListeners', enabled: true }
        ]
    });
    setTimeout(() => {
        popover.value?.update();
    }, 1000);
});

defineExpose({
    trigger,
    close,
    open,
    onClick,
    onHover,
    onContextMenu,
    onFocus
});

watch(
    () => isActive.value,
    (newV) => {
        if (newV) popover.value?.update();
    }
);
</script>

<style lang="css" module>
.list {
    z-index: 50;
    width: auto;
}

*.Dropdown_Botton {
    gap: 8px;
    padding: 0 11.5px;
}
</style>
