
export default () => {
    const { favorite} = useStore()
    const { toggleFavoriteProduct, favorite: _favoriteStore } = favorite()

    const addFatoriteItem = (id: number) => {
        toggleFavoriteProduct(id)
    }
    const checkIdInFavorites = (id: number) => computed(() => _favoriteStore.value.has(id))

    return { addFatoriteItem, checkIdInFavorites }
}
