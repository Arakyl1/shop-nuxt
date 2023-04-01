<template>
    <slot name="bt" v-bind="{ showModalUser, userData }">
        <AtomButtonStandart class="w-10 h-10 flex justify-center items-center bg-blue-500 py-0 px-1"
            :class="{ 'bg-yellow-500': userData }" @click="showModalUser">
            <IconUser class="group is-icon-white h-5" />
        </AtomButtonStandart>
    </slot>
</template>
<script setup lang="ts">
const { user: _user} = useStore()
const { userData } = _user()

function showModalUser() {
    window.dispatchEvent(new CustomEvent('createUser'))
}
</script>