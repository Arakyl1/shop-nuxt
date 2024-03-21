<template>
    <Transition name="auth" :duration="300" mode="out-in">
        <Main v-if="!_userAnonim"/>
        <Login v-else-if="!state">
            <Group class="gap-4"  :align="'center'":class="className['footer-button']">
                <div class="decor-line"></div>
                <Button
                :mode="'link'"
                :text="common.USER_REGISTER"
                @click="update(!state)"
                class="text-sm"/>
            </Group>
        </Login>
        <Register v-else-if="state">
            <Group class="gap-4" :align="'center'" :class="className['footer-button']">
                <div class="decor-line"></div>
                <Button
                :mode="'link'"
                :text="common.USER_LOGIN"
                @click="update(!state)"
                class="text-sm"/>
            </Group>
        </Register>
    </Transition>
</template>


<script setup lang="ts">
import { user as _user } from "@/stores/user";
import Login from "@/components/Templates/modal/auth/login.vue";
import Register from "@/components/Templates/modal/auth/register.vue";
import Main from "@/components/Templates/modal/auth/main.vue";
import Button from "@/components/UI/Button/Button.vue";
import Group from "@/components/UI/Group/Group.vue";
import localState from "@/utils/localState";
import { BASE_BUTTON as common } from '@/common/C'


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
/* purgecss ignore */
.footer-button {
    margin-top: 1rem;
}
</style>