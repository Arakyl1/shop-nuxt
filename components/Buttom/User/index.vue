<template>
    <slot name="buttom" v-bind="{ user, updateStage }">
        <ButtomStandart
        class="w-10 h-10 flex justify-center items-center bg-blue-500 py-0 px-1"
        :class="{ 'bg-yellow-500': user.userData }"
        @click="updateStage">
            <IconUser class="group is-icon-white"/>
        </ButtomStandart>
    </slot>
    <OtherModalTransition class=" min-h-min w-[450px] sm:w-[calc(100vw-2rem)]" :active="stage">
        <div class="bg-white py-8 px-12 rounded-md w-full h-full
        sm:py-6 sm:px-6">
            <!-- <template v-if="user.userData">
                <ButtomUserMain/>
            </template>
            -->
            
                <h3 class="text-3xl text-center font-medium text-black-500 mb-7"
                >{{ modalLogin ? 'Авторизация' : 'Регистрация' }}</h3>
                    <ButtomUserLogin v-if="modalLogin" :functionModal="updateStage" :active="stage"/>
                    <ButtomUserRegister v-else :active="stage"/>
                <div class="decor-line mt-6 mb-3"></div>
                <p class="text-center text-blue-500 cursor-pointer"
                @click="modalLogin = !modalLogin"
                >{{ modalLogin ? 'Создать аккаунт' : 'Войти в аккаунт' }}</p>
            
        </div>
    </OtherModalTransition>
</template>
<script setup lang="ts">
import { userActive } from "@/pinia/store"
import ShowContent from "~~/utils/ShowContent";

const { stage, updateStage } = ShowContent()
const modalLogin = ref<boolean>(true)
const user = userActive()

</script>
