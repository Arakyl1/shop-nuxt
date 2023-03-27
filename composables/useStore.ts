import { basketProduct } from "@/pinia/basket";
import { favoriteProduct } from "@/pinia/favorite";
import { userActive } from "@/pinia/userActive";
import { accessToken as storeToken } from "@/pinia/accessToken";
import { containerSize } from "@/pinia/windowSize";
import { windowMask as _windowMask } from "@/pinia/windowMask";
import { BasketItem, UserBase } from "@/type/intex";

export default () => {
    const basket = () => {
        const basketProductFun = basketProduct();
        const { basket } = storeToRefs(basketProductFun)

        const addProductInBasket = (item: BasketItem) => basketProductFun.addBasketProduct(item)
        const removeProductInBasket = (index: number) => basketProductFun.removeBasketProduct(index)

        return { addProductInBasket, removeProductInBasket, basket }
    }

    const favorite = () => {
        const favoriteFun = favoriteProduct();
        const { favorite } = storeToRefs(favoriteFun)

        const toggleFavoriteProduct = (id: number) => favoriteFun.updateFavorite(id)
        return { toggleFavoriteProduct, favorite }
    }
    
    const user = () => {
        const user = userActive();
        const { userData } = storeToRefs(user)

        const updateUser = (data: UserBase | null) => { 
            user.updateActiveUser(data)
        }
        return { updateUser, userData }
    }

    const access = () => {
        const access = storeToken();
        const { accessToken } = storeToRefs(access)
    
        const updateAccessToken = (data: string) => {
            access.updateAccessToken(data)
        }
        return { updateAccessToken, accessToken }
    }

    const windowSize = () => {
        const container = containerSize();
        const { size } = storeToRefs(container)
        
        const updateSize = (data: Window) => { 
            container.updateSize(data)
        }
        return { updateSize, size }
    }

    
    const windowMask = () => {
    const windowMaskFun = _windowMask()
    const { active } = storeToRefs(windowMaskFun)

    function updateMask(value:boolean) {
        windowMaskFun.updateActive(value)
    }
    return { active, updateMask }
}

    return { basket, favorite, user, access, windowSize, windowMask }
}




