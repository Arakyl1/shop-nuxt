<template>
    <div>
        <ModalCard id="auth-user'"
            :active="activeModal === 'auth-user'" @close="onClose">
            <!-- <AddReview/> -->
        </ModalCard>
    </div>
</template>

<script setup>
import { modal as _modal } from '@/stores/modal.js'
import ModalCard from "@/components/UI/Modal/ModalCard.vue"
// import { TemplateModalAddReview as AddReview } from '#components'
// import ModalBase from '@/components/UI/Modal/ModalBase.vue'

const storeUser = _modal()
const { activeModal } = storeToRefs(storeUser)

function onClose(ev) {
    if (ev) return
    storeUser.changeActiveModal(null)
}
</script>
