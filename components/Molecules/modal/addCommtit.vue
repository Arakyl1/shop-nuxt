<template>
    <AtomModalTransition :state="state" :draggable="true">
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
                    <AtomFormRating :quantity-star="userCommit.ranting" @number-star="(e) => { userCommit.ranting = e }"
                        :reset="reset" class="justify-start" />
                </div>
                <textarea rows="10" v-model="userCommit.text" class="w-full border border-yellow-500 rounded-md
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
<script setup lang="ts" generic="T extends { id: number, art: string, name: string }, U extends Omit<User, 'password'>">
import { Prisma, User } from "@prisma/client";
import type { AsyncDataExecuteOptions } from 'nuxt/dist/app/composables/asyncData';
import { alert as _alert } from "@/stores/alert";
import { Content } from "~~/type/intex";

const props = defineProps<{
    data: T,
    state: boolean,
    userData: U | null,
    refresh: (opts?: AsyncDataExecuteOptions | undefined) => Promise<void>,
    reviewsRantingValue: number[],
    modalFun: (...arg: any) => any,
}>()


const _content = useState<Content | null>('CONTENT_APP')
const form = ref<HTMLFormElement | null>(null)
const reset = ref<boolean>(false)
const textarea = ref<HTMLTextAreaElement | null>(null)
const userCommit = ref({
    [modelProp('Comment', 'ranting')]: 0,
    [modelProp('Comment', 'text')]: '',
})
const storeAlert = _alert()


async function onClick() {
    if (props.userData && userCommit.value.ranting !== 0 || userCommit.value.text !== '') {
        const body: Prisma.CommentCreateInput = {
            ...userCommit.value,
            user: { connect: { id: props.userData!.id } },
            ProductCard: { connect: { id: props.data.id } }
        }
        try {
            useFetch('/api/review/create', {
                method: "POST",
                server: true,
                body: body,
                onResponse({ response }) {
                    if (response.status < 400) {
                        hudeModal()
                    }
                }
            })
        } catch (error) {
            console.error(error);
        }
    } else if(_content.value) {
        storeAlert.create({ text: _content.value.ALERT_COMMENT_CREATE_INVALID_DATA || null, state: 'error' })
    }
}


function hudeModal() {
    if (_content.value) {
        storeAlert.create({ text: _content.value.ALERT_COMMENT_CREATE_SUCCESS || null, state: 'success' })
    }
    userCommit.value.ranting = 0
    userCommit.value.text = ''
    props.refresh()
    props.modalFun(false)
}
</script>
