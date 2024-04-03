export interface FormElementsBaseParams {
// стили оформления input
    mode?: 'primary'|'secondary'|'outline'|'none',
    // имя
    name?: string,
    autocomplete?: string,
    // базовый placeholder
    placeholder?: string,
    // сделать элемент обязательным
    required?: boolean,
    // сделать доступным только для чтения
    readonly?: boolean,
    // сделать неактивным
    disabled?: boolean,
}