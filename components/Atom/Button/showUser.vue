<template>
    <slot name="bt" v-bind="{ showModalUser, _userData }">
        <AtomButtonStandart class="w-10 h-10 flex justify-center items-center bg-blue-500 py-0 px-1"
            :class="{ 'bg-yellow-500': _userData }" @click="showModalUser">
            <CreateIcon :name="'user_24_24'" :att="{ class: 'fill-white'}"/>
        </AtomButtonStandart>
    </slot>
</template>
<script setup lang="ts">
import { user as _user } from "@/stores/user";
import CreateIcon from "@/content/icons/create";

const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)

function showModalUser() {
    window.dispatchEvent(new CustomEvent('create-user'))
}
</script>