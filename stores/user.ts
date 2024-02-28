import { Anonim } from "~~/type/intex"

export const user = defineStore('user', () => {
    const data = ref<Anonim | null>(null)


    const anonim = computed(() => data.value ? data.value?.anonim : null)
    const basket = computed(() => data.value ? data.value.basket : null)
    const basketLength = computed(() => basket.value ? basket.value.item.length : 0)

    function update(user: Anonim | null) {
        data.value = user
        console.log('set user data')
    }

    function updateBasket(basket: Anonim['basket']) {
        if (data.value) {
            data.value.basket = basket
        }
    }

    return { data, anonim, basket, basketLength, update , updateBasket}
})