import { CookieKey, SERVER_RESPONSE_CONTENT_KEY } from "@/type/intex";

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
export function isNumeric(str: string): boolean {
    if (typeof str != "string") return false
    return !isNaN(str as never) && !isNaN(parseFloat(str))
}
export function checkStrBoolean(str: string) {
    return str === 'false' ? undefined : str
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

export const GET_CONTENT_KEY = (key: string) => key
export const GET_SERVER_RESPONSE_KEY = (key: SERVER_RESPONSE_CONTENT_KEY) => key

type ArgumentsSetCookie = Parameters<typeof setCookie>
export const _setCookie = async(
    event: ArgumentsSetCookie[0],
    key: CookieKey,
    value: string,
    option: {
        domain?: string, 
        expires?: Date,
        sameSite?: boolean | "lax" | "strict" | "none",
        httpOnly?: boolean,
        maxAge?: number,
        path?: string,
        priority?: "low" | "medium" | "high",
        secure?: boolean,
    } = {
        sameSite: 'lax',
        expires: new Date(Date.now() + 604800000)
    } 
) => {
    if (key && value) {
        setCookie(event, key, value, option)
    }
}