export default function () {
    const stage = ref(false)
    const { windowMask: _windowMask } = useStore()
    const { updateMask, active } = _windowMask()

    function updateStage(e: MouseEventInit | undefined , active: boolean = !stage.value ) { 
        stage.value = active
        updateMask(active)  
    }

    watch(() => useRoute().fullPath, async () => {
        if (stage.value) updateStage(event, false)
    })
    watch(() => active.value, (newActive) => {
 
        if (stage.value && !newActive) {
            stage.value = false
        }
    })
    return { stage, updateStage }
}