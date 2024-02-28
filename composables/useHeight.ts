export default (el: any) => {
    const size = reactive<{ w: number | string, h: number | string }>({ w: 0, h: 0 })

    function getHeight(elem: HTMLElement | null) {
        const _elem = unref(elem)
        
        if (_elem instanceof HTMLElement) {
            _elem.style.height = 'auto';
            _elem.style.position = 'absolute';
            _elem.style.visibility = 'hidden';
            _elem.style.display = 'block';
            
            const style = getComputedStyle(_elem);
            size.h = style.height;
            _elem.style.position = '';
            _elem.style.visibility = '';
            _elem.style.display = '';
            _elem.style.height = '0';
        }
    }
    function onResize() {
        nextTick(() => getHeight(el))
    }

    onMounted(() =>{
        getHeight(el)
        window.addEventListener('resize',onResize)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize',onResize)
    })

    return size
}


    

    

    
    
    