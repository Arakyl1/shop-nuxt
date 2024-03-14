<template>
    <Group class="gap-y-4" :class="className['body']" v-if="_userData && activeProduct">
        <Flex class="gap-x-4">
            <Image :src="_userData.profileImage" :square="true"
            alt="user-image"
            :rounded="'xl'"
            class="w-14 p-0.5"
            :class="className['border']"/>
            <p class="text-lg text-gray-900">{{ _userData.username }}</p>
        </Flex>
        <div class="decor-line"></div>
        <form class="w-full" ref="form">
            <Group class="gap-y-3">
                <Flex class="gap-x-3">
                    <p class="text-md">{{ activeProduct.name }}</p>
                    <p class="text-md text-gray-500">{{ activeProduct.art }}</p>
                </Flex>
                <Rating :readonly="false" :step="1" :name="modelProp('Comment', 'ranting')"/>
                <textarea rows="10"
                class="rounded-xl "
                :name="modelProp('Comment', 'text')"
                :class="[className['textarea'], className['border']]"></textarea>
            </Group>
        </form>
        <Flex :justify="'end'" class="w-full">
            <Button
            :appearance="'yellow'"
            :text="'Опубликовать'"
            :size="'lg'"
            class="h-10 text-base"
            @click="onClick"/>
        </Flex>
    </Group>
</template>

<script setup lang="ts">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Rating from "@/components/UI/Rating/Rating.vue";
import Image from "@/components/UI/Image/Image.vue";
import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";
import { createReviews as _createReviews } from "@/stores/createReviews";
import { Prisma } from "@prisma/client";


const storeUser = _user()
const storeCreateReviews = _createReviews()
const { data: _userData } = storeToRefs(storeUser)
const { data: activeProduct } = storeToRefs(storeCreateReviews)
const form = ref<HTMLFormElement | null>(null)
const className = useCssModule()
const storeAlert = _alert()

async function onClick() {
    if (!form.value || !_userData.value || !activeProduct.value) return

    const formData = new FormData(form.value)
    const createData: { [k: string]: any } = {}
    
    for (const [key,value] of formData) {
        if (value) {
            createData[key] = ['ranting', 'id'].includes(key) ? Number(value) : value
        }
    }

    const body: Prisma.CommentCreateInput = {
        ...createData,
        user: { connect: { id: _userData.value.id as never } },
        ProductCard: { connect: { id: activeProduct.value.id } }
    }
    console.log(body)
    useFetch('/api/review/create', {
        method: "POST",
        server: true,
        body: body,
        onResponse({ response }) {
            if (response.status < 400) {
                handleResponse()
            }
        }
    })
    
}

function handleResponse() {
    resetForm(form)
    storeAlert.create({ key: 'COMMENT_CREATE_SUCCESS', state: 'success' })
    refreshNuxtData(GET_ASYNC_DATA_KEY('getFullInfoProduct'))
}

// async function onClick() {
//     if (props.userData && userCommit.value.ranting !== 0 || userCommit.value.text !== '') {
//         const body: Prisma.CommentCreateInput = {
//             ...userCommit.value,
//             user: { connect: { id: props.userData!.id } },
//             ProductCard: { connect: { id: props.data.id } }
//         }
//         try {
//             useFetch('/api/review/create', {
//                 method: "POST",
//                 server: true,
//                 body: body,
//                 onResponse({ response }) {
//                     if (response.status < 400) {
//                         hudeModal()
//                     }
//                 }
//             })
//         } catch (error) {
//             console.error(error);
//         }
//     } else if (_content.value) {
//         storeAlert.create({ text: _content.value.ALERT_COMMENT_CREATE_INVALID_DATA || null, state: 'error' })
//     }
// }


// function hudeModal() {
//     if (_content.value) {
//         storeAlert.create({ text: _content.value.ALERT_COMMENT_CREATE_SUCCESS || null, state: 'success' })
//     }
//     userCommit.value.ranting = 0
//     userCommit.value.text = ''
//     props.refresh()
//     props.modalFun(false)
// }
</script>

<style lang="css" module>
.body {
    /* max-width: 900px; */
    height: min-content;
    /* min-width: 100%; */
}
.textarea {
    width: 100%;
    padding: 1rem;
}

.border {
    border: 1px solid var(--yellow-500);
}

.textarea:focus-visible {
    outline: 0;
}

@media screen and (min-width: 769px) {
    .body {
        width: 400px;
    } 
}
</style>
