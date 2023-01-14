<template>
    <ButtomStandart class="bg-yellow-500 text-white sm:text-sm sm:py-2"
    @click="updateStage">
        Добавить отзыв
    </ButtomStandart>
    <OtherModalTransition :active="stage"
    class="h-min w-96 sm:w-[calc(100vw-2rem)]">
       <div class="bg-white rounded-md py-8 px-6 sm:py-6 sm:px-4"
       v-if="data.userData">
        <div class="flex items-center mb-4">
            <img :src="data.userData.profileImage" alt="user-image"
            class="w-12 aspect-square">
            <p class="text-lg text-gray-900 ml-4">{{ data.userData.username }}</p>
        </div>
        <div class="decor-line mb-6 sm:mb-4"></div>
        <div class="flex mb-3">
            <p class="texl-lg text-black-500 ">{{ data.name }}
                <span class="texl-lg text-gray-500 pl-3 ">{{ data.art }}</span>
            </p>
        </div>
        <div class="mb-4">
            <OtherElseStar :quantity-star="userReview.ranting"
            @number-star="(e) => userReview.ranting = e" 
            class="justify-start"/>
        </div>
        <textarea rows="10"
        class="w-full border border-yellow-500 rounded-md
        p-4 mb-6 focus-visible:outline-0 sm:p-2"
        v-model="userReview.text"></textarea>
        <div class="text-right">
            <ButtomStandart class="bg-yellow-500 text-white sm:py-2"
            @click="createReview">
                Опубликовать
            </ButtomStandart>
        </div>
    </div>
    </OtherModalTransition>
</template>

<script setup lang="ts">
import ShowContent from "@/utils/ShowContent";
import { alertContent } from "@/pinia/store";

const props = defineProps<{ data: {
    id: number,
    art: string,
    name: string,
    userData: {
        id: number,
        name: null | string,
        email: string,
        username: string,
        profileImage: string
    }
    },
    refresh?: Function,
    reduceRanting: object,
}>()

const { addReviewProduct } = useCommit()
const { putProductData } = useProduct()
const { stage, updateStage } = ShowContent();
const alertContentFun = alertContent()

const userReview = ref({
    cardId: props.data.id,
    ranting: 0,
    text: '',
    userId: props.data.userData.id
})

function hudeModal() {
    userReview.value.ranting = 0
    userReview.value.text = '';
    updateStage(event)
}

async function createReview() {
    if (userReview.value.ranting || userReview.value.text) {
      const res = await addReviewProduct(userReview.value)
      if (userReview.value.ranting) {
            const calculationRanting = Math.round(
                (props.reduceRanting.value + userReview.value.ranting) /
                (props.reduceRanting.length + 1))
            const res = await putProductData({ 
                where: { id: props.data.id },
                data: { ranting: calculationRanting } 
            })
        }
        if (res) {
            hudeModal()
            if (props.refresh) props.refresh()
            alertContentFun.updateContent('Ваш отзыв добавлен')
        }
    } else {
        alert('Не введены данные')
    }
}
</script>