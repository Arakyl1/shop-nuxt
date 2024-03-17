export const ROOTER = {
    1: { title: 'Все товары', href: '/catalog' },
    2: { title: 'Акции', href: '/catalog' },
    3: { title: 'Доставка и Оплата', href: '/delivery' },
    4: { title: 'Контакты', href: '/contact' },
    5: { title: 'Производители', href: '/catalog' },
    6: { title: 'Подарочные сертификаты', href: '/delivery' },
    7: { title: 'Партнерская программа', href: '/contact' },
    
    8: { title: 'Просмотренные', href: '/user' },
    9: { title: 'История заказов', href: '/user' },
    10: { title: 'Избранное', href: '/user/favorites' },
    11: { title: 'Рассылка', href: '/' },
    12: { title: 'Корзина', href: '/user/basket' },
    
    
    13: { title: 'Лист ожилания', href: '/user' },
    14: { title: 'Списки сравнения', href: '/user' },
    15: { title: 'Личные данные', href: '/user/main' },
    16: { title: 'Заказы', href: '/user' },
    17: { title: 'Возврат товара', href: '/user' },
    18: { title: 'Бонусная программа', href: '/user' },
    19: { title: 'Уведомления', href: '/user' },
    20: { title: 'Отзывы', href: '/user/reviews' },
    21: { title: 'Вопросы', href: '/user' },
}

export const FOOTER_ROUTER = [
    {
        title: 'Информация',
        links: [
            ROOTER[3],
            ROOTER[4],
            ROOTER[5],
            ROOTER[6],
            ROOTER[7],
            ROOTER[2]
        ]
    },
    {
        title: 'Служба поддержки',
        links: [
            ROOTER[17],
        ]
    },
    {
        title: 'Личный кабинет',
        links: [
            ROOTER[15],
            ROOTER[9],
            ROOTER[10],
            ROOTER[11],
        ]
    },
]

export const HEADER_ROUTER = [
    ROOTER[3],
    ROOTER[4],
]

export const MODAL_MENU_USER = [
    [ROOTER[15],ROOTER[12]],
    [ROOTER[9],ROOTER[8],ROOTER[20],ROOTER[21]],
    [ROOTER[16],ROOTER[18],ROOTER[14], ROOTER[13]],
]


export const PAGE_USER = [
    ROOTER[15],ROOTER[16],ROOTER[19],ROOTER[18],
    ROOTER[20],ROOTER[21],ROOTER[14],
]
