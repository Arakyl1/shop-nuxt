export default (props, watchFun) => {

    const isActive = ref(false)
    const timer = ref(null)

    const mapEvent = {
        hover: { name: 'mouseenter', opt: { 'capture': true } },
        click: { name: 'click', opt: {} },
        focus: { name: 'focus', opt: { 'capture': true } },
        contextmenu: { name: 'contextmenu', opt: {} }
    }

    onMounted(() => {
        if (!('triggers' in props && props.triggers && props.autoClose)) return

        for (let i = 0, l = props.triggers.length; i < l; i++) {
            const trigger = props.triggers[i];
            if (trigger in mapEvent) {
                const event = mapEvent[trigger]
                window.addEventListener(event.name, watchElements, { ...event.opt })
            }
        }

        window.addEventListener('resize', onResize)
    })
    
    onBeforeUnmount(() => {
        if (!('triggers' in props && props.triggers && props.autoClose)) return
        
        for (let i = 0, l = props.triggers.length; i < l; i++) {
            const trigger = props.triggers[i];
            if (trigger in mapEvent) {
                window.addEventListener(mapEvent[trigger], watchElements)
            }
        }
        window.removeEventListener('resize', onResize)
    })
    

    function open() {
        
        if (props.delay || props.delay === 0) {
            timer.value = setTimeout(() => {
                
                isActive.value = true
                timer.value = null
            }, props.delay)
        } else {
            isActive.value = true
        }
    }
    
    function close() {
        if (props.autoClose && timer.value) clearTimeout(timer.value)
    
        if (props.closeDelay || props.closeDelay === 0) {
            timer.value = setTimeout(() => {
                isActive.value = false
                timer.value = null
            }, props.closeDelay)
        } else {
            isActive.value = false
        }
    }
    
    function onClick() {
        if (!props.triggers.includes('click')) return
        nextTick(() => setTimeout(() => open()))
    }
    
    function onHover(e) {
        if (!props.triggers.includes('hover')) return

        open()
    }
    
    function onContextMenu(e) {
        if (!props.triggers.includes('contextmenu')) return
        e.preventDefault()
        open()
    }
    
    function onFocus() {
        if (!props.triggers.includes('focus')) return
        open()
    }
    
    function watchElements(event) {
        if (isActive.value && watchFun) {
            watchFun(event)
        }
    }

    function onResize() {
        if (isActive.value) {
            close()
        }
    }

    return { isActive, timer, open, close, onClick, onHover, onContextMenu, onFocus }
}