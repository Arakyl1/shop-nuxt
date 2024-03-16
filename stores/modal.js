 
export const modal = defineStore('modal', () => {
    const activeModal = ref(null)
    const route = useRoute()

    watch(() => route.fullPath, () => changeActiveModal(null))
    // нужно передать id модального окна
    // какие бывают id можно посмотреть ниже
    function changeActiveModal(value) {
        activeModal.value = value || null
    }
    
    return { activeModal, changeActiveModal }
})

// type ActiveModalID = 'add-reviews'|'auth-user'