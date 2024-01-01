 
export const modal = defineStore('modal', () => {
    const activeModal = ref(null)

    // нужно передать id модального окна
    // какие бывают id можно посмотреть ниже
    function changeActiveModal(value) {
        console.log(value)
        activeModal.value = value || null
    }
    
    return { activeModal, changeActiveModal }
})

// type ActiveModalID = 'add-reviews'