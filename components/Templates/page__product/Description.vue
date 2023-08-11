<template>
    <section>
        <div class="grid grid-cols-2 gap-x-8 xl:gap-x-6 lg:grid-cols-1 lg:gap-y-6">
            <div class="p-8 bg-gray-100 xl:p-6 sm:p-4">
                <h3 class="text-xl text-black-100 sm:text-lg">Описание</h3>
                <div class="decor-line my-4 xl:my-3 sm:my-2"></div>
                <p class="text-gray-500 sm:text-sm">{{ data.description }}</p>
            </div>
            <div class="p-8 bg-gray-100 xl:p-6 sm:p-4">
                <MoleculesSladerBase :data="reviewsUpdate">
                    <template #header="{ prevItem, nextItem }">
                        <div class="flex mb-4 xl:mb-3">
                            <h3 class="text-xl text-black-100 grow 
                                sm:text-lg">Отзывы</h3>
                            <div>
                                <div class="flex">
                                    <AtomButtonArround @click="prevItem" class="-scale-100 px-3 py-1 " />
                                    <AtomButtonArround @click="nextItem" class=" ml-4 px-3 py-1" />
                                </div>
                            </div>
                        </div>
                        <div class="decor-line"></div>
                    </template>
                    <template #item="{ elem }">
                        <MoleculesCardCommit :data="elem" v-if="elem" />
                    </template>
                    <template #bottom>
                        <p v-if="!reviewsUpdate.length" class="text-xl text-gray-500 py-4 sm:text-base">На этот товар
                            пока нет отзывав</p>
                        <AtomButtonStandart @click="update(true)" v-if="_userData" class="bg-yellow-500 text-white sm:py-2">
                            Добавить отзыв
                        </AtomButtonStandart>
                        <div></div>
                    </template>
                </MoleculesSladerBase>
            </div>
        </div>
        <AtomModalMask :state="state" :clickFun="update">
            <MoleculesModalAddCommtit :data="modalData" :refresh="refresh" :userData="_userData"
            :reviewsRantingValue="reviewsRantingValue" :modalFun="update" :state="state"
            class="h-min w-96 sm:w-[calc(100vw-2rem)]" />
        </AtomModalMask>
    </section>
</template>
<script setup lang="ts">
import { user as _user } from "@/stores/user";
import localState from "@/utils/localState";
import type { AsyncDataExecuteOptions } from "nuxt/dist/app/composables/asyncData";
import type { ProductCardFull } from '~~/type/intex';

interface Props {
    data: ProductCardFull,
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>
}

const props = defineProps<Props>()
const { state, update } = localState()
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)

const modalData = ref({
    id: props.data.id,
    art: props.data.art,
    name: props.data.name
})

const reviewsUpdate = computed(() => props.data.reviews.filter(el => el.text))
const reviewsRantingValue = computed(() => props.data.reviews.map(
    <T extends ProductCardFull['reviews'][0]>(el: T) => el.ranting as unknown as NonNullable<T['ranting']>))

</script>