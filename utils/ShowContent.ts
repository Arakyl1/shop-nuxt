export default function () {
    const stage = ref(false)
    const { updateMask, active } = useWindowMask()

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