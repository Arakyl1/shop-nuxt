import { defineStore } from "pinia";

export const alertContent = defineStore('alertContent', () => {
    const content = ref<string>('')
    const alertActive = ref<boolean>()
    
    function updateContent(cont: string) {
        content.value = cont

        setTimeout(() => {
            alertActive.value = true
        }, 500);
        setTimeout(() => {
            alertActive.value = false
        }, 4000);
    }

    return { content, alertActive, updateContent }
})

export const windowMask = defineStore('windowMask', () => {
    const active = ref<boolean>(false)

    function updateActive(stage: boolean = !active.value) {
        active.value = stage
    }
    return { active, updateActive }
})

// export const userActive = defineStore('userActive', () => {
//     const userData = ref<object | null>(null)

//     function updateActiveUser(user: object | null) {
//         userData.value = user
//     }
//     return { userData, updateActiveUser }
// })

// export const accessToken = defineStore('accesshToken', () => {
//     const accessToken = ref<string>('')

//     function updateAccessToken(token: string) {
//         accessToken.value = token        
//     }
//     return { accessToken, updateAccessToken }
// })

export const favoriteProduct = defineStore('favoriteProduct', () => {

    const favorite = reactive<any>({
        list: new Set([])
    })

    onBeforeMount(() =>{
        const localStorage = myGetItem('favorite')
        if (localStorage) {
            favorite.list = new Set(JSON.parse(localStorage))
        }
    })

    function updateFavorite(id: number) {
        if (!favorite.list.has(id)) {
            favorite.list.add(id)
        } else {
            favorite.list.delete(id)
        }
        mySetItem('favorite', [...favorite.list])
    }

    return { favorite, updateFavorite }
})

export const basketProduct = defineStore('basketProduct', () => {
    
    const basket = ref<any>([])
    const alertFun = alertContent()

    function addBasketProduct(item: {id: number, quantity: number }) { 
        if (basket.value.findIndex(el => el.id === item.id) === -1) {
            basket.value.push(item)
        } else {
            alertFun.updateContent('Этот товар уже есть в ващей корзине')
        }
        mySetItem('basket', basket.value)
    }

    function removeBasketProduct(index: number) {
        basket.value.splice(index, 1)
        mySetItem('basket', basket.value)
    }

    onBeforeMount(() => {
        const localStorage = myGetItem('basket')
        if (localStorage) {
            basket.value = JSON.parse(localStorage)
        }
    })
    return { basket, addBasketProduct, removeBasketProduct }
})


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

