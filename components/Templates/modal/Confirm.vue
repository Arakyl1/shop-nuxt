<template>
    <ModalCard :active="state" :on-close="() => update(false)" ref="modal" :animation-modal="'confirm'">
        <template #body>
            <Card :container="'xl'" :class="className['modal']" data-confirm>
                <Group class="gap-y-6">
                    <Title :tag="'h3'" :text="title" />
                    <Flex class="gap-4 w-full">
                        <Button :appearance="'red'" :text="common.REJECTION" class="grow h-10 justify-center"
                        data-promise-status="rejection" />
                        <Button :appearance="'green'" :text="common.ACCEPT" class="grow h-10 justify-center"
                        data-promise-status="accept" />
                    </Flex>
                </Group>
            </Card>
        </template>
    </ModalCard>
</template>

<script setup lang="ts">
import ModalCard from "@/components/UI/Modal/ModalCard.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Title from "@/components/UI/Title/Title.vue";
import { BASE_BUTTON as common } from "@/common/C";
import { handlerPromise } from '@/utils/modalHelper';

interface Props {
    title: string,
    open?: boolean,
    resolveFun?: (...arg: any[]) => any,
    rejectionFun?: (...arg: any[]) => any,
}

const props = withDefaults(defineProps<Props>(), {
    open: false
})

const emit = defineEmits<{ (e: 'closeConfirm', value: void): void }>()

const { state, update } = localState()
const className = useCssModule()
const modal = ref<HTMLElement | null>(null)

watch(() => props.open, (newV) => {
    if (newV) {
        onOpen()
    }
})

function onOpen() {
    if (modal.value?.modal) {
        const _elem = modal.value?.modal as HTMLElement
        update(true)
        handlerPromise(_elem, props.resolveFun, props.rejectionFun).finally(() => {
            update(false)
            emit('closeConfirm')
        })    
    }
}


</script>

<style lang="css" module>
.modal {
  min-width: 320px;
  max-width: 450px;
}
</style>