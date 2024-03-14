<template>
    <Transition name="auth" :duration="300" mode="out-in">
        <Main v-if="!_userAnonim"/>
        <Login v-else-if="state">
            <div :class="className['footer-button']">
                <div class="decor-line"></div>
                <Button
                :mode="'link'"
                :text="'Создать аккаунт'"
                @click="update(!state)"
                class="text-sm"/>
            </div>
        </Login>
        <Register v-else-if="!state">
            <div :class="className['footer-button']">
                <div class="decor-line"></div>
                <Button
                :mode="'link'"
                :text="'Войти в аккаунт'"
                @click="update(!state)"
                class="text-sm"/>
            </div>
        </Register>
    </Transition>
</template>


<script setup lang="ts">
import { user as _user } from "@/stores/user";
import Login from "@/components/Templates/modal/auth/login.vue";
import Register from "@/components/Templates/modal/auth/register.vue";
import Main from "@/components/Templates/modal/auth/main.vue";
import Button from "@/components/UI/Button/Button.vue";
import localState from "@/utils/localState";


const storeUser = _user()
const { data: _userData, anonim: _userAnonim } = storeToRefs(storeUser);
const  className = useCssModule()
const { state, update } = localState()


function resetData() {
    nextTick(() => {
        const event = new CustomEvent('restore')
        window.dispatchEvent(event)
    })
}

watch(() => _userAnonim.value, () => {
    resetData()
})

</script>

<style lang="css" module>
.footer-button {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    align-items: center;
}
</style>