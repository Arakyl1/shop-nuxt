import type { StoreUser } from "@/type/intex"
import type { Role } from "@prisma/client"
// import type { UserAnonim } from "@/server/api/auth/anonim"
// import type { UserBuyer } from "@/server/api/auth/user.get"

export const user = defineStore('user', () => {

    const data = ref<StoreUser | null>(null)
    type UserData = typeof data.value
  
    const userStatus = computed<Role | null>(() => data.value ? data.value?.role : null)
    const anonim = computed(() => userStatus.value ? userStatus.value === 'ANONIM' : null)
    const basket = computed(() => data.value ? data.value.basket : null)
    const basketLength = computed(() => basket.value ? basket.value.item.length : 0)
    const favorites = computed(() => data.value ? data.value.favorites : null)
    const favoriteLength = computed(() => favorites.value ? favorites.value.item.length : 0)

    function update(user: UserData | null) {
        data.value = user
        console.log('set user data')
    }

    function updateBasket<T extends NonNullable<UserData>['basket']>(basket: T) {
        if (data.value) {
            data.value.basket = basket
        }
    }

    function updateFavorite(favorites: NonNullable<UserData>['favorites']) {
        if (data.value) {
            data.value.favorites = favorites
        }
    }


    return { data, anonim, basket, basketLength, favorites, favoriteLength, update , updateBasket, updateFavorite }
})