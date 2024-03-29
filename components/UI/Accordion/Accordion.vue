<template>
    <div :data-accordion="instanse?.uid" :data-uid="instanse?.uid" class="relative">
        <div v-if="content === 'after'">
            <slot name="trigger" v-bind="{ isActive, close, onClick, open, onFocus, onHover, onContextMenu, iconClass }">
                <div :class="[className['bt'], className['bt--' + btMode], btClass]">
                    <template v-if="text">{{ text }}</template>
                    <slot name="button" v-else v-bind="{ onClick }"></slot>
                    <Button
                    :icon-left="icon ? icon : { icon: 'arrow', size: '24_24' }"
                    @click="() => isActive ? close() : onClick()"
                    :class="iconClass"
                    :size="'none'"
                    :mode="'none'" />
                </div>
            </slot>
        </div>
        <div v-if="separator" :class="className['separator']"></div>
        <Transition :name="animated">
            <div
            :style="[isActive ? { height: size && animated !== 'none' ? size.h : 'auto' } : {}]"
            :class="className['body']" ref="accordion">
                <slot v-bind="{ isActive, close, onClick, open, onFocus, onHover, onContextMenu, iconClass }"></slot>
            </div>
        </Transition>
        <div v-if="separator" :class="className['separator']"></div>
        <div v-if="content === 'before'">
            <slot name="trigger" v-bind="{ isActive, close, onClick, open, onFocus, onHover, onContextMenu, iconClass }">
                <div :class="[className['bt'], className['bt--' + btMode], btClass]">
                    <template v-if="text">{{ text }}</template>
                    <slot name="button" v-else v-bind="{ onClick }"></slot>
                    <Button
                    :icon-left="icon ? icon : { icon: 'arrow', size: '24_24' }"
                    @click="onClick"
                    :class="iconClass"
                    :mode="'none'" />
                </div>
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { default as Button, type Props as ButtonProps } from "@/components/UI/Button/Button.vue";
import { watchEvent } from "@/utils/elemHelper";
import { useShowProps } from '~~/type/intex';
import useShow from '@/composables/useShow';
import useHeight from '@/composables/useHeight';

interface Props extends useShowProps {
    active?: boolean,
    text?: string,
    // Accordion будет иметь анимацию
    // по умолчанию затухания
    animated?: string | 'none',
    // показать разделитель
    separator?: boolean,
    ariaId?: string,
    icon?: ButtonProps['iconLeft'],
    content?: 'after' | 'before',
    btMode?: 'primary' | 'secondary',
    btClass?: string,
    // закрывать accordion когда активен другой accordion
    delay?: number,
    closeDelay?: number,
}

const props = withDefaults(defineProps<Props>(), {
    active: false,
    animated: '',
    ariaId: '',
    btMode: 'primary',
    content: 'after',
    autoClose: true,
    triggers: () => ['click'],
    delay: 0,
    closeDelay: 0
})


const emit = defineEmits(['message'])

const className = useCssModule()
const accordion = ref<HTMLElement | null>(null)
const instanse = ref()
const watchElement = watchEvent('data-accordion', instanse, () => close())
const { isActive, close, onClick, open, onFocus, onHover, onContextMenu } = useShow(props, watchElement)
let size: ReturnType<typeof useHeight> | undefined
if (props.animated !== 'none') {
   size = useHeight(accordion)
}

const iconClass = computed(() => {
    return props.icon ? '' :
        props.btMode === 'primary' ? (isActive.value ? 'scaleY-1' : '-scaleY-1') :
        props.btMode === 'secondary' ? (isActive.value ? 'rotate-0' : 'rotate-90') :
        ''
})

onMounted(() => {
    instanse.value = getCurrentInstance()
   
})
watch(() => isActive.value, (newV) => emit('message', newV ? 'open' : 'close'))

</script>

<style lang="css" module>
/* purgecss ignore */
.separator {
    width: 100%;
    height: 1px;
    background-color: var(--gray-700);
}

.body {
    height: 0;
    overflow: hidden;
    transition: var(--transitions--sm);
}

.bt {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.bt>i {
    transition: var(--button-transitions--xs);
}

.bt--primary {
    gap: 0.75rem;
    font-size: var(--text-base);
    font-weight: 500;
}

.bt--secondary {
    width: 100%;
    justify-content: space-between;
}
</style>

<style lang="css">
.scaleY-1 {
    transform: scaleY(1);
}

.-scaleY-1 {
    transform: scaleY(-1);
}

.rotate-90 {
    transform: rotate(-90deg);
}

.rotate-0 {
    transform: rotate(0);
}
</style>
