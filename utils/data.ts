
export const filterListParams = [
    { title: 'Новинки', name: modelProp('ProductCard','news'), value: true },
    { title: 'Акции', name: modelProp('ProductCard','sale'), value: true },
    { title: 'Популярные', name: modelProp('ProductCard','top'), value: true }
]

export const filterListServive = [
    { title: 'Доставка', name: modelProp('ProductCard','delivery'), value: true },
    { title: 'Самовывоз', name: modelProp('ProductCard','pickUp'), value: true },
    { title: 'Под заказ', name: modelProp('ProductCard','underTheOrder'), value: true },
    { title: 'В наличии', name: modelProp('ProductCard','availability'), value: true }
]
