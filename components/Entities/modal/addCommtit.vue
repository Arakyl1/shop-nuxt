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
            <UIStandart @click="createCommit()" class="bg-yellow-500 text-white sm:py-2">
                Опубликовать
            </UIStandart>
        </div>
    </div>
</template>
<script setup lang="ts">
import { UserBase } from '@/type/intex';
import { UserCreateCommit } from "@/type/intex";
import { AsyncDataExecuteOptions } from 'nuxt/dist/app/composables/asyncData';

const props = defineProps<{
    data: {
        id: number,
        art: string,
        name: string,
    },
    userData: UserBase | null,
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>,
    reviewsRantingValue: number[],
    hudeFunction: (e: MouseEventInit | undefined, active?: boolean) => void,
}>()

const { createAlert } = useAlert()
const { create } = useCommit()
const { update: updateProduct } = useProduct()


const userReview = ref({
    cardId: props.data.id,
    ranting: 0,
    text: ''
})

async function createCommit() {
    if ((userReview.value.ranting || userReview.value.text) && props.userData) {
            function returnUserData(...arg: object[]):UserCreateCommit {
                return Object.assign({}, ...arg)
            }
            returnUserData(userReview.value, { userId: props.userData.id })
        try {
            await create(returnUserData(userReview.value,{ userId: props.userData.id }))

            const averageValue = Math.round([userReview.value.ranting, ...props.reviewsRantingValue]
                .reduce((s, m) => s + m, 0) / (props.reviewsRantingValue.length + 1))

            await updateProduct({
                where: { id: userReview.value.cardId },
                data: { ranting: averageValue },
                select: { id: true }    
            })
            hudeModal()
        } catch (error) {
           console.error(error);
        }
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
