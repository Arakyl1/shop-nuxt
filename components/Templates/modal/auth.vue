<template>
    <Transition name="auth" :duration="300" mode="out-in">
        <template v-if="false"><p>dsdgsdg</p></template>
        <Login v-else-if="modalLogin">
            <div :class="className['footer-button']">
                <div class="decor-line"></div>
                <Button
                :mode="'link'"
                :text="'Создать аккаунт'"
                @click="onClick"
                class="text-sm"/>
            </div>
        </Login>
        <Register v-else-if="!modalLogin">
            <div :class="className['footer-button']">
                <div class="decor-line"></div>
                <Button
                :mode="'link'"
                :text="'Войти в аккаунт'"
                @click="onClick"
                class="text-sm"/>
            </div>
        </Register>
    </Transition>
</template>


<script setup lang="ts">
import { user as _user } from "@/stores/user";
// import Flex from "@/components/UI/Flex/Flex.vue";
// import Group from "@/components/UI/Group/Group.vue";
// import Input from "@/components/UI/Input/Input.vue";
import Button from "@/components/UI/Button/Button.vue";
// import Card from "@/components/UI/Card/Card.vue";
// import Image from "@/components/UI/Image/Image.vue";
import Login from "@/components/Templates/modal/auth/login.vue";
import Register from "@/components/Templates/modal/auth/register.vue";
// import localState from "@/utils/localState";
import { alert as _alert } from "@/stores/alert";

// const { state, update } = localState()
const modalLogin = ref<boolean>(true)
const storeUser = _user()
const { data: _userData, anonim: _userAnonim } = storeToRefs(storeUser)
// const reset = ref<boolean>(false)
const storeAlert = _alert()
const  className = useCssModule()


function onClick() {
    modalLogin.value = !modalLogin.value
}
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