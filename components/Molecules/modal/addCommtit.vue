<template>
    <AtomModalTransition :active="stage" :draggable="true">
        <div class="bg-white rounded-md py-8 px-6 sm:py-6 sm:px-4">
            <div class="flex items-center mb-4" v-if="userData">
                <img :src="userData.profileImage" alt="user-image" class="w-12 aspect-square">
                <p class="text-lg text-gray-900 ml-4">{{ userData.username }}</p>
            </div>
            <div class="decor-line mb-6 sm:mb-4"></div>
            <form>
                <div class="flex mb-3">
                    <p class="texl-lg text-black-500 ">{{ data.name }}
                        <span class="texl-lg text-gray-500 pl-3 ">{{ data.art }}</span>
                    </p>
                </div>

                <div class="mb-4">
                    <AtomUIStar
                    :quantity-star="userCommit.ranting"
                    @number-star="(e) => { userCommit.ranting = e }"
                    :reset="reset"
                        class="justify-start" />
                </div>
                <textarea rows="10"
                v-model="userCommit.text"
                class="w-full border border-yellow-500 rounded-md
                p-4 mb-6 focus-visible:outline-0 sm:p-2"></textarea>
                <div class="text-right">
                    <AtomButtonStandart @click="onClick()" class="bg-yellow-500 text-white sm:py-2">
                        Опубликовать
                    </AtomButtonStandart>
                </div>
            </form>
        </div>
    </AtomModalTransition>
</template>
<script setup lang="ts" generic="T extends GG, U extends UserBase">
import { Prisma } from "@prisma/client";
import type { UserBase, GG } from '@/type/intex';
import type { AsyncDataExecuteOptions } from 'nuxt/dist/app/composables/asyncData';
import type { updateStage } from '~~/utils/ShowContent';


const props = defineProps<{
    data: T,
    stage: boolean,
    userData: U | null,
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>,
    reviewsRantingValue: number[],
    hudeFunction: updateStage,
}>()

const { createAlert } = useAlert()
const { create } = useCommit()
const { update: updateProduct } = useProduct()
const form = ref<HTMLFormElement | null>(null)
const reset = ref<boolean>(false)
const textarea = ref<HTMLTextAreaElement | null>(null)
const userCommit = ref({
    [modelProp('Comment','ranting')]: 0,
    [modelProp('Comment','text')]: '',
    [modelProp('Comment','userId')]: props.userData && 'id' in props.userData ? props.userData.id : 0,
    [modelProp('Comment','cardId')]: props.data.id,
})


async function onClick() {
    if (props.userData && checkValidForm(unref(userCommit))) {
        try {
            await create(userCommit.value)
            const averageValue = Math.round([userCommit.value.ranting!, ...props.reviewsRantingValue]
                .reduce((s, m) => s + m, 0) / (props.reviewsRantingValue.length + 1))
            await updateProduct({
                where: { id: props.data.id },
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


function checkValidForm<T extends object>(obj: T): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const el = obj[key];
            if (isString(el) && el === '') return false
            if (isNumber(el) && el === 0) return false    
        }
    }
    return true   
}
    


function hudeModal() {
    props.refresh(),
    props.hudeFunction(event),
    createAlert('Ваш отзыв добавлен')
    userCommit.value.ranting = 0
    userCommit.value.text = ''
}
</script>
