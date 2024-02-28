export default <T extends string>() => {

    const activeStatus = ref<T|null>(null)

    function setStatus(key: typeof activeStatus.value):void {
        activeStatus.value = key || null
    }

    return { activeStatus, setStatus }
}