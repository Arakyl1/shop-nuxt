export default () => {

    const createAndSendEventRestore = () => {
        const event = new CustomEvent('restore')
        window.dispatchEvent(event)
    }

    const addToWatchEventRestore = (
        handler: (...arg: any[]) => any,
        option: AddEventListenerOptions | boolean = { passive: true }
    ) => {
        onMounted(() => window.addEventListener('restore', handler, option))
        onBeforeUnmount(() => window.removeEventListener('restore', handler))
    }

    return { createAndSendEventRestore, addToWatchEventRestore }
}