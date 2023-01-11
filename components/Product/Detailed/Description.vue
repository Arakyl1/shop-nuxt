<template>
<section>
    <div class="grid grid-cols-2 gap-x-8 xl:gap-x-6 lg:grid-cols-1 lg:gap-y-6">
        <div class="p-8 bg-gray-100 xl:p-6 sm:p-4">
            <h3 class="text-xl text-black-100 sm:text-lg">Описание</h3>
            <div class="decor-line my-4 xl:my-3 sm:my-2"></div>
            <p class="text-gray-500 sm:text-sm">{{ description }}</p>
        </div>
        <div class="p-8 bg-gray-100 xl:p-6 sm:p-4">
                <Slader :data="reviewsUpdate">
                    <template #header="{ prevItem, nextItem }">
                        <div class="flex mb-4 xl:mb-3">
                            <h3 class="text-xl text-black-100 grow 
                            sm:text-lg">Отзывы</h3>
                            <div>
                                <div class="flex">
                                    <ButtomArround @click="prevItem" class="-scale-100 px-3 py-1 "/>
                                    <ButtomArround @click="nextItem" class=" ml-4 px-3 py-1"/>
                                </div>
                            </div>
                        </div>
                        <div class="decor-line"></div>
                    </template>
                    <template #item="{ elem }">
                        <ProductDetailedReviewItem :infoReview="elem"/>
                    </template>
                    <template #bottom>
                        <p v-if="!reviewsUpdate.length" class="text-xl text-gray-500 py-4 sm:text-base" >На этот товар пока нет отзывав</p>
                       <ButtomAddReview
                       :data="data"
                       v-if="userData"
                       :refresh="refresh"
                       :reduceRanting="reduceRanting"/>
                       <div></div>
                    </template>
                </Slader>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
import { userActive } from "@/pinia/store";
import { storeToRefs } from "pinia";

interface ReviewsInfo {
    description: string,
    reviews: [],
    id: number,
    art: string,
    name: string,
    refresh?: Function
}

const props = defineProps<ReviewsInfo>()
const user = userActive()
const { userData } = storeToRefs(user)

const data = ref({
    id: props.id,
    art: props.art,
    name: props.name,
    userData: userData
})

const reviewsUpdate = computed(() => props.reviews.filter(el => el.text))
const reduceRanting = computed(() => {
     return Object.assign({}, {
        value: props.reviews.reduce((sum, item) => sum + item.ranting, 0),
        length: props.reviews.length
    })
})
</script>