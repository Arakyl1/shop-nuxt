export default () => {

    const route = useRoute()
    const activePage = computed(() => 'page' in route.query ? parseInt(route.query.page) : 1)

    function updatePage(e, cardLength, sizePage) {
        if (isNumber(e) || isNumeric(e)) {
            const maxPage = Math.ceil(unref(cardLength) / unref(sizePage))
            const value = e > maxPage ? maxPage : e < 1 ? 1 : isNumber(e) ? e : parseInt(e)

            return navigateTo({
                path: route.path,
                query: {
                    ...route.query,
                    page: value
                },
            })
        }
    }
    
    function getInfoPagination(cardLength, sizePage, text = 'товаров') {
        const length = unref(cardLength)
        const value = unref(sizePage) * unref(activePage)
        const vis = value > length ? length : value
        return `Вы посмотрели ${vis} из ${length} ${text}`
    }

    return { activePage, updatePage, getInfoPagination}
}