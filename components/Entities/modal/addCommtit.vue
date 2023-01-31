<template>
    <div class="bg-white rounded-md py-8 px-6 sm:py-6 sm:px-4">
        <div class="flex items-center mb-4" v-if="userData">
            <img :src="userData.profileImage" alt="user-image" class="w-12 aspect-square">
            <p class="text-lg text-gray-900 ml-4">{{ userData.username }}</p>
        </div>
        <div class="decor-line mb-6 sm:mb-4"></div>
        <div class="flex mb-3">
            <p class="texl-lg text-black-500 ">{{ data.name }}
                <span class="texl-lg text-gray-500 pl-3 ">{{ data.art }}</span>
            </p>
        </div>
        <div class="mb-4">
            <SharedUIStar :quantity-star="userReview.ranting" @number-star="(e) => userReview.ranting = e"
                class="justify-start" />
        </div>
        <textarea rows="10" class="w-full border border-yellow-500 rounded-md
        p-4 mb-6 focus-visible:outline-0 sm:p-2" v-model="userReview.text"></textarea>
        <div class="text-right">
            <SharedApiCommitPost>
                <template #default="{ createReview }">
                    <UIStandart @click="createCommit(createReview)" class="bg-yellow-500 text-white sm:py-2">
                        Опубликовать
                    </UIStandart>
                </template>
            </SharedApiCommitPost>
        </div>
    </div>
</template>
<script setup lang="ts">
import { User } from '~~/utils/type';

const props = defineProps<{
    data: {
        id: number,
        art: string,
        name: string,
    },
    userData: User | null,
    refresh: any,
    reviewsRantingValue: number[],
    hudeFunction: Function,
}>()

const { createAlert } = useAlert()


const userReview = ref({
    cardId: props.data.id,
    ranting: 0,
    text: '',
    userId: props.userData?.id
})

async function createCommit(functionCreate: any) {
    if (userReview.value.ranting || userReview.value.text) {
        const res = await functionCreate(userReview.value, props.reviewsRantingValue, userReview.value.cardId)
        if (res) hudeModal()
    } else {
        createAlert('Не заполнены поля')
    }
}

function hudeModal() {
    props.refresh(),
        props.hudeFunction(event),
        userReview.value.ranting = 0,
        userReview.value.text = ''
        createAlert('Ваш отзыв добавлен')
}
</script>