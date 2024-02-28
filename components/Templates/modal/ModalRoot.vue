<template>
    <div>
        <ModalCard id="auth-user'" :bt-close="false"
            :active="activeModal === 'auth-user'" @close="onClose">
            <template #body>
                <ModalAuth/>
            </template>
        </ModalCard>
        <ModalCard id="basket-user'" 
            :active="activeModal === 'basket-user'" @close="onClose">
            <ModalBasket/>
        </ModalCard>
        <ModalCard id="favorite-user'" 
            :active="activeModal === 'favorite-user'" @close="onClose">
            <ModalFavorite/>
        </ModalCard>
        <ModalCard id="add-reviews-user'" 
            :active="activeModal === 'add-reviews-user'" @close="onClose">
            <ModalAddReview/>
        </ModalCard>
    </div>
</template>

<script setup>
import { modal as _modal } from '@/stores/modal.js'
import ModalCard from "@/components/UI/Modal/ModalCard.vue"
import ModalAuth from "@/components/Templates/modal/auth.vue"
import ModalBasket from "@/components/Templates/modal/basket.vue"
import ModalFavorite from "@/components/Templates/modal/favorite.vue"
import ModalAddReview from "@/components/Templates/modal/addCommtit.vue"
// import { TemplateModalAddReview as AddReview } from '#components'
// import ModalBase from '@/components/UI/Modal/ModalBase.vue'

const storeModal = _modal()
const { activeModal } = storeToRefs(storeModal)

function onClose(ev) {
    if (ev) return
    storeModal.changeActiveModal(null)
}
</script>
