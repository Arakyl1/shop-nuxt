export const containerSize = defineStore('containerSize', () => {
    const size = reactive<{ width: number , heigth: number }>({
        width: 0,
        heigth: 0,
    })

    function updateSize(elem: Window) {
        size.width = elem?.innerWidth,
        size.heigth = elem?.innerHeight
    }

    return { size, updateSize }
})