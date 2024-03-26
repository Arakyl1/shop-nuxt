import { onBeforeUnmount, onMounted, reactive } from 'vue'

export function mouseElemPosition<T extends Ref<HTMLElement | null>>(elem: T) {
 
    const _elem = ref(elem)
    const mouseStartPos = reactive({ x: 0, y: 0, started: false, vector: 0 })

    const onMouseStart = (e: MouseEvent) => {
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY
        mouseStartPos.started = true
        mouseStartPos.vector = 0
    }
    const onMouseMove = (e: MouseEvent) => {
        if (!mouseStartPos.started) {
            return
        }

        const dx = e.clientX - mouseStartPos.x
        const absDx = Math.abs(dx)
        const dy = e.clientY - mouseStartPos.y
        const absDy = Math.abs(dy)

        if (Math.max(absDx, absDy) > 200) {
            mouseStartPos.vector = (absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 4))
        }
    }
    const onMouseEnd = (e: MouseEvent) => {
        mouseStartPos.started = false
    }

    function addHandler<T extends HTMLElement>(elem: T) {
        if (elem instanceof HTMLElement) {
            elem.addEventListener('mousedown', (e) => onMouseStart(e), { passive: true })
            elem.addEventListener('mousemove', (e) => onMouseMove(e), { passive: true })
            elem.addEventListener('mouseup', (e) => onMouseEnd(e), false)
        }
    }

    function removeHandler<T extends HTMLElement>(elem: T) {
        if (elem instanceof HTMLElement) {
            elem.removeEventListener('mousedown', onMouseStart,)
            elem.removeEventListener('mousemove', onMouseMove)
            elem.removeEventListener('mouseup', onMouseEnd)
        }
    }

    onMounted(() => addHandler(unref(elem)!))
    onBeforeUnmount(() => removeHandler(unref(elem)!))

    watch(() => _elem.value, (newV) => {
        if (newV) { addHandler(unref(elem)!) }
    })

    return mouseStartPos
}
