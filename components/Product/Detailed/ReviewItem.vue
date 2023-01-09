<template>
<div v-if="userInfo.profileImage" class="slader__item">
    <div>
        <div class="flex items-center py-4">
            <img :src="userInfo.profileImage" :alt="userInfo.username"
            class="w-16 rounded-full xl:w-12 md:w-10">
            <p class="text-xl text-gray-500 grow ml-4
            xl:text-lg sm:text-base">{{ userInfo.username }}</p>
            <OtherElseStar :quantity-star="userInfo.ranting"
            class="justify-between group is-icon-small"/>
        </div>
        <div class="py-2">
            <p class="text-black-500 text-lg sm:text-base">{{ userInfo.text }}</p>
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
interface UserInfo {
    id?: number,
    userId?: number,
    cardId?: number,
    text?: string,
    ranting?: number,
    username?: string,
    profileImage?: string
}

const props = defineProps<{ infoReview: object }>()

const { getUsetInfo } = useAuth()

const userInfo = ref<UserInfo>({})

async function getUserInfo() {
    const data = await getUsetInfo(props.infoReview.userId);
    Object.assign(userInfo.value, props.infoReview, data)
}
getUserInfo()
</script>