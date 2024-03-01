<template>
    <section class="relative mb-12">
        <template v-if="true">
            <div :class="className['button']" ref="modalbutton">
                <Button :appearance="'white'"
                :size="'lg'"
                class="text-xl h-14 text-gray-500"
                @click="update(true)"
                :text="common.BUTTON_MODAL"/>
            </div>
            <Modal :active="state"
            :onClose="() => update(false)"
            :bodyClass="className['modal']"
            :btClose="true">
                <Group  class="gap-y-10">
                    <Title :tag="'h3'"
                    :text="common.BUTTON_MODAL"
                    class="text-black-300"/>
                    <Flex :direction="'column'" class="gap-y-4">
                        <Flex
                        :justify="'between'"
                        :class="className['item']"
                        class="bg-gray-100 rounded-xl w-full">
                            <p class="text-gray-300 text-lg">{{ common.ADDRESS }}</p>
                            <p class="text-gray-300 text-lg">{{ common.OPERATING_MODE}}</p>
                        </Flex>
                        <ContentDoc :path="'/contact/market'" v-slot="{ doc }">
                            <Flex v-for="item  in doc.body"
                            :key="item.adress"
                            :justify="'between'"
                            :class="[className['market-item'], className['item']]">
                                <p class="grow">{{ item.adress }}</p>
                                <div>
                                    <p class="whitespace-nowrap">
                                        <span class="text-blue-500">{{ WORKING_DAYS[0] }}</span>
                                        {{ WORKING_DAYS[1] }}
                                        <span class="text-gray-300">{{ item.working_hours_from }}</span>
                                        {{ WORKING_DAYS[2] }}
                                        <span class="text-gray-300">{{ item.working_hours_to }}</span>
                                    </p>
                                    <p class="whitespace-nowrap">
                                        <span class="text-yellow-500">{{ WEEKENDS_DAY[0] }}</span>
                                        <span class="text-gray-300">{{ item.weekend }}</span>
                                    </p>
                                </div>
                            </Flex>
                        </ContentDoc>
                    </Flex>
                </Group>
            </Modal>
        </template>
        <iframe class="w-full rounded-xl" :class="className['map']"
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A7d6a1168fb8d16752cf83dd4cf2d8e58a4e0a3813fc21288224711925e8cb0ab&amp;source=constructor"
            frameborder="0"></iframe>
    </section>
</template>

<script setup lang="ts">
import localState from "@/utils/localState";
import Title from "@/components/UI/Title/Title.vue";
import Flex from "@/components/UI/Flex/Flex.vue";
import Button from "@/components/UI/Button/Button.vue";
import Card from "@/components/UI/Card/Card.vue";
import Group from "@/components/UI/Group/Group.vue";
import Modal from "@/components/UI/Modal/ModalCard.vue";
import { PAGE_CONTACT as common } from "@/common/C";


const { state, update } = localState()
const modalbutton = ref<HTMLElement | null>(null)
const className = useCssModule()
const WORKING_DAYS = common.WORKING_DAYS.split('GAP')
const WEEKENDS_DAY = common.WEEKENDS_DAY.split('GAP')
</script>

<style lang="css" module>
.item {
    padding: 0.75rem 1.25rem;
    width: 100%;
}
.market-item { 
    border-bottom: 1px solid var(--gray-300);
}
.market-item > *:nth-child(1) {
    padding-right: 3rem;
}
.market-item > *:nth-child(2) {
    text-align: right;
}
.modal {
    width: 64rem;
}
.map {
   aspect-ratio: 2.3/1; 
}
.button {
 position: absolute;
 top: 1rem;
 left: 1rem;
}
</style>