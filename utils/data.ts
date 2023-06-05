export const filterListParams = [
    { title: 'Новинки', name: getPropertyName('news'), value: true },
    { title: 'Акции', name: getPropertyName('sale'), value: true },
    { title: 'Популярные', name: getPropertyName('top'), value: true }
]

export const filterListServive = [
    { title: 'Доставка', name: getPropertyName('delivery'), value: true },
    { title: 'Самовывоз', name: getPropertyName('pickUp'), value: true },
    { title: 'Под заказ', name: getPropertyName('underTheOrder'), value: true },
    { title: 'В наличии', name: getPropertyName('availability'), value: true }
]
