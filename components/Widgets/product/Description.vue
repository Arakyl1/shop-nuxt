<template>
    <section>
        <div class="grid grid-cols-2 gap-x-8 xl:gap-x-6 lg:grid-cols-1 lg:gap-y-6">
            <div class="p-8 bg-gray-100 xl:p-6 sm:p-4">
                <h3 class="text-xl text-black-100 sm:text-lg">Описание</h3>
                <div class="decor-line my-4 xl:my-3 sm:my-2"></div>
                <p class="text-gray-500 sm:text-sm">{{ description }}</p>
            </div>
            <div class="p-8 bg-gray-100 xl:p-6 sm:p-4">
                <EntitiesOtherSladerBase :data="reviewsUpdate">
                    <template #header="{ prevItem, nextItem }">
                        <div class="flex mb-4 xl:mb-3">
                            <h3 class="text-xl text-black-100 grow 
                            sm:text-lg">Отзывы</h3>
                            <div>
                                <div class="flex">
                                    <SharedUIButtomArround @click="prevItem" class="-scale-100 px-3 py-1 " />
                                    <SharedUIButtomArround @click="nextItem" class=" ml-4 px-3 py-1" />
                                </div>
                            </div>
                        </div>
                        <div class="decor-line"></div>
                    </template>
                    <template #item="{ elem }">
                        <EntitiesItemCommit :data="elem" v-if="elem" />
                    </template>
                    <template #bottom>
                        <p v-if="!reviewsUpdate.length" class="text-xl text-gray-500 py-4 sm:text-base">На этот товар
                            пока нет отзывав</p>
                        <UIStandart @click="updateStage" v-if="userData" class="bg-yellow-500 text-white sm:py-2">
                            Добавить отзыв
                        </UIStandart>
                        <div></div>
                    </template>
                </EntitiesOtherSladerBase>
            </div>
        </div>
        <SharedUIModalTransition :active="stage" class="h-min w-96 sm:w-[calc(100vw-2rem)]">

            <EntitiesModalAddCommtit :data="data" :refresh="refresh" :userData="userData"
                :reviewsRantingValue="reviewsRantingValue" :hudeFunction="updateStage" />
        </SharedUIModalTransition>
    </section>
</template>
<script setup lang="ts">
import ShowContent from "@/utils/ShowContent";
import { AsyncDataExecuteOptions } from "nuxt/dist/app/composables/asyncData";
import { _ProductCardFull } from '~~/type/intex';

interface Props {
    description: _ProductCardFull['description'],
    reviews: _ProductCardFull['reviews'],
    id: _ProductCardFull['id'],
    art: _ProductCardFull['art'],
    name: _ProductCardFull['name'],
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>
}

const props = defineProps<Props>()
const { stage, updateStage } = ShowContent();
const { user: _user} = useStore()
const { userData } = _user()

const data = ref({
    id: props.id,
    art: props.art,
    name: props.name
})

const reviewsUpdate = computed(() => props.reviews.filter(el => el.text))
const reviewsRantingValue = computed(() => props.reviews.map(
    <T extends _ProductCardFull['reviews'][0]>(el: T) => el.ranting as unknown as NonNullable<T['ranting']>))

</script>