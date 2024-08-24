<template>
    <div ref="dropdown" :class="$style.dropdown">
        <div class="w-full">
            <slot name="trigger" v-bind="{ isActive, close, onClick, open, onHover, onContextMenu, onFocus }">
                <UIVButton
                    :mode="'btM-dropdown'"
                    class="text-sm text-medium"
                    :class="$style.Dropdown_Bottom"
                    :active="active || isActive"
                    v-bind="{ iconLeft }"
                    @click="isActive ? close() : onClick()"
                >
                    <UIVParagraph :size="'xs'" :text="text" />
                    <slot name="button-content-after-text" v-bind="{ active, text }"></slot>
                </UIVButton>
            </slot>
        </div>
        <Transition name="dropdown">
            <UIVCard
                v-show="isActive"
                :class="[$style.list, mode ? $style[mode] : '']"
                :data-position="position"
                :appearance="'white'"
                :rounded="'lg'"
                dropdown-body
            >
                <slot v-bind="{ isActive, close, onClick, open, onHover, onContextMenu, onFocus }"></slot>
            </UIVCard>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useShow } from '#imports';

import type { useShowProps } from '../../type/index';
import type { Props as ButtonProps } from './VButton.vue';
// компонент dropdown, реализует открывание и загрывание dropdown,
// открыть dropdown можно при с помошью этих событий (click, hover, focus, contextMenu)
// можно выбрать одно или несколько событий которые будут открывать dropdown
// при клике не по компоненты dropdown или другому dropdown этот будут закрываться (эт событие можно отменить)
// через слоты #default #trigger передаються функиция для разных событий для открывания или закрытия
// пример: <template #trigger={ state, onClick }> <button @click="isOpen">cat</button></template>

export interface Props extends useShowProps, Pick<ButtonProps, 'active' | 'iconLeft' | 'text'> {
    mode?: 'outline' | 'primary';
    position?: 'left' | 'right';
}

const props = withDefaults(defineProps<Props>(), { mode: 'primary', autoClose: true, position: 'right' });

const dropdown = ref(null);
const { isActive, close, onClick, open, onHover, onContextMenu, onFocus } = useShow(props, undefined, dropdown);

defineExpose({
    dropdown,
    close,
    open,
    onClick,
    onHover,
    onContextMenu,
    onFocus
});
</script>

<style lang="css" module>
.dropdown {
    position: relative;
    display: flex;
}

.list {
    position: absolute;
    bottom: 0;
    z-index: 50;
    width: auto;
    padding: 0;
}

.list[data-position='left'] {
    left: 0;
}

.list[data-position='right'] {
    right: 0;
}

*.Dropdown_Bottom {
    gap: 8px;
    padding: 0 11.5px;
}

.primary {
    bottom: -0.5rem;
    transform: translateY(100%);
    box-shadow: var(--box-shadow-md);
}

.outline {
    transform: translateY(calc(100% + 0.5rem));
}
</style>
