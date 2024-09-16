import { onBeforeUnmount, onMounted, type Ref, unref } from 'vue';

import { formatDateIsInput } from '../utils/index';

type FORM = Ref<HTMLFormElement | null> | HTMLFormElement | null;
export default () => {
    const checkTypeInput = (type: string) => ['text', 'password', 'date', 'email'].includes(type);

    function isThisForm(elem: FORM): boolean {
        const _form = unref(elem);
        return _form instanceof HTMLFormElement;
    }

    function handlerForForm<T extends (form: HTMLFormElement) => string>(elem: FORM, handle: T): ReturnType<typeof handle> | null {
        if (!isThisForm(elem)) return null;
        return handle(unref(elem)!);
    }

    function getFormData(form: FORM) {
        return handlerForForm(form, (_form) => {
            return new FormData(_form);
        });
    }

    function getFormDataURL(form: FORM) {
        const formData = getFormData(form);
        return formData ? new URLSearchParams(formData).toString() : null;
    }

    function getFormDataArray(form: FORM) {
        const formData = getFormData(form);
        if (!formData) return null;

        const data: Array<[string, string]> = [];

        for (const [key, value] of formData) {
            data.push([key, value]);
        }
        return data;
    }

    function getFormDataObJ(form: FORM) {
        const formData = getFormData(form);
        if (!formData) return null;

        const data: { [k: string]: string } = {};
        for (const [key, value] of formData) {
            data[key] = value;
        }
        return data;
    }

    function getFormKey(form: FORM) {
        const formData = getFormData(form);
        if (!formData) return null;

        const data: Array<string> = [];

        for (const [key] of formData) {
            data.push(key);
        }
        return data;
    }

    function createURLSearchParams(form: FORM, params: Array<[string, number | string]>) {
        const formData = getFormData(form) || new FormData();

        const URlParams = new URLSearchParams();

        for (const [key, value] of formData) {
            if (value) URlParams.append(key, value);
        }

        params.forEach((_) => {
            if (_[1] && _[1] !== 0) URlParams.append(_[0], _[1]);
        });
        return URlParams;
    }

    function createMapDataForForm(data: Array<[string, string | number]>) {
        const mapData = new Map<string, string[]>();

        data.forEach((_) => {
            const [key, value] = _;
            mapData.set(key, [value]);
        });
        return mapData;
    }

    function setValueInput(form: FORM, setData: Map<string, string[]> | null) {
        return handlerForForm(form, (_form) => {
            if (!setData || setData.size === 0) return;

            const event = new Event('change', { bubbles: true });

            function dispatchEvent(elem: HTMLInputElement | HTMLTextAreaElement) {
                elem.dispatchEvent(event);
            }
            for (const elem of _form.elements) {
                const elemName = elem.getAttribute('name') || '';
                const elemValid = setData.has(elemName) ? setData.get(elemName) : null;

                if (elem instanceof HTMLInputElement && elemValid && elemValid.length) {
                    switch (elem.type) {
                        case 'email':
                        case 'text':
                        case 'tel': {
                            elem.value = elemValid![0];
                            dispatchEvent(elem);
                            break;
                        }
                        case 'number': {
                            elem.valueAsNumber = parseFloat(elemValid![0]);
                            dispatchEvent(elem);
                            break;
                        }
                        case 'radio':
                        case 'checkbox': {
                            if (elemValid!.includes(elem.value)) {
                                elem.checked = true;
                                dispatchEvent(elem);
                            }
                        }
                    }
                } else if (elem instanceof HTMLTextAreaElement && elemValid && elemValid.length) {
                    elem.value = elemValid![0];
                    dispatchEvent(elem);
                }
            }
        });
    }

    function setInputValueByOtherElem(
        form: FORM,
        keyElemSet: string,
        keyElemSum: string[],
        sumFun: (form: { [k: string]: string }) => unknown
    ) {
        if (checkValidForm(form)) {
            const formData = getFormDataObJ(form);
            const inputSetData = new Map<string, string[]>();
            if (formData && !keyElemSum.find((_) => !formData[_])) {
                inputSetData.set(keyElemSet, [sumFun(formData)]);
                setValueInput(form, inputSetData);
            }
        }
    }

    function resetForm(form: FORM) {
        return handlerForForm(form, (_form) => {
            _form.reset();
            const customEvent = new CustomEvent('reset', { bubbles: false });
            for (const elem of _form.elements) {
                if (elem instanceof HTMLInputElement) {
                    if (elem.closest('[data-ranting]') || elem.closest('[data-file-image]')) {
                        elem.dispatchEvent(customEvent);
                    }
                }
            }
            // createAndSendEventRestore();
        });
    }

    function findActiveElement(form: FORM) {
        return handlerForForm(form, (_form) => {
            for (const elem of _form.elements) {
                if (elem instanceof HTMLInputElement && !elem.getAttribute('data-miss')) {
                    if (['checkbox', 'radio'].includes(elem.type) && elem.checked) {
                        return elem;
                    } else if (['text'].includes(elem.type) && !!elem.value !== false) {
                        return elem;
                    } else if (['number'].includes(elem.type) && elem.value && elem.value !== elem.max && elem.value !== elem.min) {
                        return elem;
                    }
                }
            }
            return false;
        });
    }

    function checkValidForm(form: FORM) {
        return handlerForForm(form, (_form) => _form.checkValidity());
    }

    function searchInvalidElemInForm(form: FORM) {
        return handlerForForm(form, (_form) => {
            if (_form.checkValidity()) return true;

            for (const elem of _form.elements) {
                if (!elem.validity.valid) {
                    if (elem instanceof HTMLTextAreaElement || (elem instanceof HTMLInputElement && checkTypeInput(elem.type))) {
                        elem.focus();
                    } else {
                        elem.parentElement?.focus();
                    }
                    return false;
                }
            }
            return true;
        });
    }

    function searchMissingParamsInFormDataURl(data: string, searchKey: Array<string | number>) {
        const dataKey = data.split('&').map((_) => _.split('=')[0]);
        return Array.isArray(searchKey)
            ? searchKey.find((_) => !dataKey.includes(_.toString())) || false
            : dataKey.includes(searchKey) || false;
    }

    function onBackspace(form: FORM) {
        return handlerForForm(form, (_form) => {
            const elements = _form.elements;
            const key = [...Object.keys(elements)].reverse();

            for (let i = 0, l = key.length; i < l; i++) {
                const _key = key[i];
                const elem = elements[_key];
                if (elem instanceof HTMLInputElement && checkTypeInput(elem.type) && elem.value) return elem?.focus();
            }
        });
    }

    function transformDataFormForSend(data: Array<[string, string]>, keyNumber: string[] = []): Array<[string, string | number]> {
        const updateData: Array<[string, string | number | null]> = [];
        data.forEach((_) => {
            const [key, value] = _;

            switch (key) {
                case 'phone':
                    updateData.push([key, value.replace(/\D/g, '')]);
                    break;
                case 'birthday':
                    updateData.push([key, new Date(formatDateIsInput(value) as string).toJSON()]);
                    break;
                default:
                    updateData.push([key, keyNumber.includes(key) ? parseFloat(value) || null : value || null]);
                    break;
            }
        });
        return updateData;
    }

    const createAndSendEventRestore = () => {
        const event = new CustomEvent('restore');
        window.dispatchEvent(event);
    };

     
    const addToWatchEventRestore = (handler: (...arg: string[]) => string, option: AddEventListenerOptions | boolean = { passive: true }) => {
        onMounted(() => window.addEventListener('reset', handler, option));
        onBeforeUnmount(() => window.removeEventListener('reset', handler));
    };

    return {
        isThisForm,
        handlerForForm,
        getFormData,
        getFormDataObJ,
        getFormDataURL,
        getFormDataArray,
        getFormKey,
        setValueInput,
        setInputValueByOtherElem,
        resetForm,
        searchInvalidElemInForm,
        searchMissingParamsInFormDataURl,
        createMapDataForForm,
        createURLSearchParams,
        findActiveElement,
        onBackspace,
        createAndSendEventRestore,
        addToWatchEventRestore,
        checkValidForm,
        transformDataFormForSend
    };
};
