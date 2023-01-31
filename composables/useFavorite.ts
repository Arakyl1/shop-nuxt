import { favoriteProduct } from "@/pinia/favorite";

export default () => {
    const favoriteFun = favoriteProduct();
    const { favorite } = storeToRefs(favoriteFun)

    const toggleFavoriteProduct = (id: number) => favoriteFun.updateFavorite(id)
    return { toggleFavoriteProduct, favorite }
}