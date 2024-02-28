export const BASIC_INFORMATION = {
    TELEPHONE: '+7 (499) 719-99-94',
    MAIL: 'info@5kvt.ru',
    WORKING_HOURS: 'Ежедневно 9:30 - 20:00 (МСК)',
    ADDRESS: '117218, г. Москва, пр-кт Нахимовский .,дом 30/43, кв. 81'
}

export const BASE_BUTTON = {
    BASKET_ADD: 'В корзину',
    REVIEWS_ADD: 'Оставить отзыв',
    FILTER_RESET: 'Сбросить',
    SEARCH: 'Поиск',
    ADDRESS_MARKER: 'Адреса магазинов',
    PICK_UP_ADDRESSES: 'Адреса для самовывоза',
    APPLY_CHANGES: 'Применить изменения',
    CREATE_SECTION: 'Создать раздел',
    ADD_SECTION: 'Добавить раздел',
    DELETE_SECTION: 'Удалить раздел',
    ADD_FIELD: 'Добавить поле',
    DELETE_FIELD: 'Удалить поле',
    OK: 'Хорошо',
    REJECTION: 'Нет',
    ACCEPT: 'Да',
}

export const NOTIFICATIONS_MESSAGE = {
    COPE_LINK: 'Ссылка скопирована',
    COPY_ARTICLE: 'Артикул скопирован',
    MIDDLEWARE_ADD_ROUTER_ERROR: 'Для перехода на эту страницу, авторизируйтесь',
    AUTH_LOGIN_INVALID_DATA: 'Проверьте введеные данные',
    AUTH_REGISTER_PASSWORD_DONT_MATCH: 'Пароли не совпадают',
    CREATE_EMPTY_INPUT: 'Заполните поля',
    CREATE_EMPTY_CHARACTERISTIC: 'В секции должно быть одна и более характеристик',
    CREATE_DOWNLOAD_PHOTO: 'Загрузите фото',
    CREATE_PRODUCT_SELECT_MAIN_PHOTO: 'Выбирете главное фото',
    DOWNLOAD_IMAGE: 'Загрузка фотографий'
}

export const CONFIRM_TITLE = {
    DELETE_SECTION: 'Вы хотите удалить этот раздел?',
    CANCEL_CREATE_SECTION: 'Вы хотите отменить создание раздела?',
    APPLY_EDIT_SECTION: 'Вы хотите применить изменения?',
    CANCEL_CREATE_PRODUCT: 'Вы хотите отменить создание товара, все данные будут сброшены?',
    CHECK_CHARACTERISTIC: 'В вашем списке характеристик есть эти свойства: "/REPLACE/". Если, для характеристики указано несколько вариантов, тогда их следует разделять косой чертой "/". Например: "черный/белый"'
}


const INPUT_VALIDITY_BASE = {
    BAD_INPUT: '',
    CUSTOM_ERROR: '',
    PATTERN_MISMATCH: '',
    RANGE_OVERFLOW: '',
    RANGE_UNDERFLOW: '',
    STEP_MISMATCH: '',
    TOO_LONG: '',
    TOO_SHORT: '',
    TYPE_MISMATCH: '',
    VALUE_MISSING: 'Заполните поле',
}

