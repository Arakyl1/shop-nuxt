
export default function localState() {
    const state = ref<boolean>(false)

    const update = (active: boolean) => {
        if (typeof active === 'boolean') {
            state.value = active
        }
    }
    
    watch(() => useRoute().fullPath, () => {
        if (state.value) update(false)
    })

    return { state, update }
}