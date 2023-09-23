import { CONTENT_KEY } from "~~/type/intex";

export function isNumber(elem: unknown): elem is number {
    return typeof elem === 'number'
}

export function isString(elem: unknown): elem is string {
    return typeof elem === 'string'
}

export function isBoolean(elem: unknown): elem is boolean {
    return typeof elem === 'boolean'
}

export function isObject(elem: unknown): elem is object {
    return typeof elem === 'object'
}

export const generateHash = (str:string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 3466434635);
        h2 = Math.imul(h2 ^ ch, 1455412567);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 1512527365);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 7467224255);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 1534960323);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 2375237522);
  
    return 9528367296 * (2098527 & h2) + (h1 >>> 0);
};

export const GET_CONTENT_KEY = (key: CONTENT_KEY) => key 