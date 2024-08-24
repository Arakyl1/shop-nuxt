import { unref } from 'vue';

import { formatDateIsInput } from '../index';

export function isNumber(elem: unknown): elem is number {
    return typeof unref(elem) === 'number';
}

export function isString(elem: unknown): elem is string {
    return typeof unref(elem) === 'string';
}

export function isBoolean(elem: unknown): elem is boolean {
    return typeof unref(elem) === 'boolean';
}

export function isObject(elem: unknown): elem is object {
    return typeof unref(elem) === 'object';
}

export function isNumeric(str: string | number): boolean {
    if (typeof str != 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export function isUndefined(elem: unknown): elem is undefined {
    return unref(elem) === undefined;
}

export function isElement(value: unknown): value is HTMLElement {
    return value instanceof HTMLElement;
}

export function isInput(value: unknown): value is HTMLInputElement {
    return value instanceof HTMLInputElement;
}

export function getDateYear(date?: Date) {
    return (date ? date : new Date()).getFullYear();
}

export function currentDate() {
    const now = new Date();
    return [now.getFullYear(), ('0' + (now.getMonth() + 1)).slice(-2), ('0' + now.getDate()).slice(-2)].join('');
}

export function getYear(date: string) {
    return Math.floor((currentDate() - formatDateIsInput(date).replace(/-/g, '')) * 0.0001);
}

export function uppercaseFirctLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
