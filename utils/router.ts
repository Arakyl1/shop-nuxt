export const ROOTER = {
    1: { title: 'Доставка и Оплата', href: '/delivery' },
    2: { title: 'Контакты', href: '/contact' },
    3: { title: 'Производители', href: '/catalog' },
    4: { title: 'Подарочные сертификаты', href: '/delivery' },
    5: { title: 'Партнерская программа', href: '/contact' },
    6: { title: 'Акции', href: '/catalog' },
    7: { title: 'Все товары', href: '/catalog' },
    8: { title: 'Возврат товара', href: '/delivery' },
    9: { title: 'Личный кабинет', href: '/user/main' },
    10: { title: 'История заказов', href: '/user' },
    11: { title: 'Избранное', href: '/user/favorites' },
    12: { title: 'Рассылка', href: '/' },
    13: { title: 'Корзина', href: '/' },
    14: { title: 'Избранные товары', href: '/user' },
    15: { title: 'Просмотренные', href: '/user' },
    16: { title: 'Списки сравнения', href: '/user' },
    17: { title: 'Лист ожилания', href: '/user' },
    18: { title: 'Бонусный счет', href: '/user' },
    19: { title: 'Личные данные', href: '/user/main' },
    20: { title: 'История покупок', href: '/user' },
    21: { title: 'Отзывы и вопросы', href: '/user' },
}

export const FOOTER_ROUTER = [
    {
        title: 'Информация',
        links: [
            ROOTER[1],
            ROOTER[2],
            ROOTER[3],
            ROOTER[4],
            ROOTER[5],
            ROOTER[6],
            ROOTER[7]
        ]
    },
    {
        title: 'Служба поддержки',
        links: [
            ROOTER[8],
        ]
    },
    {
        title: 'Личный кабинет',
        links: [
            ROOTER[9],
            ROOTER[10],
            ROOTER[11],
            ROOTER[12],
        ]
    },
]

export const HEADER_ROUTER = [
    ROOTER[1],
    ROOTER[2],
]

export const MODAL_MENU_USER = [
    [ROOTER[13]],
    [ROOTER[14],ROOTER[15],ROOTER[16], ROOTER[17]],
    [ROOTER[18],ROOTER[19],ROOTER[20], ROOTER[21]],
]


export const PAGE_USER = [
    ROOTER[19],ROOTER[17],ROOTER[20],ROOTER[14],
    ROOTER[21],ROOTER[18],ROOTER[15],ROOTER[16],
]
