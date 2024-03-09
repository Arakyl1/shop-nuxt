<template>
    <Group class="gap-y-4" :class="className['body']">
        <Flex class="gap-x-4">
            <Image src="/user.jpg" :square="true"
            alt="user-image"
            :rounded="'full'"
            class="w-14 p-0.5"
            :class="className['border']"/>
            <p class="text-lg text-gray-900">userData.username</p>
        </Flex>
        <div class="decor-line"></div>
        <form class="w-full">
            <Group class="gap-y-3">
                <Flex class="gap-x-3">
                    <p class="text-lg">data.name</p>
                    <p class="text-lg text-gray-500">data.art</p>
                </Flex>
                <Rating :readonly="false" :step="1"/>
                <textarea rows="10"
                class="rounded-xl "
                :class="[className['textarea'], className['border']]"></textarea>
            </Group>
        </form>
        <Flex :justify="'end'" class="w-full">
            <Button
            :appearance="'yellow'"
            :text="'Опубликовать'"
            :size="'lg'"
            class="h-12 text-base"/>
        </Flex>
    </Group>
</template>

<script setup lang="ts" generic="T extends { id: number, art: string, name: string }, U extends Omit<User, 'password'>">
import Flex from "@/components/UI/Flex/Flex.vue";
import Group from "@/components/UI/Group/Group.vue";
import Button from "@/components/UI/Button/Button.vue";
import Rating from "@/components/UI/Rating/Rating.vue";
import Image from "@/components/UI/Image/Image.vue";
import { User } from "@prisma/client";
import { alert as _alert } from "@/stores/alert";

const props = defineProps<{}>()


// const _content = useState<Content | null>('CONTENT_APP')
const form = ref<HTMLFormElement | null>(null)
const className = useCssModule()
// const reset = ref<boolean>(false)
// const textarea = ref<HTMLTextAreaElement | null>(null)
// const userCommit = ref({
//     [modelProp('Comment', 'ranting')]: 0,
//     [modelProp('Comment', 'text')]: '',
// })
// const storeAlert = _alert()


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