export const INPUT_CONTENT = {
    SEARCH: {
        PLACEHOLDER: 'Что ищем?.',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    ADD_SECTION: {
        PLACEHOLDER: 'Название раздела',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    ADD_NAME: {
        PLACEHOLDER: 'Характеристика',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    ADD_VALUE: {
        PLACEHOLDER: 'Значение',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_NAME: {
        PLACEHOLDER: 'Название товара',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_CODE: {
        PLACEHOLDER: 'Код продукта',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_MAKER: {
        PLACEHOLDER: 'Производитель',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_ARTICLE: {
        PLACEHOLDER: 'Артикул',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_MODEL: {
        PLACEHOLDER: 'Код модели',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_PRICE: {
        PLACEHOLDER: 'Цена',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    PRODUCT_CREATE_QUANTITY: {
        PLACEHOLDER: 'Количество товара на складе',
        VALUE_MISSING: INPUT_VALIDITY_BASE.VALUE_MISSING
    },
    FILE_ADD_IMAGE: {
        PLACEHOLDER: 'Кликните, чтобы добавить фото'
    },
    PRODUCT_CREATE_DESCRIPTION_TEXTAREA: {
        PLACEHOLDER: 'Описание товара'
    }
}

export const EMPTY_CONTENT = {
    NOTHING_WAS_FOUND: 'Ничего не найдено',
}

export const FOOTER = {
    TELEPHONE: BASIC_INFORMATION.TELEPHONE,
    MAIL: BASIC_INFORMATION.MAIL,
    WORKING_HOURS: BASIC_INFORMATION.WORKING_HOURS,
    ADDRESS: BASIC_INFORMATION.ADDRESS,
    FIGCAPTION: 'Все права защищены. Указанная стоимость товаров и условия их приобретения действительны на текущую дату.',
    PAYMENT_METHODS: 'Принимаем к оплате',
    SOCIAL_NETWORK: 'Напишите нам',
    BUTTON_TEXT: 'Служба поддержки',
}

export const HEADER = {
    TELEPHONE: BASIC_INFORMATION.TELEPHONE,
    BUTTON_ADDRESS_MARKER: BASE_BUTTON.ADDRESS_MARKER,
    MAIL: BASIC_INFORMATION.MAIL
}

export const PAGE_MAIN = {
    ADVANTAGES_TITLE: 'Наши преимущества',
    BUTTON_MORE_DETAILS: 'Подробнее',
    CAROUSEL_TITLE_1: 'Товары на акции',
    CAROUSEL_TITLE_2: 'Новинки',
    CAROUSEL_TITLE_3: 'Товары месяца',
}

export const PAGE_CATALOG_ID = {
    CAROUSEL_TITLE: 'Новинки',
    BUTTON_BASKET_ADD: BASE_BUTTON.BASKET_ADD,
    AVAILABLE: 'В наличии',
    NOT_AVAILABLE: 'Нет в наличии',
    TEXT_REVIEWS: 'Отзывы',
    TEXT_ARTICLE: 'Артикул',
    TEXT_MODEL: 'Модель',
    TEXT_SPECIFICATIONS: 'Характеристики',
    TEXT_DESCRIPTION: 'Описание',
    TEXT_NOT_REVIEWS: 'На этот товар пока нет отзывов'
}

export const PAGE_CONTACT = {
    BUTTON_MODAL: BASE_BUTTON.PICK_UP_ADDRESSES,
    ADDRESS: 'Адрес',
    OPERATING_MODE: 'Режим работы',
    WORKING_DAYS: 'Понедельник GAP - суббота с GAP до',
    WEEKENDS_DAY: 'Воскресенье',
    TELEPHONE: BASIC_INFORMATION.TELEPHONE,
    MAIL: BASIC_INFORMATION.MAIL
}

export const PAGE_ADD = {
    MESSAGE_SELECT_MAIN_PHOTO: 'Выбере главное изображение',
    TITLE_DESCRIPTION: 'Описание товара',
    TITLE_ADDITIONAL_OPTION: 'Дополнительные опции',
}


export const PAGE_META = {
    MAIN: {
        TITLE: 'Главная страница'
    },
    CATALOG: {
        TITLE: 'Каталог товаров',
    }, 
    CATALOG_ID: {
        TITLE: 'Информация о товаре'
    },
    DELIVERY: {
        TITLE: "Доставка"
    },
    CONTACT: {
        TITLE: "Контакты"
    },
    ADD: {
        TITLE: "Добавить товар"
    }
}

// content for module

export const SEARCH_COMPONENT = {
    INPUT_PLACEHOLDER: INPUT_CONTENT.SEARCH.PLACEHOLDER,
    BUTTON_SEARCH: BASE_BUTTON.SEARCH,
    EMPTY_RESULT: EMPTY_CONTENT.NOTHING_WAS_FOUND
}



// SERVER RESPONSE CONTENT

// SUCCESSFULLY
export const SERVER_RESPONSE_CONTENT = {
    SERVER_ERROR: 'Something went wrong',
    CREATE_ERROR: 'Произошла ощибка, повторите попытку позже',
    // BASKET MESSAGE
    BASKET_ADD_SUCCESSFULLY: 'Товар добавлен в корзину',
    BASKET_ALREADY_AVAILABLE_SUCCESSFULLY: 'Товар уже в вашей корзине',
    BASKET_ADD_ERROR_BASKET_ID: 'absent or invalid params "basket_id"',
    BASKET_TYPE_ERROR: 'absent or invalid params "type"',
    // AUTH MESSAGE
    AUTH_REGISTER_SUCCESS: 'Пользователь зарегистрирован',
    // COMMENT MESSAGE
    COMMENT_CREATE_SUCCESS: 'Ваш отзыв добавлен',
    // PRODUCT MESSAGE
    PRODUCT_CREATE_SUCCESS: 'Товар добавлен',
}