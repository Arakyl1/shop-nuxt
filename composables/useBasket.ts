import { basketProduct } from "@/pinia/basket";
import { ItemBasket } from "~~/type/intex";

export default () => {
    const addBasket = (item:ItemBasket) => {    
        const store = basketProduct()
        const { createAlert } = useAlert()

        if (store.findProductInBasket(item.id) === -1) {
            store.addBasketProduct(item)
            createAlert('Товар добавлен в корзину')
        } else {
            createAlert('Этот товар уже в ващей корзине')
        }
    }
    return { addBasket }
}