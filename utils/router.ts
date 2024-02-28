export const ROOTER = {
    1: { title: 'Доставка и Оплата', href: '/delivery' },
    2: { title: 'Контакты', href: '/contact' },
    3: { title: 'Производители', href: '/catalog' },
    4: { title: 'Подарочные сертификаты', href: '/delivery' },
    5: { title: 'Партнерская программа', href: '/contact' },
    6: { title: 'Акции', href: '/catalog' },
    7: { title: 'Все товары', href: '/catalog' },
    8: { title: 'Возврат товара', href: '/delivery' },
    9: { title: 'Личный кабинет', href: '/' },
    10: { title: 'История заказов', href: '/' },
    11: { title: 'Избранное', href: '/' },
    12: { title: 'Рассылка', href: '/' },
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

export const HEADER_ROUTER = {
    1: ROOTER[1],
    2: ROOTER[2],
}
