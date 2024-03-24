export const SERVER_RESPONSE_CONTENT = {
    SERVER_ERROR: 'Something went wrong',
    CREATE_ERROR: 'Произошла ощибка, повторите попытку позже',
    // BASKET MESSAGE
    BASKET_ADD_SUCCESSFULLY: 'Товар добавлен в корзину',
    BASKET_ALREADY_AVAILABLE_SUCCESSFULLY: 'Товар уже в вашей корзине',
    BASKET_REMOVE_SUCCESSFULLY: 'Товар удален из вашей корзины',
    BASKET_ADD_ERROR_BASKET_ID: 'absent or invalid params "basket_id"',
    BASKET_TYPE_ERROR: 'absent or invalid params "type"',
    // AUTH MESSAGE
    AUTH_REGISTER_SUCCESS: 'Пользователь зарегистрирован',
    AUTH_LOGIN_INVALID_PASSWORD: 'Неверный пароль',
    AUTH_USER_WITH_THAT_NAME_IS_NOT_REGISTERED: 'Пользователь с таким именем не зарегистрирован',
    AUTH_USER_WITH_THIS_ID_DOES_NOT_EXIST: 'Пользователь с таким идентификатором не существует',
    AUTH_ABSENT_COOKIE_ANONIM_SESSION_KEY: 'Файл кук "anonimSessionKey", отсутствует',
    AUTH_INVALID_COOKIE_ANONIM_SESSION_KEY: 'Файл кук "anonimSessionKey", невалидный',
    AUTH_INVALID_COOKIE: 'Файл кук "anonimSessionKey" или "sessionKey", невалидный',
    // COMMENT MESSAGE
    COMMENT_CREATE_SUCCESS: 'Ваш отзыв добавлен',
    // PRODUCT MESSAGE
    PRODUCT_CREATE_SUCCESS: 'Товар добавлен',
}