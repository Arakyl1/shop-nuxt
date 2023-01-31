import { basketProduct } from "@/pinia/basket";

export default () => {
    const basketProductFun = basketProduct();
    const { basket } = storeToRefs(basketProductFun)

    const addProductInBasket = (item: object) => basketProductFun.addBasketProduct(item)
    const removeProductInBasket = (index: number) => basketProductFun.removeBasketProduct(index)
    return { addProductInBasket, removeProductInBasket, basket }
}