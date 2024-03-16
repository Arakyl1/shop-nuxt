export function checkThisComponent(target, instanse) {
    const elem = unref(target).closest('[data-uid')
    if (elem instanceof HTMLElement && instanse) {
        return parseInt(elem.dataset.uid) === instanse.uid
    } return false
}

export function watchEvent(key, instanse, fun) {
    if (!key && !instanse && !fun) return null
    return ({ target }) => {
        if (target instanceof Element) {
            const _target = target.closest(`[${key}]`)
            if (_target) {
                if (!checkThisComponent(_target, unref(instanse))) {
                    fun()
                }
            } else {
                fun()
                console.log(2)
            }
        }
    }
}

export function initSize(elem) {

    let size = reactive({ w: 0, h: 0 })

    function getHeight(elem) {
        if (!elem instanceof HTMLElement) return
        const _elem = unref(elem)
        _elem.style.height = 'auto';
        _elem.style.position = 'absolute';
        _elem.style.visibility = 'hidden';
        _elem.style.display = 'block';

        const style = getComputedStyle(_elem);
        size.h = style.height;
      
        _elem.style.position = null;
        _elem.style.visibility = null;
        _elem.style.display = null;
        _elem.style.height = 0;
    }

    function refrech() {
        getHeight(unref(elem))
    }

    onMounted(() => getHeight(unref(elem)))
    
    return { size, refrech}
}