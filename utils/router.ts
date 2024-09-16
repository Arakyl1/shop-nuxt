export const ROOTER = {
    allProducts: { id: 'allProducts', title: 'Все товары', href: '/catalog' },
    stocks: { id: 'stocks', title: 'Акции', href: '/catalog' },
    deliveryAndPayment: { id: 'deliveryAndPayment', title: 'Доставка и Оплата', href: '/delivery' },
    contacts: { id: 'contacts', title: 'Контакты', href: '/contact' },
    manufacturers: { id: 'manufacturers', title: 'Производители', href: '/catalog' },
    giftCertificates: { id: 'giftCertificates', title: 'Подарочные сертификаты', href: '/delivery' },
    affiliateProgram: { id: 'affiliateProgram', title: 'Партнерская программа', href: '/contact' },
    
    viewed: { id: 'viewed', title: 'Просмотренные', href: '/user' },
    orderHistory: { id: 'orderHistory', title: 'История заказов', href: '/user' },
    favourites: { id: 'favourites', title: 'Избранное', href: '/user/favorites' },
    mailing: { id: 'mailing', title: 'Рассылка', href: '/' },
    basket: { id: 'basket', title: 'Корзина', href: '/user/basket' },
    
    
    waitingList: { id: 'waitingList', title: 'Лист ожидания', href: '/user' },
    comparisonLists: { id: 'comparisonLists', title: 'Списки сравнения', href: '/user' },
    personalData: { id: 'personalData', title: 'Личные данные', href: '/user/main' },
    orders: { id: 'orders', title: 'Заказы', href: '/user' },
    returnProduct: { id: 'returnProduct', title: 'Возврат товара', href: '/user' },
    bonusProgram: { id: 'bonusProgram', title: 'Бонусная программа', href: '/user' },
    notifications: { id: 'notifications', title: 'Уведомления', href: '/user' },
    reviews: { id: 'reviews', title: 'Отзывы', href: '/user/reviews' },
    questions: { id: 'questions', title: 'Вопросы', href: '/user' },
    admin: { id: 'admin', title: 'Админ', href: '/admin' },
    createProduct: { id: 'createProduct', title: 'Создать товар', href: '/admin/create_product' },
    managingHints: { id: 'managingHints', title: 'Управление подсказками', href: '/admin/tooltip' },
    createHints: { id: 'createHints', title: 'Создать подсказку', href: '/admin/tooltip/create' },
}

export const FOOTER_ROUTER = [
    {
        title: 'Информация',
        links: [
            ROOTER['deliveryAndPayment'],
            ROOTER['contacts'],
            ROOTER['manufacturers'],
            ROOTER['giftCertificates'],
            ROOTER['affiliateProgram'],
            ROOTER['stocks']
        ]
    },
    {
        title: 'Служба поддержки',
        links: [
            ROOTER['returnProduct'],
            ROOTER['admin'],
        ]
    },
    {
        title: 'Личный кабинет',
        links: [
            ROOTER['personalData'],
            ROOTER['orderHistory'],
            ROOTER['favourites'],
            ROOTER['mailing'],
        ]
    },
]

export const HEADER_ROUTER = [
    ROOTER['deliveryAndPayment'],
    ROOTER['contacts'],
]

export const MODAL_MENU_USER = [
    [ROOTER['personalData'],ROOTER['basket']],
    [ROOTER['orderHistory'],ROOTER['viewed'],ROOTER['reviews'],ROOTER['questions']],
    [ROOTER['orders'],ROOTER['bonusProgram'],ROOTER['comparisonLists'], ROOTER['waitingList']],
]


export const PAGE_USER = [
    ROOTER['personalData'],ROOTER['orders'],ROOTER['notifications'],ROOTER['bonusProgram'],
    ROOTER['reviews'],ROOTER['questions'],ROOTER['comparisonLists'],
]


export const PAGE_ADMIN = [
    ROOTER['admin'],ROOTER['createProduct'],ROOTER['managingHints'],
]

export const PAGE_ADMIN_TOOLTIP = [
    ROOTER['createHints']
]