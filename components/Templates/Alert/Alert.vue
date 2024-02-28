<template>
    <div :class="className['body']">
        <ClientOnly>
            <TransitionGroup tag="ul" name="list" @click.stop="onClick" class="flex flex-column gap-y-2">
                <template v-for="item in alertData" :key="item.createAt">
                    <Flex :tag="'li'" :justify="'end'"
                    :data-alert-id="item.createAt">
                    <Flex class="rounded-base py-1 px-2 gap-1"
                    :class="{
                        'text-blue-500 bg-white': item.state === 'base',
                        'bg-invalid text-white': item.state === 'error',
                        'bg-valid text-white': item.state === 'success',
                        'bg-yellow-500 text-white': item.state === 'info' || item.state === 'loader'
                    }" :style="{
                        '--tw-bg-opacity': ['base','error','loader'].includes(item.state) ? 0.55 : item.state === 'info' ? 0.85 : 0.75
                        }">
                        <CreateIcon v-if="item.state === 'loader'" :name="'loader_24_24'"/>
                        <p class="color-inherit text-sm">{{ item.text }}</p>
                    </Flex>
                </Flex>
            </template>
            </TransitionGroup>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { alert as _alert } from "@/stores/alert";
import Flex from "@/components/UI/Flex/Flex.vue";
import { default as CreateIcon } from "@/utils/icon/create";

const storeAlert = _alert()
const { data: alertData } = storeToRefs(storeAlert)
const className = useCssModule()

function onClick({ target }: MouseEvent) {
    const _target = target as HTMLElement
    const elemList = _target.closest('[data-alert-id]')
    if (elemList) {
        const valueAlertId = parseInt((elemList as HTMLLIElement).dataset.alertId || '')
        if (valueAlertId) {
            storeAlert.removeItem(valueAlertId)
        }
    }
}
</script>

<style lang="css" module>

.body {
    position: fixed;
    z-index: 1000;
    top: 0.75rem;
    right: 0.75rem;
    max-width: 50%; 
}

@media screen and (max-width: 1024px) {
    .body {
        max-width: 75%;
    }
}

@media screen and (max-width: 768px) {
    .body {
        max-width: 100%;
    }
}
</style>