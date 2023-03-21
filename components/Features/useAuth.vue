<template>
    <SharedUIModalTransition class=" h-min w-[450px] sm:w-[calc(100vw-2rem)]" :active="stage">
        <div class="bg-white py-8 px-12 rounded-md w-full h-full
        sm:py-6 sm:px-6">
            <template v-if="userData">
                <EntitiesAuthMain/>
            </template>
           
            <template v-else>
                <h3 class="text-3xl text-center font-medium text-black-500 mb-7"
                >{{ modalLogin ? 'Авторизация' : 'Регистрация' }}</h3>
                    <EntitiesAuthLogin v-if="modalLogin" :active="stage"/>
                    <EntitiesAuthRegister v-else :active="stage"/>
                <div class="decor-line mt-6 mb-3"></div>
                <p class="text-center text-blue-500 cursor-pointer"
                @click="modalLogin = !modalLogin"
                >{{ modalLogin ? 'Создать аккаунт' : 'Войти в аккаунт' }}</p>
            </template>
            
        </div>
    </SharedUIModalTransition>
</template>
<script setup lang="ts">
import ShowContent from '~~/utils/ShowContent';

const { stage, updateStage } = ShowContent()
const modalLogin = ref<boolean>(true)
const { user: _user} = useStore()
const { userData } = _user()

onBeforeMount(() => {
    window.addEventListener('createUser', updateStage)
})
</script>
